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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Preencha pelo menos nome e mensagem.");
      return;
    }
    if (!acceptedTerms) {
      toast.error("Você precisa aceitar os termos para enviar a mensagem.");
      return;
    }
    setSending(true);
    
    try {
      // Salvar no Firebase
      await addDoc(collection(db, "contacts"), {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
      });

      // Enviar e-mail de notificação
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          phone: form.phone.trim() || "Não informado",
          email: form.email.trim() || "Não informado",
          message: form.message.trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      toast.success("Mensagem enviada com sucesso! Entraremos em contato.");
      setForm({ name: "", phone: "", email: "", message: "" });
      setAcceptedTerms(false);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const whatsappUrl = `https://wa.me/5535999260419?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento."
  )}`;

  return (
    <section id="contato" className="py-24 bg-card">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Vamos resolver o seu problema?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Atendimento presencial em Pouso Alegre e suporte remoto para todo o
            Brasil. Entre em contato agora mesmo.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 text-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <p>Pouso Alegre, MG — Atendimento em domicílio</p>
            </div>
            <div className="flex items-center gap-4 text-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <a href="tel:+5535999260419" className="hover:text-primary transition-colors">
                (35) 99926-0419
              </a>
            </div>
            <div className="flex items-center gap-4 text-foreground">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <a href="mailto:rodrigonottoboni@gmail.com" className="hover:text-primary transition-colors">
                rodrigonottoboni@gmail.com
              </a>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-foreground rounded-lg font-semibold transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            Chamar no WhatsApp
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-background p-8 rounded-2xl border border-border space-y-4"
        >
          <input
            type="text"
            placeholder="Seu Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-secondary border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
            maxLength={100}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Telefone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-secondary border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
              maxLength={20}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-secondary border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors"
              maxLength={255}
            />
          </div>
          <textarea
            rows={4}
            placeholder="Como podemos ajudar?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-secondary border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground focus:border-primary outline-none transition-colors resize-none"
            maxLength={1000}
          />
          
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary cursor-pointer"
            />
            <span className="text-sm text-muted-foreground">
              Concordo com a coleta e uso dos meus dados para fins de contato, conforme a{" "}
              <a 
                href="/politica-de-privacidade" 
                target="_blank" 
                className="text-primary hover:underline"
              >
                Política de Privacidade
              </a>
              . Seus dados não serão compartilhados com terceiros.
            </span>
          </label>

          <button
            type="submit"
            disabled={sending || !acceptedTerms}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-brand-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
