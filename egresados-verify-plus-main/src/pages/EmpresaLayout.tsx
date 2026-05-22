import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { EmpresaSidebar } from "@/components/EmpresaSidebar";

const EmpresaLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <EmpresaSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border bg-card px-4 gap-3">
            <SidebarTrigger />
            <span className="text-sm font-semibold text-foreground">Portal de la Empresa</span>
          </header>
          <main className="flex-1 p-6 bg-background overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmpresaLayout;
