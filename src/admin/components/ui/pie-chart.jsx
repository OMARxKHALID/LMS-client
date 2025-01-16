import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export function EarningsPieChart({ data }) {
  const chartData = Object.entries(data).map(([category, value], index) => ({
    name: category,
    value: value,
    fill: [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "#4287f5", // blue
      "#f54287", // pink
      "#f59442", // orange
      "#9442f5", // purple
      "#42f587", // green
    ][index],
  }));

  return (
    <div className="dark">
      <ChartContainer
        config={{
          value: {
            label: "Value",
          },
          ...Object.fromEntries(
            chartData.map(({ name, fill }) => [
              name,
              { label: name, color: fill },
            ])
          ),
        }}
        className="mx-auto aspect-square max-h-[300px]"
      >
        <PieChart>
          <ChartLegend
            content={<ChartLegendContent nameKey="name" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
          <Pie data={chartData} dataKey="value" />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
