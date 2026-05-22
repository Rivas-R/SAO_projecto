import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { fetchApi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PublicarVacantePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [modalidad, setModalidad] = useState("");

  const mutation = useMutation({
    mutationFn: (data: any) => fetchApi("/jobs/offers/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      toast({
        title: "Vacante enviada",
        description: "Tu vacante ha sido enviada y está pendiente de aprobación por un administrador.",
      });
      navigate("/empresa/vacantes");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo publicar la vacante.",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      ...Object.fromEntries(formData.entries()),
      modalidad: modalidad
    };
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Publicar Vacante</h1>
        <p className="text-muted-foreground">Crea una nueva oferta laboral para los egresados</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Toda vacante publicada debe ser revisada y aprobada por un administrador antes de ser visible para los egresados.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Datos de la Vacante</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título del Puesto</Label>
              <Input
                id="titulo"
                name="titulo"
                placeholder="Ej. Ingeniero de Software"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                placeholder="Describe las responsabilidades, requisitos y beneficios del puesto..."
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salario_min">Salario Mínimo (USD)</Label>
                <Input
                  id="salario_min"
                  name="salario_min"
                  type="number"
                  placeholder="1500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salario_max">Salario Máximo (USD)</Label>
                <Input
                  id="salario_max"
                  name="salario_max"
                  type="number"
                  placeholder="2500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Modalidad</Label>
              <Select value={modalidad} onValueChange={setModalidad} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una modalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRESENCIAL">Presencial</SelectItem>
                  <SelectItem value="REMOTO">Remoto</SelectItem>
                  <SelectItem value="HIBRIDO">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publicar Vacante
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicarVacantePage;
