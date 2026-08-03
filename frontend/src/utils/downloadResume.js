import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
export const downloadResume = async () => {
  const element = document.getElementById("resume-template");

  if (!element) {
    toast.error("Resume template not found!");
    return;
  }

  try {
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(dataUrl);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("Resume.pdf");
  } catch (err) {
    console.error(err);
    toast.error("Failed to generate PDF");
  }
};