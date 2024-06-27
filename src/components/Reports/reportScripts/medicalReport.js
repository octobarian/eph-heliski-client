import { jsPDF } from "jspdf";

export default function generateMedicalReport(data, date) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const reportDate = date;

  let yPos = 10; // Set initial Y position

  doc.setFontSize(18);
  doc.text("Medical Report", 148, yPos, { align: "center" });
  yPos += 10; // Adjust position after the title

  // Define headers and their respective starting positions and widths
  const headerConfig = [
    { header: "Last Name", startPos: 10, width: 50 },
    { header: "First Name", startPos: 60, width: 50 },
    { header: "Medical Con", startPos: 110, width: 40 },
    { header: "Diet Restrict", startPos: 150, width: 40 },
    { header: "Allergy RX", startPos: 190, width: 40 },
    { header: "Severity", startPos: 230, width: 30 },
    { header: "Prescriptions", startPos: 260, width: 40 }
  ];

  // Set font size for headers
  doc.setFontSize(10);

  // Check for page overflow
  const checkPageOverflow = (yPosition) => {
    if (yPosition >= 180) { // Adjusted for the bottom margin
      doc.addPage();
      return 20; // Reset yPos for new page
    }
    return yPosition;
  };

  // Loop through each helicopter and group
  data.forEach(helicopter => {
    yPos = checkPageOverflow(yPos);

    // Helicopter header
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text(`Heli #${helicopter.heliIndex}: ${helicopter.helicopterId}`, 10, yPos);
    doc.text(`Date: ${reportDate}`, 160, yPos); //Date of the report
    yPos += 5;
    doc.setFillColor(200, 200, 200); //Change the RGB color to light grey

    helicopter.groups.forEach(group => {
      yPos = checkPageOverflow(yPos);

      // Group header with background color
      doc.setFillColor(200, 215, 1); // RGB color for yellow background
      doc.rect(10, yPos, headerConfig.reduce((sum, hc) => sum + hc.width, 0), 5, 'F'); // Draw filled rectangle for header background
      doc.setTextColor(0, 0, 0); // Set text color to black
      doc.setFontSize(10);
      doc.text(`Group #${group.groupIndex}`, 12, yPos + 4);
      yPos += 5;

      // Print headers with background color
      headerConfig.forEach((header) => {
        //doc.setFillColor(211, 211, 211); // RGB color for grey background
        doc.rect(10, yPos+1, headerConfig.reduce((sum, hc) => sum + hc.width, 0), 5); // Draw filled rectangle for header background
        //doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Reset text color to black
        doc.text(header.header, header.startPos + 2, yPos + 5); // Add text over the fill
      });

      yPos += 10; // Adding space for data entries
      var biggestExtraSpace = 0;

      group.clients.forEach(client => {
        yPos = checkPageOverflow(yPos);
        doc.setTextColor(0, 0, 0);
        // Iterate through each client and print their details
        headerConfig.forEach((col) => {
          let text;
          switch (col.header) {
            case "Last Name":
              doc.setFontSize(10);
              text = client.lastName || "";
              break;
            case "First Name":
              doc.setFontSize(10);
              text = client.firstName || "";
              break;
            case "Medical Con":
            case "Diet Restrict":
            case "Allergy RX":
            case "Severity":
            case "Prescriptions":
              doc.setFontSize(9); // Font size reduced for custom fields
              text = client.customFields[col.header] ? client.customFields[col.header].trim() : "";
              break;
            default:
              doc.setFontSize(10); // Reset to default font size for other fields
              text = "";
          }
          doc.text(text, col.startPos + 2, yPos, { maxWidth: col.width - 2 }); // Adjust text within column width
          var fieldLength = text.split(/\r\n|\r|\n/).length; // Count the number of lines
          var extraSpace;

          if (fieldLength > 1) {
            // If there are newlines, stick with newline calculation
            extraSpace = 2 * (fieldLength + 1);
          } else {
            // If no newlines, check if text length is greater than 20
            if (text.length > 20) {
              extraSpace = 4.5; // If text length is greater than 20, set extraSpace to 2
            } else if (text.length > 40) {
              extraSpace = 6;
            } else {
              extraSpace = 0; // Otherwise, no extra space needed
            }
          }
          if (extraSpace > biggestExtraSpace) { biggestExtraSpace = extraSpace; }
        });
        yPos += 6 + biggestExtraSpace;
        biggestExtraSpace = 0;
      });

      yPos += 1; // Additional space after each group
    });
  });

  const today = new Date(date);
  const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  doc.save(`daily-medical-report-${dateString}.pdf`);
}
