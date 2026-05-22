import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const PerfilPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", user?.role],
    queryFn: () => fetchApi(user?.role === "EGRESADO" ? "/profiles/egresado/" : "/profiles/empresa/"),
    enabled: !!user,
  });

  const { data: academic, isLoading: isAcademicLoading } = useQuery({
    queryKey: ["academic"],
    queryFn: () => fetchApi("/validation/me/"),
    enabled: user?.role === "EGRESADO",
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => fetchApi(user?.role === "EGRESADO" ? "/profiles/egresado/" : "/profiles/empresa/", {
      method: "PATCH",
      body: JSON.stringify(newData),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({ title: "Perfil actualizado", description: "Los cambios han sido guardados correctamente." });
    },
    onError: (error: any) => {
      toast({ variant: "destructive", title: "Error", description: error.message || "No se pudo actualizar el perfil." });
    }
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    mutation.mutate(data);
  };

  if (isProfileLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Mi Perfil</h1>
      <p className="text-muted-foreground text-sm mb-6">Gestiona tu información personal y profesional.</p>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="personal">Datos {user?.role === "EGRESADO" ? "Personales" : "de la Empresa"}</TabsTrigger>
          {user?.role === "EGRESADO" && <TabsTrigger value="educacion">Educación</TabsTrigger>}
          {user?.role === "EGRESADO" && <TabsTrigger value="experiencia">Experiencia Laboral</TabsTrigger>}
        </TabsList>

        <form onSubmit={handleSave}>
          {/* Datos Personales / Empresa */}
          <TabsContent value="personal" className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {user?.role === "EGRESADO" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" name="nombre" defaultValue={profile?.nombre} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" name="apellido" defaultValue={profile?.apellido} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Cédula</Label>
                    <Input id="cedula" name="cedula" defaultValue={profile?.cedula} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" name="telefono" defaultValue={profile?.telefono} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input id="direccion" name="direccion" defaultValue={profile?.direccion} />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="nombre_empresa">Nombre de la Empresa</Label>
                    <Input id="nombre_empresa" name="nombre_empresa" defaultValue={profile?.nombre_empresa} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruc">RUC</Label>
                    <Input id="ruc" name="ruc" defaultValue={profile?.ruc} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Input id="sector" name="sector" defaultValue={profile?.sector} />
                  </div>
                </>
              )}
            </div>
            <Button type="submit" className="gap-2" disabled={mutation.isPending}>
              {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Guardar cambios
            </Button>
          </TabsContent>

          {user?.role === "EGRESADO" && (
            <>
              {/* Educación */}
              <TabsContent value="educacion" className="space-y-5">
                <div className={`rounded-lg border-2 p-4 flex items-center gap-3 ${academic?.estado_validacion === 'VERIFICADO' ? 'border-success/30 bg-success/5' : 'border-warning/30 bg-warning/5'}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${academic?.estado_validacion === 'VERIFICADO' ? 'bg-success' : 'bg-warning'}`}>
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Estado de Validación: {academic?.estado_validacion || 'Pendiente'}</p>
                    <p className="text-xs text-muted-foreground">Esta información es verificada por el departamento académico.</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Universidad</Label>
                    <Input value={academic?.universidad || "Universidad de Panamá"} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Carrera</Label>
                    <Input value={academic?.carrera} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Título obtenido</Label>
                    <Input value={academic?.titulo_obtenido} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>Año de graduación</Label>
                    <Input value={academic?.anio_graduacion} disabled className="bg-muted" />
                  </div>
                </div>
              </TabsContent>

              {/* Experiencia Laboral */}
              <TabsContent value="experiencia" className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="empresa_actual">Empresa actual</Label>
                    <Input id="empresa_actual" name="empresa_actual" defaultValue={profile?.empresa_actual} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo_actual">Cargo</Label>
                    <Input id="cargo_actual" name="cargo_actual" defaultValue={profile?.cargo_actual} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="anios_experiencia">Años de experiencia</Label>
                    <Input id="anios_experiencia" name="anios_experiencia" type="number" defaultValue={profile?.anios_experiencia} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="habilidades">Habilidades (separadas por coma)</Label>
                    <Textarea id="habilidades" name="habilidades" defaultValue={profile?.habilidades} rows={3} />
                  </div>
                </div>
                <Button type="submit" className="gap-2" disabled={mutation.isPending}>
                  {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Guardar cambios
                </Button>
              </TabsContent>
            </>
          )}
        </form>
      </Tabs>
    </div>
  );
};

export default PerfilPage;
