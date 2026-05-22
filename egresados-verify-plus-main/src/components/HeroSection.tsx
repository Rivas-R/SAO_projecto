import { GraduationCap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero py-24 md:py-32">
      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative z-10 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-in-up">
          Tu futuro profesional comienza aquí
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          La plataforma que conecta egresados con oportunidades laborales y permite a las empresas encontrar el mejor talento universitario.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" variant="secondary" className="gap-2 min-w-[180px] text-base font-semibold shadow-lg">
            <GraduationCap className="h-5 w-5" />
            Soy Egresado
          </Button>
          <Button size="lg" variant="outline" className="gap-2 min-w-[180px] text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground shadow-lg">
            <Building2 className="h-5 w-5" />
            Soy Empresa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
