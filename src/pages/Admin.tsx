import { useAuth } from "@/contexts/AuthContext";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

const AdminPage = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminPage;
