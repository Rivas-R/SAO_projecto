import { Briefcase, Users, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Briefcase,
    title: "Bolsa de Trabajo Exclusiva",
    description:
      "Accede a oportunidades laborales publicadas por empresas que buscan específicamente talento de nuestra universidad.",
  },
  {
    icon: Users,
    title: "Red de Egresados",
    description:
      "Conéctate con otros profesionales egresados, comparte experiencias y expande tu red de contactos profesionales.",
  },
  {
    icon: ShieldCheck,
    title: "Verificación de Títulos",
    description:
      "Las empresas pueden verificar la autenticidad de los títulos de forma instantánea, generando confianza en el proceso de contratación.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            ¿Por qué usar nuestra plataforma?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Beneficios diseñados para egresados y empresas que buscan conectar de forma eficiente.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
                <b.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
