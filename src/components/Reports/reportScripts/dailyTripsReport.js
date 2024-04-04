import { jsPDF } from "jspdf";

export default function generateDailyTripsReport(data) {
  const doc = new jsPDF('landscape');

  const drawHeaders = (doc, y) => {
    doc.setFontSize(10);
    const headers = [
      { header: 'Last Name', width: 40 },
      { header: 'First Name', width: 40 },
      { header: 'Weight', width: 30 },
      { header: 'Beacon', width: 30 },
      { header: 'Medical', width: 30 },
      { header: 'Dietary', width: 30 },
      { header: 'Ski/Snowboard', width: 40 }, // New column for ski/snowboard preference
    ];

    let x = 10; // Starting x position
    headers.forEach(head => {
      doc.setDrawColor(0);
      doc.setFillColor(211, 211, 211);
      doc.rect(x, y, head.width, 10, 'FD');
      doc.text(head.header, x + 5, y + 7); // Offset text a bit down and right within cell
      x += head.width;
    });

    return y + 10;
  };

  data.forEach((helicopter, index) => {
    if (index > 0) doc.addPage('landscape');
    doc.setFontSize(16);
    doc.text(`Helicopter: ${helicopter.helicopterId}`, 10, 20);
    doc.text(`Pilot: ${helicopter.pilot}`, 10, 30);
    let y = 40;

    helicopter.groups.forEach(group => {
      let totalWeight = 0;
      doc.setFontSize(14);
      doc.text(`Group ${group.groupId}`, 10, y - 5);
      y = drawHeaders(doc, y);
      y += 5;
      group.clients.forEach(client => {
        let x = 10;
        doc.setFontSize(10);
        doc.text(client.lastName, x, y);
        x += 40;
        doc.text(client.firstName, x, y);
        x += 40;
        doc.text(client.weight.toString(), x, y);
        totalWeight += parseInt(client.weight);
        x += 30;
        doc.text(client.beacon, x, y);
        x += 30;
        const medical = client.medical_fields ? "YES" : "NO";
        const dietary = client.dietary_fields ? "YES" : "NO";

        // Change color to red if medical field is "YES"
        if (medical === "YES") doc.setTextColor(255, 0, 0);
        doc.text(medical, x, y);
        doc.setTextColor(0); // Reset to default color
        x += 30;

        // Change color to red if dietary field is "YES"
        if (dietary === "YES") doc.setTextColor(255, 0, 0);
        doc.text(dietary, x, y);
        doc.setTextColor(0); // Reset to default color
        x += 30;

        // Assuming `skiOrSnowboard` is a property of the client object
        // Replace 'skiOrSnowboard' with the actual property name if different
        const skiOrSnowboard = client.ridertype || 'N/A'; 
        doc.text(skiOrSnowboard, x, y);

        y += 10; // Increment y position for next client
      });

      doc.text(`Total Weight: ${totalWeight}lb`, 10, y + 5);
      y += 10; // Extra space before fuel percentage
      doc.text(`Fuel Percentage: ${group.fuelPercentage}%`, 10, y + 5);
      y += 20;
    });
  });

  doc.save("daily-trips-report.pdf");
}
