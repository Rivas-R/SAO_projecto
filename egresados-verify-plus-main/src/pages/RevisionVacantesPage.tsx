import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Vacante {
  id: number;
  titulo: string;
  empresa: string;
  fechaPublicacion: string;
  modalidad: string;
}

const initialVacantes: Vacante[] = [
  { id: 1, titulo: "Desarrollador Full-Stack", empresa: "Tech Solutions SA", fechaPublicacion: "2025-02-28", modalidad: "Remoto" },
  { id: 2, titulo: "Analista de Datos", empresa: "DataCorp MX", fechaPublicacion: "2025-03-01", modalidad: "Híbrido" },
  { id: 3, titulo: "Ingeniero de Procesos", empresa: "Manufactura Global", fechaPublicacion: "2025-03-02", modalidad: "Presencial" },
  { id: 4, titulo: "Community Manager", empresa: "Agencia Creativa", fechaPublicacion: "2025-03-03", modalidad: "Remoto" },
  { id: 5, titulo: "Contador Senior", empresa: "Despacho Fiscal MX", fechaPublicacion: "2025-03-01", modalidad: "Presencial" },
];

const RevisionVacantesPage = () => {
  const [vacantes, setVacantes] = useState<Vacante[]>(initialVacantes);
  const { toast } = useToast();

  const handleAction = (id: number, action: "aprobar" | "rechazar") => {
    const vacante = vacantes.find((v) => v.id === id);
    setVacantes((prev) => prev.filter((v) => v.id !== id));
    toast({
      title: action === "aprobar" ? "Vacante aprobada" : "Vacante rechazada",
      description: `"${vacante?.titulo}" de ${vacante?.empresa} ha sido ${action === "aprobar" ? "aprobada" : "rechazada"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Revisión de Vacantes</h1>
        <p className="text-muted-foreground">Vacantes pendientes de aprobación por parte de las empresas.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pendientes de Aprobación</CardTitle>
          <CardDescription>{vacantes.length} vacante(s) requieren revisión</CardDescription>
        </CardHeader>
        <CardContent>
          {vacantes.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No hay vacantes pendientes de revisión.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Modalidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vacantes.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.titulo}</TableCell>
                    <TableCell>{v.empresa}</TableCell>
                    <TableCell>{v.fechaPublicacion}</TableCell>
                    <TableCell>{v.modalidad}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                        Pendiente
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleAction(v.id, "aprobar")}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleAction(v.id, "rechazar")}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Rechazar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RevisionVacantesPage;
