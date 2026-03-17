import {
  Monitor,
  Cpu,
  Zap,
  LifeBuoy,
  ShieldCheck,
  Wrench,
  HardDrive,
  Bug,
  Download,
  Laptop,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { title: "Manutenção de Desktops", icon: Monitor, desc: "Diagnóstico e reparo completo de computadores de mesa." },
  { title: "Manutenção de Notebooks", icon: Laptop, desc: "Reparo avançado em placas, telas e componentes." },
  { title: "Limpeza Interna", icon: Wrench, desc: "Limpeza preventiva para notebooks e PCs gamers." },
  { title: "Montagem Personalizada", icon: Cpu, desc: "PCs gamers e workstations montados sob medida." },
  { title: "Upgrade de Hardware", icon: Zap, desc: "SSD, memória, placa de vídeo e mais." },
  { title: "Formatação e Sistemas", icon: HardDrive, desc: "Instalação limpa de Windows e Linux com backup." },
  { title: "Suporte Remoto", icon: LifeBuoy, desc: "Resolução de problemas sem sair de casa." },
  { title: "Remoção de Vírus", icon: Bug, desc: "Eliminação de malwares e otimização do sistema." },
  { title: "Instalação de Programas", icon: Download, desc: "Configuração completa de softwares essenciais." },
  { title: "Consultoria Tech", icon: ShieldCheck, desc: "Planejamento de infraestrutura para casa ou empresa." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
};

const Services = () => {
  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Serviços Especializados
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <s.icon className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
