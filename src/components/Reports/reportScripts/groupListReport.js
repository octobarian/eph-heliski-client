import { jsPDF } from "jspdf";

export default function generateGroupListReport(data) {
  const doc = new jsPDF('portrait');

  // Adding a cover page
  const addCoverPage = (doc, helicopterIds, groupIds, totalClients, reportDate) => {
    doc.setFontSize(20);
    doc.text("Client Group List", 10, 20);
    doc.setFontSize(16);
    doc.text(`Eagle Pass Heli`, 10, 30);
    doc.text(`Date: ${reportDate}`, 10, 40);

    const summaries = [
      {
        title: 'Heli Breakdown',
        details: `Helicopters: ${helicopterIds.join(', ')}`
      },
      {
        title: 'Groups',
        details: `Group IDs: ${groupIds.join(', ')}`
      },
      {
        title: 'Total Clients',
        details: `Total Clients: ${totalClients}`
      }
    ];

    let y = 60;
    summaries.forEach(summary => {
      doc.setFontSize(12);
      doc.text(summary.title, 10, y);
      doc.setFontSize(10);
      doc.text(summary.details, 10, y + 10);
      y += 30;
    });

    doc.addPage(); // Add a new page for the detailed reports
  };

  // Drawing the headers for each group section
  const drawHeaders = (doc, y) => {
    doc.setFontSize(10);
    const headers = [
      { header: 'Last Name', width: 50 },
      { header: 'First Name', width: 50 },
      { header: 'Weight', width: 30 },
      { header: 'Beacon #', width: 30 },
      { header: 'Allergies', width: 30 }
    ];

    let x = 10;
    headers.forEach(head => {
      doc.setDrawColor(0);
      doc.setFillColor(211, 211, 211);
      doc.rect(x, y, head.width, 10, 'FD');
      doc.text(head.header, x + 5, y + 7);
      x += head.width;
    });

    return y + 10;
  };

  // Assuming 'data' is an array where each entry represents a helicopter's data.
  const allHelicopterIds = data.map(helicopter => `Heli #${helicopter.heliIndex}`);
  const allGroupIds = [];
  let totalClients = 0;

  data.forEach(helicopter => {
    helicopter.groups.forEach(group => {
      allGroupIds.push(`Group #${group.groupIndex}`);
      totalClients += group.clients.length;
    });
  });

  // Get today's date for the cover page
  const today = new Date();
  const reportDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  // Pass this data to the cover page function
  addCoverPage(doc, allHelicopterIds, allGroupIds, totalClients, reportDate);

  data.forEach((helicopter, index) => {
    if (index > 0) doc.addPage();
    doc.setFontSize(16);
    doc.text(`Heli #${helicopter.heliIndex}`, 10, 20);
    doc.text(`Pilot: ${helicopter.pilot}`, 10, 30);
    let y = 40;

    helicopter.groups.forEach(group => {
      doc.setFontSize(14);
      doc.text(`Group #${group.groupIndex}`, 10, y - 5);
      y = drawHeaders(doc, y);
      y += 5;

      group.clients.forEach(client => {
        let x = 10;
        doc.setFontSize(10);
        doc.text(client.lastName, x, y);
        x += 50;
        doc.text(client.firstName, x, y);
        x += 50;
        doc.text(client.weight.toString(), x, y);
        x += 30;
        doc.text(client.beacon || 'N/A', x, y);
        x += 30;
        doc.setTextColor(client.medical_fields ? 255 : 0, 0, 0);
        doc.text(client.medical_fields ? "YES" : "NO", x, y);
        doc.setTextColor(0);
        y += 10;
      });

      doc.text(`Fuel Percentage: ${group.fuelPercentage}%`, 10, y + 5);
      y += 20;
    });
  });

  doc.save(`group-list-report-${reportDate}.pdf`);
}
