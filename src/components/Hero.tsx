import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--primary)) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 border border-primary/20 text-accent text-sm font-medium mb-6">
            Disponível em Pouso Alegre e Região
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
            Soluções completas em{" "}
            <span className="text-primary">informática</span> em Pouso Alegre e
            região
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Manutenção, montagem, upgrades e suporte técnico especializado com o
            rigor que sua máquina exige.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contato"
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-brand-700 text-primary-foreground rounded-lg font-semibold transition-all active:scale-95"
            >
              Fale Conosco
            </a>
            <a
              href="#servicos"
              className="w-full sm:w-auto px-8 py-4 bg-secondary border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all"
            >
              Ver Serviços
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
