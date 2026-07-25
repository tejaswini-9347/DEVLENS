import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDF(data) {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("DevLens GitHub Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Username: ${data.profile.login}`, 14, 35);
  doc.text(`Name: ${data.profile.name || "-"}`, 14, 43);
  doc.text(`Followers: ${data.profile.followers}`, 14, 51);
  doc.text(`Repositories: ${data.profile.public_repos}`, 14, 59);

  doc.setFontSize(16);
  doc.text("Developer Score", 14, 75);

  doc.setFontSize(13);
  doc.text(`${data.developerScore.score}/100`, 14, 84);

  doc.setFontSize(16);
  doc.text("AI Summary", 14, 100);

  doc.setFontSize(11);
  doc.text(data.aiSummary, 14, 110, {
    maxWidth: 180,
  });

  autoTable(doc, {
    startY: 145,
    head: [["Detected Skills"]],
    body: data.skills.map((skill) => [skill]),
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Career", "Match"]],
    body: data.careerRecommendations.map((career) => [
      career.role,
      `${career.score}%`,
    ]),
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Resume Score"]],
    body: [[`${data.resumeAnalysis.score}/100`]],
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Growth Prediction"]],
    body: [
      [
        `${data.growthPrediction.repositories.current} ➜ ${data.growthPrediction.repositories.predicted}`,
      ],
      [
        `${data.growthPrediction.followers.current} ➜ ${data.growthPrediction.followers.predicted}`,
      ],
      [
        `${data.growthPrediction.stars.current} ➜ ${data.growthPrediction.stars.predicted}`,
      ],
    ],
  });

  doc.save("DevLens_Report.pdf");
}