import { format } from "date-fns";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export const BarChart = ({ data, timeFrame }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="day"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={
            (value) =>
              timeFrame === "year"
                ? value.slice(0, 3) // for "year" timeframe
                : format(new Date(value), "EEE") // Format as day name for other timeframes
          }
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toFixed(0)}`}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
          }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value) => [`$${value.toFixed(2)}`, "Earnings"]}
        />
        <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
