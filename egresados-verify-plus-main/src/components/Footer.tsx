import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <GraduationCap className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-lg font-bold">EgresadosUP</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              Plataforma oficial de gestión de egresados y bolsa de trabajo. Conectando talento con oportunidades.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wider opacity-80">
              Plataforma
            </h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Verificar Título</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Bolsa de Trabajo</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Registro de Egresados</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wider opacity-80">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>egresados@universidad.edu</li>
              <li>+507 123-4567</li>
              <li>Ciudad de Panamá, Panamá</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs opacity-50">
          © {new Date().getFullYear()} EgresadosUP. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
