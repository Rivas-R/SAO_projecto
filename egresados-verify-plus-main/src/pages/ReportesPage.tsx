import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const statusData = [
  { name: "Con Empleo", value: 70 },
  { name: "Buscando Empleo", value: 20 },
  { name: "Inactivo", value: 10 },
];

const STATUS_COLORS = ["hsl(152, 60%, 40%)", "hsl(215, 65%, 50%)", "hsl(0, 0%, 60%)"];

const pieConfig: ChartConfig = {
  "Con Empleo": { label: "Con Empleo", color: STATUS_COLORS[0] },
  "Buscando Empleo": { label: "Buscando Empleo", color: STATUS_COLORS[1] },
  Inactivo: { label: "Inactivo", color: STATUS_COLORS[2] },
};

const carreraData = [
  { carrera: "Sistemas", colocados: 85 },
  { carrera: "Industrial", colocados: 62 },
  { carrera: "Administración", colocados: 74 },
  { carrera: "Derecho", colocados: 48 },
  { carrera: "Contaduría", colocados: 55 },
];

const barConfig: ChartConfig = {
  colocados: { label: "Egresados Colocados", color: "hsl(215, 65%, 30%)" },
};

const ReportesPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Reportes de Empleabilidad</h1>
      <p className="text-muted-foreground">Analítica general del estatus laboral de los egresados.</p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Estatus de Egresados</CardTitle>
          <CardDescription>Distribución actual de la situación laboral</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-[320px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={50}
                strokeWidth={2}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={STATUS_COLORS[i]} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Egresados Colocados por Carrera</CardTitle>
          <CardDescription>Cantidad de egresados que consiguieron empleo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barConfig} className="max-h-[320px]">
            <BarChart data={carreraData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="carrera" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="colocados" fill="hsl(215, 65%, 30%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default ReportesPage;
