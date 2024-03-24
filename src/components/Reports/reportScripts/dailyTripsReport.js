import { jsPDF } from "jspdf";

export default function generateDailyTripsReport(data) {
  const doc = new jsPDF();

  // Define a method to draw headers
  const drawHeaders = (doc, y) => {
    doc.setFontSize(10);
    const headers = [
      { header: 'Last Name', width: 30 },
      { header: 'First Name', width: 30 },
      { header: 'Weight', width: 20 },
      { header: 'Beacon', width: 20 },
      { header: 'Medical', width: 20 },
      { header: 'Dietary', width: 20 },
      // Assuming a guide column exists, if not, remove it
    ];

    let x = 10; // Starting x position
    headers.forEach(head => {
      doc.setDrawColor(0);
      doc.setFillColor(211, 211, 211); // Light grey fill
      doc.rect(x, y, head.width, 10, 'FD'); // 'FD' means fill and draw border
      doc.text(head.header, x + 2, y + 7); // Offset text a bit down and right
      x += head.width;
    });

    return y + 10; // Return the new Y position after headers
  };

  data.forEach((helicopter, index) => {
    if (index > 0) doc.addPage();
    doc.setFontSize(16);
    doc.text(`Helicopter: ${helicopter.helicopterId}`, 10, 20);
    doc.text(`Pilot: ${helicopter.pilot}`, 10, 30);
    let y = 40;

    helicopter.groups.forEach(group => {
      doc.setFontSize(14);
      doc.text(`Group ${group.groupId}`, 10, y - 5);
      y = drawHeaders(doc, y);
      y+=5;
      group.clients.forEach(client => {
        let x = 10; // Reset x position for each new line
        doc.setFontSize(10);
        doc.text(client.lastName, x, y);
        x += 30;
        doc.text(client.firstName, x, y);
        x += 30;
        doc.text(client.weight.toString(), x, y);
        x += 20;
        doc.text(client.beacon, x, y);
        x += 20;
        // Handle medical and dietary fields as arrays
        const medical = client.medical_fields.find(field => field.field_value !== 'None') ? 'Yes' : 'No';
        const dietary = client.dietary_field.find(field => field.field_value !== 'None') ? 'Yes' : 'No';
        doc.text(medical, x, y);
        x += 20;
        doc.text(dietary, x, y);
        y += 10; // Increment y position for next client
      });

      // Add space before the next group or helicopter
      doc.text(`Fuel Percentage: ${group.fuelPercentage}%`, 10, y + 5);
      y += 20;
    });
  });

  doc.save("daily-trips-report.pdf");
}
