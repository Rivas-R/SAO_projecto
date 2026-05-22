import { useState } from "react";
import { Search, ShieldCheck, Loader2, User, BookOpen, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

interface SEPResult {
  nombre: string;
  paterno: string;
  materno: string;
  titulo: string;
  cedula: string;
  institucion: string;
  anio: string;
}

const VerificationSection = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "result" | "empty" | "error">("idle");
  const [results, setResults] = useState<SEPResult[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    if (!query.trim()) return;
    
    setStatus("loading");
    setErrorMessage("");
    
    try {
      const data = await fetchApi(`/validation/verify-sep/?q=${encodeURIComponent(query)}`);
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        setStatus("result");
      } else {
        setStatus("empty");
      }
    } catch (error: any) {
      console.error("Error verificando título:", error);
      setErrorMessage(error.message || "Error al conectar con el servicio de verificación.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setQuery("");
    setResults([]);
  };

  return (
    <section id="verificar" className="py-20 bg-background">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
            <ShieldCheck className="h-7 w-7 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Verificación de Títulos (SEP México)
          </h2>
          <p className="mt-3 text-muted-foreground">
            Consulta el Registro Nacional de Profesionistas ingresando el nombre completo o número de cédula.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          {status !== "loading" && (
            <div className="flex flex-col gap-4 sm:flex-row mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Nombre completo o número de cédula..."
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                />
              </div>
              <Button onClick={handleVerify} className="gap-2 min-w-[120px]" disabled={status === "loading"}>
                <ShieldCheck className="h-4 w-4" />
                Verificar
              </Button>
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-10 animate-fade-in-up">
              <Loader2 className="h-10 w-10 animate-spin text-accent" />
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                Consultando Registro Nacional de Profesionistas (SEP)...
              </p>
            </div>
          )}

          {status === "empty" && (
            <div className="text-center py-10 animate-fade-in-up">
              <AlertCircle className="h-10 w-10 mx-auto text-warning mb-4" />
              <h3 className="text-lg font-bold">No se encontraron resultados</h3>
              <p className="text-muted-foreground text-sm">
                No pudimos encontrar registros con los datos proporcionados. Intente con el nombre completo exacto o el número de cédula.
              </p>
              <Button variant="ghost" className="mt-4" onClick={handleReset}>
                Realizar otra búsqueda
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-10 animate-fade-in-up text-destructive">
              <AlertCircle className="h-10 w-10 mx-auto mb-4" />
              <h3 className="text-lg font-bold">Error de conexión</h3>
              <p className="text-sm">{errorMessage}</p>
              <Button variant="outline" className="mt-4" onClick={handleVerify}>
                Reintentar
              </Button>
            </div>
          )}

          {status === "result" && (
            <div className="space-y-6 animate-scale-in">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Se encontraron {results.length} coincidencias:
                </p>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  Nueva búsqueda
                </Button>
              </div>

              {results.map((res, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="text-success border-success/30 bg-success/5">
                      Cédula: {res.cedula}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      SEP Oficial
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {res.nombre} {res.paterno} {res.materno}
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-4 w-4 mt-1 text-accent" />
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-bold">Título / Profesión</p>
                        <p className="text-sm font-semibold text-foreground">{res.titulo}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 mt-1 text-accent" />
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-bold">Institución</p>
                        <p className="text-sm font-semibold text-foreground">{res.institucion}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 mt-1 text-accent" />
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-bold">Año de Expedición</p>
                        <p className="text-sm font-semibold text-foreground">{res.anio}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-4 w-4 mt-1 text-success" />
                      <div>
                        <p className="text-[10px] uppercase text-muted-foreground font-bold">Estado</p>
                        <p className="text-sm font-bold text-success">Verificado en Registro Nacional</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VerificationSection;
