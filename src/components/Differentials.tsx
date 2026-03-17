import { motion } from "framer-motion";
import { Clock, BadgeDollarSign, Headphones, Globe, ShieldCheck } from "lucide-react";

const diffs = [
  { icon: Clock, title: "Atendimento Rápido", desc: "Diagnóstico e solução em até 24h." },
  { icon: BadgeDollarSign, title: "Preço Justo", desc: "Orçamento transparente e sem surpresas." },
  { icon: Headphones, title: "Suporte Especializado", desc: "Técnicos qualificados prontos para ajudar." },
  { icon: Globe, title: "Remoto e Presencial", desc: "Flexibilidade para atender como você precisar." },
  { icon: ShieldCheck, title: "Garantia nos Serviços", desc: "Segurança e confiança em cada reparo." },
];

const Differentials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Por que escolher a RN?
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diffs.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <d.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-foreground font-bold mb-1">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
