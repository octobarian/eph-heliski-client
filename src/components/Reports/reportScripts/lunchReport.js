import { jsPDF } from "jspdf";

export default function generateLunchReport(data) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  let yPos = 10; // Set initial Y position
  const primaryColor = '#c8d701'; // Set primary color
  const blueColor = '#596787';
  const redColor = '#f04e26';
  const blackColor = '#000000';

  doc.setFontSize(18);
  doc.setTextColor(primaryColor); // Set title color to primary color
  doc.text("Group Lunch Report", 148, yPos, { align: "center" });
  yPos += 10; // Adjust position after the title

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
    { title: "Diet?", x: 100, width: 20 }, // Shortened title and adjusted width
    { title: "Cannot Eat", x: 120, width: 80 },
    { title: "Severity", x: 200, width: 40 },
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
      doc.text(`Group ${group.groupId} - - Helicopter: ${helicopter.helicopterId}`, 10, yPos);
      yPos += 10; // Move down for headers

      // Draw the headers
      drawHeaders(yPos);
      yPos += 13; // Adjust Y position after headers to provide space for client details

      // Client details
      group.clients.forEach(client => {
        yPos = checkPageOverflow(yPos);

        // Set text color for client names to primary color
        doc.setTextColor(blueColor);
        doc.setFontSize(10);
        doc.text(client.lastName || "N/A", headers[0].x, yPos);
        doc.text(client.firstName || "N/A", headers[1].x, yPos);
        
        // Reset text color to black for remaining details
        doc.setTextColor(blackColor);
        doc.setFontSize(10);
        // Dietary Restrictions checkbox
        if (client.dietaryRestrictions) {
          doc.setTextColor(redColor);
          doc.text(client.dietaryRestrictions === true ? "Yes" : "No", headers[2].x + (headers[2].width / 2), yPos, { align: "center" });
        } else {
          doc.text(client.dietaryRestrictions === true ? "Yes" : "No", headers[2].x + (headers[2].width / 2), yPos, { align: "center" });
        }

        // Remaining client details
        const cannotEatLines = splitTextToLines(client.cannotEat || "N/A", 45);
        cannotEatLines.forEach((line, index) => {
          doc.text(line, headers[3].x, yPos + (index * 5));
        });
        doc.text(client.severity || "N/A", headers[4].x, yPos);

        yPos += 10; // Increment yPos for the next client
      });

      yPos += (groupCount % 2 === 0) ? 20 : 10; 
    });

    // Footer with total counts
    yPos = checkPageOverflow(yPos) + 5; // Ensure footer doesn't overlap with client details
    doc.setFontSize(12);
    let totalGuestLunches = helicopter.groups.reduce((acc, group) => acc + group.clients.length, 0);
    doc.setTextColor(blackColor); // Reset text color to black for footer
    doc.text(`Helicopter ${helicopter.helicopterId} Guest Lunches: ${totalGuestLunches}`, 10, yPos);
  });

  // Save the PDF
  doc.save("group-lunch-report.pdf");
}

function splitTextToLines(text, maxLength) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  words.slice(1).forEach((word) => {
    if ((currentLine + ' ' + word).length > maxLength) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine += ' ' + word;
    }
  });

  // Push the last line
  lines.push(currentLine);

  return lines;
}
