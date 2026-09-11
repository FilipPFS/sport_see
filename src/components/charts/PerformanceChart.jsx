import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const KIND_FR = {
  cardio: "Cardio",
  energy: "Energie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

function PerformanceChart({ kind = {}, data = [] }) {
  const chartData = [...data]
    .map((d) => ({
      subject: KIND_FR[kind[d.kind]] ?? kind[d.kind],
      value: d.value,
    }))
    .reverse();

  return (
    <div className="chart-card intensity">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} outerRadius="65%">
          <PolarGrid radialLines={false} stroke="#fff" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#fff", fontSize: 12 }}
            tickLine={false}
          />
          <Radar dataKey="value" fill="#ff0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;
