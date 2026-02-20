import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface MoodLog {
  id: string;
  mood_score: number;
  mood_emoji: string | null;
  created_at: string;
}

interface Props {
  logs: MoodLog[];
}

const moodLabels: Record<number, string> = {
  1: "Hard 😢",
  2: "Low 😔",
  3: "Okay 😐",
  4: "Good 🙂",
  5: "Great 😄",
};

const MoodChart = ({ logs }: Props) => {
  const data = logs.map((log) => ({
    date: new Date(log.created_at).toLocaleDateString("en-CA", { month: "short", day: "numeric" }),
    score: log.mood_score,
    emoji: log.mood_emoji,
  }));

  const avg = logs.length > 0 ? (logs.reduce((s, l) => s + l.mood_score, 0) / logs.length).toFixed(1) : "—";

  return (
    <div className="bg-white rounded-hub shadow-card p-5 border border-sage/10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-navy">Mood Over Time</h3>
          <p className="text-xs text-navy/40 mt-0.5">{logs.length} check-ins recorded</p>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-2xl text-sage">{avg}</p>
          <p className="text-[10px] text-navy/40">avg score</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(132, 10%, 61%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(132, 10%, 61%)" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(36, 15%, 82%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "hsl(205, 40%, 40%)" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 10, fill: "hsl(205, 40%, 40%)" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "white",
              border: "1px solid hsl(36, 15%, 82%)",
              borderRadius: "12px",
              fontSize: "12px",
              boxShadow: "0 4px 24px rgba(3,63,99,0.1)",
            }}
            formatter={(value: number) => [moodLabels[value] || value, "Mood"]}
            labelStyle={{ color: "hsl(205, 95%, 21%)", fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="hsl(132, 10%, 61%)"
            strokeWidth={2.5}
            fill="url(#moodGradient)"
            dot={{ fill: "hsl(132, 10%, 61%)", r: 4, strokeWidth: 2, stroke: "white" }}
            activeDot={{ r: 6, fill: "hsl(17, 70%, 52%)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
