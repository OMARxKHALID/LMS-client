import { Bar, BarChart as BBarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart configuration
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Borrowed",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Purchased",
    color: "hsl(var(--chart-2))",
  },
};

// Helper function to format date into day of the week
const formatDateToDay = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};

export const BarChart = ({ data, timeFrame }) => {
  let filteredData = data.map((item) => ({
    date: item.date,
    Purchased: item.purchased,
    Borrowed: item.borrowed,
  }));

  // Filtering data based on the selected time frame
  if (timeFrame === "week") {
    filteredData = filteredData.slice(-7);
  }
  if (timeFrame === "month") {
    filteredData = filteredData.slice(-30);
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <BBarChart data={filteredData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => formatDateToDay(value).slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="Borrowed" fill="hsl(var(--chart-1))" radius={4} />
        <Bar dataKey="Purchased" fill="hsl(var(--chart-2))" radius={4} />
      </BBarChart>
    </ChartContainer>
  );
};
