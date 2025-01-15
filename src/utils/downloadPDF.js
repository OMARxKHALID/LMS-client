export async function downloadPDF(pdfURL, bookTitle) {
  try {
    const sanitizedTitle = bookTitle.replace(/\s+/g, "_");

    const response = await fetch(pdfURL);
    if (!response.ok) {
      throw new Error("Failed to fetch the file.");
    }
    const blob = await response.blob();
    const downloadLink = document.createElement("a");
    const fileName = `${sanitizedTitle}.pdf`;
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.error("Error downloading the PDF:", error);
  }
}
