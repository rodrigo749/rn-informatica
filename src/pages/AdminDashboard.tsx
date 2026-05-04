import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Trash2, Pencil, X, Check, Search, RefreshCw,
  MessageSquare, Phone, Mail, User, Calendar, Shield,
} from "lucide-react";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  phone?: string;
  phone_formatted?: string;
  email?: string;
  message: string;
  createdAt?: { seconds: number };
}

const formatDate = (ts?: { seconds: number }) => {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("pt-BR");
};

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Contact>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setContacts(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Contact)));
    } catch (err: unknown) {
      console.error("Erro ao carregar contatos:", err);
      // Tenta sem orderBy caso o índice ainda não exista no Firestore
      try {
        const snap = await getDocs(collection(db, "contacts"));
        const sorted = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Contact))
          .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
        setContacts(sorted);
        toast.warning("Índice do Firestore ainda não criado. Exibindo sem ordenação garantida.");
      } catch (err2) {
        console.error("Erro ao carregar contatos (fallback):", err2);
        toast.error(`Erro ao carregar contatos: ${err2 instanceof Error ? err2.message : String(err2)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setContacts((prev) => prev.filter((c) => c.id !== id));
      toast.success("Contato excluído.");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      toast.error(`Erro ao excluir: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setDeleteConfirm(null);
    }
  };

  const startEdit = (c: Contact) => {
    setEditId(c.id);
    setEditData({ name: c.name, phone_formatted: c.phone_formatted || c.phone, email: c.email, message: c.message });
  };

  const saveEdit = async () => {
    if (!editId) return;
    try {
      await updateDoc(doc(db, "contacts", editId), {
        name: editData.name,
        phone_formatted: editData.phone_formatted,
        email: editData.email,
        message: editData.message,
      });
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editId ? { ...c, ...editData, phone: editData.phone_formatted } : c
        )
      );
      toast.success("Contato atualizado.");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      toast.error(`Erro ao salvar: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setEditId(null);
    }
  };

  const filtered = contacts.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.phone_formatted?.includes(q) ||
      c.message?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground text-lg leading-none">Painel Admin</h1>
            <p className="text-xs text-muted-foreground">RN Informática</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchContacts}
            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Atualizar"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Ver site
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{contacts.length}</p>
              <p className="text-sm text-muted-foreground">Total de Mensagens</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {contacts.filter((c) => c.phone_formatted || c.phone).length}
              </p>
              <p className="text-sm text-muted-foreground">Com Telefone</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {contacts.filter((c) => c.email).length}
              </p>
              <p className="text-sm text-muted-foreground">Com E-mail</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, e-mail, telefone ou mensagem..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Table / Cards */}
        {loading ? (
          <div className="flex items-center justify-center h-40 text-muted-foreground">Carregando...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
            <MessageSquare className="w-8 h-8 opacity-30" />
            <p>Nenhuma mensagem encontrada.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="bg-card border border-border rounded-xl p-5 md:p-6"
                >
                  {editId === c.id ? (
                    /* Edit mode */
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Nome</label>
                          <input
                            value={editData.name || ""}
                            onChange={(e) => setEditData((p) => ({ ...p, name: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">Telefone</label>
                          <input
                            value={editData.phone_formatted || ""}
                            onChange={(e) => setEditData((p) => ({ ...p, phone_formatted: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1 block">E-mail</label>
                          <input
                            value={editData.email || ""}
                            onChange={(e) => setEditData((p) => ({ ...p, email: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Mensagem</label>
                        <textarea
                          rows={3}
                          value={editData.message || ""}
                          onChange={(e) => setEditData((p) => ({ ...p, message: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setEditId(null)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                          <X className="w-3.5 h-3.5" /> Cancelar
                        </button>
                        <button
                          onClick={saveEdit}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90"
                        >
                          <Check className="w-3.5 h-3.5" /> Salvar
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* View mode */
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{c.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3" /> {formatDate(c.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => startEdit(c)}
                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {deleteConfirm === c.id ? (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Confirmar?</span>
                              <button
                                onClick={() => handleDelete(c.id)}
                                className="p-1.5 rounded-lg bg-destructive text-white hover:bg-destructive/80 transition-colors"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(c.id)}
                              className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3">
                        {(c.phone_formatted || c.phone) && (
                          <a
                            href={`tel:${(c.phone_formatted || c.phone || "").replace(/\D/g, "")}`}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-primary" />
                            {c.phone_formatted || c.phone}
                          </a>
                        )}
                        {c.email && (
                          <a
                            href={`mailto:${c.email}`}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-primary" />
                            {c.email}
                          </a>
                        )}
                      </div>

                      <div className="bg-background rounded-lg px-4 py-3 border border-border">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{c.message}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
