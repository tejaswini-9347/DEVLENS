import { FaRobot } from "react-icons/fa";

export default function AIAnalysis({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 mt-8 border border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-3xl text-blue-400" />
        <h2 className="text-2xl font-bold">
          AI Repository Analysis
        </h2>
      </div>

      <div className="bg-gray-800 rounded-lg p-5 whitespace-pre-wrap leading-8 text-gray-200">
        {analysis}
      </div>
    </div>
  );
}