import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(user, pass);
    if (!ok) setError("Usuário ou senha incorretos.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">Área Administrativa</h1>
          <p className="text-muted-foreground text-sm mt-1">RN Informática — Acesso restrito</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-xl"
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPass ? "text" : "password"}
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all disabled:opacity-60"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>

          <a
            href="/"
            className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
          >
            ← Voltar ao site
          </a>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
