import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-12 flex items-center border-b border-border/50 bg-card/80 backdrop-blur-md">
          <SidebarTrigger className="ml-2" />
          <span className="ml-3 text-sm font-semibold text-foreground">Panel Administrativo</span>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default AdminLayout;
