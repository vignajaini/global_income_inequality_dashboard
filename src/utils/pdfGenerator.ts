import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface DashboardData {
  title: string;
  description: string;
  insights: string[];
  imageElement: HTMLImageElement;
}

export const generateDashboardPDF = async (data: DashboardData) => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(100, 150, 255);
  pdf.text(data.title, margin, margin + 10);

  // Description
  pdf.setFontSize(11);
  pdf.setTextColor(80, 80, 80);
  const splitDescription = pdf.splitTextToSize(data.description, contentWidth);
  pdf.text(splitDescription, margin, margin + 20);

  // Dashboard Image
  try {
    const canvas = await html2canvas(data.imageElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let yPosition = margin + 35;
    
    // Add new page if needed
    if (yPosition + imgHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
    yPosition += imgHeight + 10;

    // Key Insights
    if (yPosition > pageHeight - 50) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(14);
    pdf.setTextColor(100, 150, 255);
    pdf.text("Key Insights", margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);

    data.insights.forEach((insight, index) => {
      if (yPosition > pageHeight - margin - 10) {
        pdf.addPage();
        yPosition = margin;
      }

      const bulletPoint = `${index + 1}. `;
      const splitInsight = pdf.splitTextToSize(insight, contentWidth - 10);
      
      pdf.text(bulletPoint, margin, yPosition);
      pdf.text(splitInsight, margin + 5, yPosition);
      
      yPosition += splitInsight.length * 5 + 3;
    });

  } catch (error) {
    console.error("Error generating PDF:", error);
  }

  // Footer
  const timestamp = new Date().toLocaleString();
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    `Generated on ${timestamp} | Income Inequality Dashboard Analysis`,
    margin,
    pageHeight - 10
  );

  // Save
  pdf.save(`${data.title.replace(/\s+/g, "_")}_Report.pdf`);
};
