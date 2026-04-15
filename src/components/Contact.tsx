import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Máscara para telefone: (99) 99999-9999
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setForm((prev) => ({ ...prev, phone: formatted }));
  };

  // Validação de e-mail
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, email: value }));
    if (value && !isValidEmail(value)) {
      setEmailError("E-mail inválido");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Preencha pelo menos nome e mensagem.");
      return;
    }
    if (form.email && !isValidEmail(form.email)) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }
    if (!acceptedTerms) {
      toast.error("Você precisa aceitar os termos para enviar a mensagem.");
      return;
    }
    setSending(true);

    // Limpa a máscara do telefone para armazenamento/integração
    const rawPhone = form.phone.replace(/\D/g, "");

    try {
      // Salvar no Firebase (telefone sem máscara + formatado)
      await addDoc(collection(db, "contacts"), {
        name: form.name.trim(),
        phone: rawPhone,
        phone_formatted: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
      });

      // Enviar e-mail de notificação
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name.trim(),
          from_name: form.name.trim(),
          phone: rawPhone || "Não informado",
          phone_formatted: form.phone.trim() || "Não informado",
          email: form.email.trim() || "Não informado",
          message: form.message.trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Mensagem enviada com sucesso! Entraremos em contato.");
      setForm({ name: "", phone: "", email: "", message: "" });
      setAcceptedTerms(false);
      setEmailError("");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  // usa VITE_WHATSAPP_NUMBER com fallback e garante apenas dígitos
  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || "5535999260419").replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento."
  )}`;

  return (
    <section id="contato" className="py-24 bg-card">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        {/* Informações de contato */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Entre em Contato</h2>
            <p className="text-muted-foreground text-lg">
              Estamos prontos para ajudar com suporte técnico, manutenção e consultoria em informática.
            </p>
          </div>

          <div className="space-y-6">
            {/* Localização */}
            <div className="flex items-center gap-4 text-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span>Pouso Alegre, MG</span>
            </div>

            {/* Telefone */}
            <div className="flex items-center gap-4 text-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <a href={`tel:+${whatsappNumber}`} className="hover:text-primary transition-colors">
                (35) 99926-0419
              </a>
            </div>

            {/* E-mail */}
            <div className="flex items-center gap-4 text-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <a href="mailto:rodrigonottoboni@gmail.com" className="hover:text-primary transition-colors">
                rodrigonottoboni@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-foreground hover:text-primary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-500" />
              </div>
              <span>Falar pelo WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Nome *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Telefone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={handlePhoneChange}
              placeholder="(35) 99999-9999"
              maxLength={15}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={handleEmailChange}
              placeholder="seu@email.com"
              className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                emailError ? "border-red-500 focus:ring-red-500" : "border-border"
              }`}
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          {/* Mensagem */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Mensagem *</label>
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Descreva como podemos ajudar..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Termos */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              Concordo com a{" "}
              <a
                href="/politica-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Política de Privacidade
              </a>{" "}
              e autorizo o uso dos meus dados para contato.
            </label>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={sending || !acceptedTerms}
            className="w-full py-3 px-6 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;