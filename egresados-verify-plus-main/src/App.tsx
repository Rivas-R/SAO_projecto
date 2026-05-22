import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import PortalLayout from "./pages/PortalLayout";
import PerfilPage from "./pages/PerfilPage";
import BolsaTrabajoPage from "./pages/BolsaTrabajoPage";
import EmpresaLayout from "./pages/EmpresaLayout";
import EmpresaDashboardPage from "./pages/EmpresaDashboardPage";
import MisVacantesPage from "./pages/MisVacantesPage";
import PublicarVacantePage from "./pages/PublicarVacantePage";
import AdminLayout from "./pages/AdminLayout";
import RevisionVacantesPage from "./pages/RevisionVacantesPage";
import ReportesPage from "./pages/ReportesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Egresado Routes */}
            <Route element={<ProtectedRoute allowedRoles={["EGRESADO", "ADMIN"]} />}>
              <Route path="/portal" element={<PortalLayout />}>
                <Route index element={<Navigate to="/portal/perfil" replace />} />
                <Route path="perfil" element={<PerfilPage />} />
                <Route path="bolsa" element={<BolsaTrabajoPage />} />
              </Route>
            </Route>

            {/* Empresa Routes */}
            <Route element={<ProtectedRoute allowedRoles={["EMPRESA", "ADMIN"]} />}>
              <Route path="/empresa" element={<EmpresaLayout />}>
                <Route index element={<Navigate to="/empresa/dashboard" replace />} />
                <Route path="dashboard" element={<EmpresaDashboardPage />} />
                <Route path="vacantes" element={<MisVacantesPage />} />
                <Route path="publicar" element={<PublicarVacantePage />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/vacantes" replace />} />
                <Route path="vacantes" element={<RevisionVacantesPage />} />
                <Route path="reportes" element={<ReportesPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
