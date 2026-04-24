import { motion } from "framer-motion";
import { Award, Users, MapPin } from "lucide-react";

const highlights = [
  { icon: Award, title: "Experiência", desc: "Anos de atuação em hardware e software." },
  { icon: MapPin, title: "Pouso Alegre e Região", desc: "Atendimento presencial e domiciliar." },
  { icon: Users, title: "Profissionalismo", desc: "Foco total em qualidade e satisfação." },
];

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Sobre a RN Informática
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-8" />
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Somos uma empresa especializada em soluções de tecnologia, oferecendo
            atendimento rápido e confiável para residências e empresas de Pouso
            Alegre e região.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Atuamos com manutenção, formatação e montagem de computadores, além do
            desenvolvimento de sites institucionais, landing pages e lojas virtuais,
            com design moderno, responsivo e foco em resultados.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Criamos soluções digitais otimizadas para desempenho, experiência do
            usuário (UI/UX) e visibilidade no Google (SEO), ajudando nossos clientes
            a fortalecer sua presença online e aumentar suas oportunidades de negócio.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Nosso compromisso é entregar qualidade, eficiência e tecnologia que gera resultados.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <h.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-bold mb-1">{h.title}</h3>
                <p className="text-muted-foreground text-sm">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
