import { jsPDF } from "jspdf";

export default function generateRentalReport(data) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  let yPos = 10; // Set initial Y position
  const primaryColor = '#c8d701'; // Set primary color
  const redColor = '#f04e26'; // Set red color

  // Get the totals from the last helicopter in the data array
  const lastHelicopter = data[data.length - 1];
  const totalRentalsDay = lastHelicopter.totalRental || 0;
  const totalSkisDay = lastHelicopter.totalski || 0;
  const totalBoardsDay = lastHelicopter.totalboard || 0;

  doc.setFontSize(18);
  doc.setTextColor(primaryColor); // Set title color to primary color
  doc.text("Rental Report", 148, yPos, { align: "center" });
  yPos += 10; // Adjust position after the title

  // Add summary line at the top
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Set text color to black for the summary line
  doc.text("Total Rentals Day: ", 10, yPos);
  doc.setTextColor(redColor);
  doc.text(`${totalRentalsDay}`, 50, yPos);

  doc.setTextColor(0, 0, 0);
  doc.text("Total Skis Day: ", 70, yPos);
  doc.setTextColor(redColor);
  doc.text(`${totalSkisDay}`, 110, yPos);

  doc.setTextColor(0, 0, 0);
  doc.text("Total Boards Day: ", 130, yPos);
  doc.setTextColor(redColor);
  doc.text(`${totalBoardsDay}`, 170, yPos);
  doc.setTextColor(0, 0, 0);

  yPos += 10;

  const checkPageOverflow = (yPosition) => {
    if (yPosition >= 200) {
      doc.addPage('landscape');
      return 20; // Reset yPos for new page
    }
    return yPosition;
  };

  // Define headers and their respective positions and widths
  const headers = [
    { title: "Last Name", x: 10, width: 45 },
    { title: "First Name", x: 55, width: 45 },
    { title: "Rentals", x: 100, width: 50 },
    { title: "Preferred Ski/Board", x: 150, width: 80 },
    { title: "Size", x: 230, width: 40 },
  ];

  // Define a function to draw headers
  const drawHeaders = (y) => {
    doc.setFillColor(0); // Set fill color to black for headers
    headers.forEach(header => {
      doc.setFillColor(0);
      doc.rect(header.x, y, header.width, 8, 'F'); // Draw filled rectangles for header background
      doc.setTextColor(255, 255, 255); // Set text color to white for header titles
      doc.text(header.title, header.x + (header.width / 2), y + 6, { align: "center" }); // Center the header title
    });
    doc.setTextColor(0, 0, 0); // Reset text color to black for other text
  };

  let groupCount = 0;
  // Start processing each helicopter and its groups
  data.forEach(helicopter => {
    helicopter.groups.forEach(group => {

      if (groupCount > 0 && groupCount % 2 === 0) {
        doc.addPage('landscape');
        yPos = 20; // Reset yPos for new page
      }
      groupCount++;

      yPos = checkPageOverflow(yPos);

      // Group header
      doc.setFontSize(14);
      doc.setTextColor(primaryColor); // Set group header color to primary color
      doc.text(`Heli #${helicopter.heliIndex} - Group #${group.groupIndex}`, 10, yPos);
      yPos += 10; // Move down for headers

      // Draw the headers
      drawHeaders(yPos);
      yPos += 13; // Adjust Y position after headers to provide space for client details

      // Client details
      group.clients.forEach(client => {
        yPos = checkPageOverflow(yPos);

        // Set text color for client names to primary color
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(client.lastName || "N/A", headers[0].x, yPos);
        doc.text(client.firstName || "N/A", headers[1].x, yPos);
        doc.text(client.rentals || "N/A", headers[2].x, yPos);

        const preferredSkiBoardLines = doc.splitTextToSize(client.preferredSkiBoard || "N/A", headers[3].width);
        preferredSkiBoardLines.forEach((line, index) => {
          doc.text(line, headers[3].x, yPos + (index * 5));
        });

        doc.text(client.size || "N/A", headers[4].x, yPos);

        yPos += (preferredSkiBoardLines.length * 5) > 10 ? (preferredSkiBoardLines.length * 5) : 10; // Adjust yPos based on the text height
      });

      doc.setFont(undefined, "bold");
      doc.setTextColor(redColor);
      doc.text("Total Ski: "+ String(group.groupski), headers[2].x, yPos);
      doc.text("Total Board: "+ String(group.groupboard), headers[3].x, yPos);
      doc.text("Total Rentals: "+ String(group.totalGroupRentals), headers[4].x, yPos);
      yPos += (groupCount % 2 === 0) ? 20 : 10;
      doc.setFont(undefined, "normal");
      doc.setTextColor(0, 0, 0); // Reset text color to black for other text
    });

    // Footer with total counts
    yPos = checkPageOverflow(yPos) + 5; // Ensure footer doesn't overlap with client details
    doc.setFontSize(12);
    let totalGuestRentals = helicopter.groups.reduce((acc, group) => acc + group.totalGroupRentals, 0);
    doc.setTextColor(0, 0, 0); // Reset text color to black for footer
    doc.text(`Heli #${helicopter.heliIndex} Guest Rentals: ${totalGuestRentals}`, 10, yPos);
  });

  const today = new Date();
  const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  doc.save(`daily-rental-report-${dateString}.pdf`);
}
