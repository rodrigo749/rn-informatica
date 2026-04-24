import { Globe, Layout, Smartphone, Gauge, Search, ShoppingCart, Code2, Palette, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { title: "Sites Institucionais", icon: Globe, desc: "Presença digital profissional para sua empresa com design moderno e responsivo." },
  { title: "Landing Pages", icon: Layout, desc: "Páginas de alta conversão focadas em capturar leads e vendas." },
  { title: "Design Responsivo", icon: Smartphone, desc: "Layouts perfeitos em qualquer dispositivo: desktop, tablet e celular." },
  { title: "Alta Performance", icon: Gauge, desc: "Sites otimizados para carregamento rápido e melhor experiência do usuário." },
  { title: "SEO Otimizado", icon: Search, desc: "Estrutura técnica para seu site aparecer bem posicionado no Google." },
  { title: "Lojas Virtuais", icon: ShoppingCart, desc: "E-commerce completo para você vender online com segurança." },
  { title: "Desenvolvimento Personalizado", icon: Code2, desc: "Funcionalidades sob medida para as necessidades do seu negócio." },
  { title: "UI/UX Design", icon: Palette, desc: "Interfaces bonitas e intuitivas que encantam e retêm usuários." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const WebDev = () => {
  return (
    <section id="websites" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-accent text-sm font-medium mb-4">
              Novo Serviço
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Desenvolvimento de Sites &{" "}
              <span className="text-primary">Landing Pages</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
            <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
              Criamos sites e landing pages profissionais que convertem visitantes em clientes.
              Do design à publicação, cuidamos de tudo para sua presença digital decolar.
            </p>
          </div>
          <a
            href="#contato"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-brand-700 text-primary-foreground rounded-lg font-semibold transition-all active:scale-95"
          >
            Solicitar Orçamento
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <f.icon className="w-9 h-9 text-accent mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 rounded-2xl bg-primary/10 border border-primary/20 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Pronto para ter seu site no ar?
            </h3>
            <p className="text-muted-foreground">
              Entre em contato e receba uma proposta personalizada sem compromisso.
            </p>
          </div>
          <a
            href="#contato"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-brand-700 text-primary-foreground rounded-lg font-semibold transition-all active:scale-95"
          >
            Fale Conosco
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDev;
