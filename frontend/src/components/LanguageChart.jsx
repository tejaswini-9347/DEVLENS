import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
];

const LanguageChart = ({ languageStats }) => {
  const data = Object.entries(languageStats || {}).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        🥧 Language Distribution
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={130}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LanguageChart;