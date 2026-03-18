import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao site
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Política de Privacidade
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                1. Informações que Coletamos
              </h2>
              <p>
                Quando você entra em contato conosco através do formulário do site, 
                coletamos as seguintes informações:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Nome completo</li>
                <li>Número de telefone (opcional)</li>
                <li>Endereço de e-mail (opcional)</li>
                <li>Mensagem/descrição do serviço desejado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                2. Como Usamos suas Informações
              </h2>
              <p>As informações coletadas são utilizadas exclusivamente para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Entrar em contato com você para responder sua solicitação</li>
                <li>Fornecer orçamentos e informações sobre nossos serviços</li>
                <li>Agendar atendimentos técnicos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                3. Compartilhamento de Dados
              </h2>
              <p>
                <strong className="text-foreground">Não compartilhamos, vendemos ou alugamos</strong> suas 
                informações pessoais com terceiros. Seus dados são tratados com total 
                confidencialidade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                4. Armazenamento e Segurança
              </h2>
              <p>
                Suas informações são armazenadas de forma segura em servidores 
                protegidos (Firebase/Google Cloud). Implementamos medidas de segurança 
                técnicas e organizacionais para proteger seus dados contra acesso 
                não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                5. Seus Direitos (LGPD)
              </h2>
              <p>
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem 
                direito a:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Solicitar acesso aos seus dados pessoais</li>
                <li>Solicitar correção de dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p className="mt-4">
                Para exercer esses direitos, entre em contato pelo e-mail:{" "}
                <a 
                  href="mailto:rodrigonottoboni@gmail.com" 
                  className="text-primary hover:underline"
                >
                  rodrigonottoboni@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                6. Retenção de Dados
              </h2>
              <p>
                Mantemos suas informações apenas pelo tempo necessário para cumprir 
                as finalidades descritas nesta política, a menos que um período de 
                retenção maior seja exigido por lei.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">
                7. Contato
              </h2>
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre 
                como tratamos seus dados, entre em contato:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li>
                  <strong className="text-foreground">RN Informática</strong>
                </li>
                <li>E-mail: rodrigonottoboni@gmail.com</li>
                <li>Telefone: (35) 99926-0419</li>
                <li>Localização: Pouso Alegre, MG</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
