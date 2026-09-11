import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DailyActivityChart({ sessions = [] }) {
  const data = sessions.map((s, i) => ({
    index: i + 1,
    kilogram: s.kilogram,
    calories: s.calories,
  }));

  return (
    <div className="chart-card daily-activity">
      <h2 className="chart-card__title">Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barGap={8} barCategoryGap="35%">
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#dedede"
          />
          <XAxis
            dataKey="index"
            tickLine={false}
            tick={{ fill: "#9b9eac", fontSize: 14 }}
            stroke="#dedede"
            dy={10}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            dataKey="kilogram"
            domain={["dataMin - 2", "dataMax + 1"]}
            tickCount={3}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9b9eac", fontSize: 14 }}
            dx={20}
          />
          <YAxis yAxisId="cal" hide domain={[0, "dataMax + 100"]} />
          <Tooltip
            contentStyle={{ background: "#e60000", border: "none" }}
            itemStyle={{ color: "#fff", fontSize: 10 }}
            labelStyle={{ display: "none" }}
            cursor={{ fill: "rgba(196, 196, 196, 0.5)" }}
            formatter={(value, name) =>
              name === "kilogram" ? [`${value}kg`, ""] : [`${value}kCal`, ""]
            }
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            height={40}
            formatter={(value) =>
              value === "kilogram" ? "Poids (kg)" : "Calories brûlées (kCal)"
            }
          />
          <Bar
            yAxisId="kg"
            dataKey="kilogram"
            fill="#282d30"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="cal"
            dataKey="calories"
            fill="#e60000"
            radius={[10, 10, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyActivityChart;
