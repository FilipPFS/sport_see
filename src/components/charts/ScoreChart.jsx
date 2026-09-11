import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function ScoreChart({ score = 0 }) {
  const percent = Math.round(score * 100);

  const arc = [
    { name: "score", value: score },
    { name: "reste", value: 1 - score },
  ];
  const center = [{ name: "center", value: 1 }];

  return (
    <div className="chart-card score">
      <h2 className="chart-card__title">Score</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={center}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius="70%"
            fill="#ffffff"
            stroke="none"
            isAnimationActive={false}
          />
          <Pie
            data={arc}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="80%"
            startAngle={90}
            endAngle={450}
            cornerRadius={10}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill="#ff0101" />
            <Cell fill="transparent" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="score__center">
        <strong>{percent}%</strong>
        <span>de votre objectif</span>
      </div>
    </div>
  );
}

export default ScoreChart;
