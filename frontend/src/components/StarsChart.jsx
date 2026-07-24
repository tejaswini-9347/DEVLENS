import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const StarsChart = ({ repositories }) => {
  const data = repositories.map((repo) => ({
    name: repo.name,
    stars: repo.stars,
  }));

  if (data.length === 0) return null;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        ⭐ Stars Per Repository
      </h2>

      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stars" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StarsChart;