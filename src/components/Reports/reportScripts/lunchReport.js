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

//Adding a cover page 
const addCoverPage = (doc)  => {
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text(`Eagle Pass Heli`, 10, 30);
  doc.text(`Date: `, 10, 40);

  
  // Drawing the headers for main page table 
  doc.setTextColor(primaryColor);
  doc.setFontSize(14);
  doc.text(`Client with Dietary Restrictions`, 10, 60);
  let y = 65;  
//build table here
const drawMainHeaders = (doc, y) => {
  doc.setTextColor(0, 0, 0);
doc.setFontSize(12);
doc.setFont('helvetica','bold');
const Mainheaders = [
  { mainheader: 'Last Name', width: 45 },
  { mainheader: 'First Name', width: 45 },
  { mainheader: 'Dietary Restrictions', width: 70 },
  { mainheader: 'Cannot Eat', width: 80 },
  { mainheader: 'Severity', width: 40 }
];

let x = 10;
Mainheaders.forEach(mainhead => {
  doc.setDrawColor(0);
  doc.setFillColor(211, 211, 211);
  doc.rect(x, y, mainhead.width, 10, 'FD');
  doc.text(mainhead.mainheader, x + 5, y + 7);
  x += mainhead.width;
});
doc.setFont('helvetica','normal');
return y + 10;
};

  y = drawMainHeaders(doc, y);
  y += 5;
  doc.setFontSize(10);
  data.forEach(helicopter => {
    helicopter.groups.forEach(group => {
      group.clients.forEach(client => {
        let x =15;
        let rectHeight =12;
        // Dietary Restrictions checkbox
        if (client.dietaryRestrictions) {
          doc.setTextColor(redColor);
          // Draw rectangle for 'Last Name' column
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255); // White fill for 'Last Name' column
          doc.rect(x-5, y-5, 45, rectHeight, 'FD');
          doc.text(client.lastName, x, y);
          x+=45; // Width of each column

          // Draw rectangle for 'First Name' column
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255); // White fill for 'First Name column
          doc.rect(x-5, y-5, 45, rectHeight, 'FD');
          doc.text(client.firstName, x, y);
          x+=45; // Width of each column

          // Draw rectangle for 'Dietary Restriction' column
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255); // White fill for 'Dietary Restriction' column
          doc.rect(x-5, y-5, 70, rectHeight, 'FD');
          doc.text("Yes", x, y);
          x+=70; // Width of each column

          // Draw rectangle for 'Cannot Eat' column
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255); // White fill for 'Cannot Eat' column
          doc.rect(x-5, y-5, 80, rectHeight, 'FD');
          const cannotEatLines = splitTextToLines(client.cannotEat || "N/A", 45);
          cannotEatLines.forEach((line, index) => {
            doc.text(line, x, y + (index * 5));
          });
          x+=80; // Width of each column

          // Draw rectangle for 'Severity' column
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255); // White fill for 'Severity' column
          doc.rect(x-5, y-5, 40, rectHeight, 'FD');
          doc.text(client.severity, x, y);
          
          
        }
        
        
      })
    })
  });


  doc.addPage(); // Add a new page for the detailed reports
};



  const checkPageOverflow = (yPosition) => {
    if (yPosition >= 180) {
      doc.addPage('landscape');
      return 20; // Reset yPos for new page
    }
    return yPosition;
  };
  // Pass this data to the cover page function
  addCoverPage(doc);

  // Define headers and their respective positions and widths
  const headers = [
    { title: "Last Name", x: 10, width: 45 },
    { title: "First Name", x: 55, width: 45 },
    { title: "Dietary Restriction", x: 100, width: 70 }, // Shortened title and adjusted width
    { title: "Cannot Eat", x: 170, width: 80 },
    { title: "Severity", x: 250, width: 40 },
  ];

  // Define a function to draw headers
  const drawHeaders = (y) => {
    doc.setFillColor(0); // Set fill color to black for headers
    headers.forEach(header => {
      doc.setFillColor(0);
      doc.rect(header.x, y, header.width, 5, 'F'); // Draw filled rectangles for header background
      doc.setTextColor(255, 255, 255); // Set text color to white for header titles
      doc.text(header.title, header.x + (header.width / 2), y + 3.5, { align: "center" }); // Center the header title
    });
    doc.setTextColor(0, 0, 0); // Reset text color to black for other text
  };

  let groupCount = 0;
  // Start processing each helicopter and its groups
  data.forEach(helicopter => {
    helicopter.groups.forEach(group => {

      if (groupCount > 0 && groupCount % 4 === 0) {
        doc.addPage('landscape');
        yPos = 20; // Reset yPos for new page
      }
      groupCount++;

      yPos = checkPageOverflow(yPos);

      // Group header
      doc.setFontSize(14);
      doc.setTextColor(primaryColor); // Set group header color to primary color
      doc.text(`Heli #${helicopter.heliIndex} - Group #${group.groupIndex}`, 10, yPos);
      yPos += 3; // Move down for headers
      doc.setFontSize(11);
      // Draw the headers
      drawHeaders(yPos);
      yPos += 9; // Adjust Y position after headers to provide space for client details

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
          doc.text("Yes", headers[2].x + (headers[2].width / 2), yPos, { align: "center" });
        } else {
          doc.text("No", headers[2].x + (headers[2].width / 2), yPos, { align: "center" });
        }

        // Remaining client details
        const cannotEatLines = splitTextToLines(client.cannotEat || "N/A", 45);
        cannotEatLines.forEach((line, index) => {
          doc.text(line, headers[3].x, yPos + (index * 5));
        });
        doc.text(client.severity || "N/A", headers[4].x, yPos);

        yPos += 5; // Increment yPos for the next client
      });

      yPos += (groupCount % 4 === 0) ? 20 : 5; 
    });

    // Calculate and display total lunches
    const totalGuestLunches = helicopter.groups.reduce((acc, group) => acc + group.clients.length, 0);
    const totalGuideLunches = helicopter.groups.length;
    const totalPilotLunches = 1;
    const totalLunches = totalGuestLunches + totalGuideLunches + totalPilotLunches;

    yPos = checkPageOverflow(yPos) + 5; // Ensure footer doesn't overlap with client details
    doc.setFontSize(12);
    doc.setTextColor(blackColor); // Reset text color to black for footer
    const footerText = `Heli #${helicopter.heliIndex} (Guest Lunches: ${totalGuestLunches}) + (1 Pilot Lunch) + (${totalGuideLunches} Guide Lunches) = Heli #${helicopter.heliIndex} (Total Lunches: ${totalLunches})`;
    const footerParts = footerText.split(`Heli #${helicopter.heliIndex} (Total Lunches: `);
    doc.text(footerParts[0], 10, yPos);
    doc.setTextColor(redColor); // Set text color to red for total lunches
    doc.text(`Heli #${helicopter.heliIndex} (Total Lunches: ${totalLunches})`, 10 + doc.getTextWidth(footerParts[0]), yPos);

    yPos += 10; // Space after each helicopter's total
  });

  const today = new Date();
  const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  doc.save(`daily-lunch-report-${dateString}.pdf`);
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
