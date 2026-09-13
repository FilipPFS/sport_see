import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// deux "M" volontaires : mardi et mercredi partagent la même initiale
const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

function AverageSessionsChart({ sessions = [] }) {
  const data = sessions.map((s) => ({
    day: s.day,
    sessionLength: s.sessionLength,
  }));

  return (
    <div className="chart-card session-duration">
      <h2 className="chart-card__title">
        Durée moyenne des
        <br />
        sessions
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 70, bottom: 20, left: 10, right: 10 }}
        >
          {/* la ligne s'éclaircit progressivement de gauche à droite */}
          <defs>
            <linearGradient id="sessionStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            // day vaut 1 à 7, donc on décale l'index pour retrouver la bonne lettre
            tickFormatter={(d) => DAYS[d - 1] ?? d}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            padding={{ left: 10, right: 10 }}
          />
          {/* axe masqué, seule la marge sert à garder la courbe centrée verticalement */}
          <YAxis hide domain={["dataMin - 10", "dataMax + 20"]} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "none",
              padding: "6px 10px",
            }}
            itemStyle={{ color: "#000", fontSize: 12 }}
            labelStyle={{ display: "none" }}
            cursor={false}
            formatter={(value) => [`${value} min`, ""]}
          />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#sessionStroke)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              stroke: "rgba(255,255,255,0.4)",
              strokeWidth: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
