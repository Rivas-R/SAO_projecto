import { useState } from "react";
import { GraduationCap, Menu, X, LogIn, Building2, ShieldCheck, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Verificar Título", href: "/#verificar" },
  { label: "Beneficios", href: "/#beneficios" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            EgresadosUP
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          
          {user ? (
            <>
              {user.role === "EGRESADO" && (
                <Button size="sm" asChild variant="ghost">
                  <Link to="/portal" className="gap-2">
                    <User className="h-4 w-4" />
                    Mi Portal
                  </Link>
                </Button>
              )}
              {user.role === "EMPRESA" && (
                <Button size="sm" asChild variant="ghost">
                  <Link to="/empresa" className="gap-2">
                    <Building2 className="h-4 w-4" />
                    Portal Empresa
                  </Link>
                </Button>
              )}
              {user.role === "ADMIN" && (
                <Button size="sm" asChild variant="ghost">
                  <Link to="/admin" className="gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={logout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login" className="gap-2">
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </Link>
            </Button>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card md:hidden animate-fade-in-up">
          <nav className="container flex flex-col gap-4 py-4">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            {user ? (
              <>
                <Button size="sm" variant="outline" onClick={logout} className="w-fit gap-2">
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button size="sm" asChild className="w-fit">
                <Link to="/login" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
