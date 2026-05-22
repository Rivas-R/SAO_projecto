import { Building2, MapPin, DollarSign, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

interface Job {
  id: number;
  titulo: string;
  empresa_detalle: {
    nombre_empresa: string;
  };
  ubicacion: string;
  salario_min: string;
  salario_max: string;
  modalidad: string;
  fecha_publicacion: string;
  descripcion: string;
}

const BolsaTrabajoPage = () => {
  const { toast } = useToast();

  const { data: jobs, isLoading, error } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: () => fetchApi("/jobs/offers/"),
  });

  const mutation = useMutation({
    mutationFn: (jobId: number) => fetchApi(`/jobs/offers/${jobId}/postular/`, { method: "POST" }),
    onSuccess: (data: any) => {
      toast({
        title: "Postulación enviada",
        description: data.message || "Tu postulación ha sido registrada.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo enviar la postulación.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-destructive">Error al cargar las vacantes.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">Bolsa de Trabajo</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Explora las oportunidades laborales disponibles para egresados.
      </p>

      {jobs?.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No hay vacantes disponibles en este momento.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {jobs?.map((job) => (
            <div
              key={job.id}
              className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Building2 className="h-5 w-5 text-accent" />
                </div>
                <Badge variant="secondary" className="text-xs">{job.modalidad}</Badge>
              </div>

              <h3 className="font-bold text-foreground mb-1">{job.titulo}</h3>
              <p className="text-sm text-muted-foreground mb-3">{job.empresa_detalle.nombre_empresa}</p>

              <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.ubicacion}
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  ${job.salario_min} - ${job.salario_max}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Publicado: {new Date(job.fecha_publicacion).toLocaleDateString()}
                </div>
              </div>

              <Button
                className="mt-auto gap-2 w-full"
                onClick={() => mutation.mutate(job.id)}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Postularme
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BolsaTrabajoPage;
