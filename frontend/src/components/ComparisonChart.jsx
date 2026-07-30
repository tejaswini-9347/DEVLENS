import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ComparisonChart({
  profile1,
  profile2,
  repoStats1,
  repoStats2,
  score1,
  score2,
}) {
  const data = {
    labels: [
      "Followers",
      "Repositories",
      "Stars",
      "Forks",
      "Developer Score",
    ],
    datasets: [
      {
        label: profile1.login,
        data: [
          profile1.followers,
          profile1.public_repos,
          repoStats1.totalStars,
          repoStats1.totalForks,
          score1,
        ],
        backgroundColor: "#06b6d4",
      },
      {
        label: profile2.login,
        data: [
          profile2.followers,
          profile2.public_repos,
          repoStats2.totalStars,
          repoStats2.totalForks,
          score2,
        ],
        backgroundColor: "#f59e0b",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        📊 Comparison Analytics
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}