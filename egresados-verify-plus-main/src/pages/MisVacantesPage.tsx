import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Briefcase } from "lucide-react";

interface JobOffer {
  id: number;
  titulo: string;
  modalidad: string;
  estado: string;
  fecha_publicacion: string;
}

const MisVacantesPage = () => {
  const { data: offers, isLoading } = useQuery<JobOffer[]>({
    queryKey: ["my-offers"],
    queryFn: () => fetchApi("/jobs/offers/"),
  });

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mis Vacantes</h1>
        <p className="text-muted-foreground">Gestiona las ofertas laborales que has publicado</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Puesto</TableHead>
              <TableHead>Modalidad</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                  No has publicado ninguna vacante todavía.
                </TableCell>
              </TableRow>
            ) : (
              offers?.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      {offer.titulo}
                    </div>
                  </TableCell>
                  <TableCell>{offer.modalidad}</TableCell>
                  <TableCell>
                    <Badge variant={offer.estado === "APROBADA" ? "default" : "secondary"}>
                      {offer.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(offer.fecha_publicacion).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MisVacantesPage;
