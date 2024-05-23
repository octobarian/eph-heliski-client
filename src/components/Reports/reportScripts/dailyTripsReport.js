import { jsPDF } from "jspdf";

export default function generateGuideReport(data) {
  const doc = new jsPDF('landscape');

  // Adding a cover page
  const addCoverPage = (doc, helicopterIds, groupIds, totalClients) => {
    doc.setFontSize(20);
    doc.text("Guide Report", 10, 20);
    doc.setFontSize(16);
    doc.text(`Report Date: ${new Date().toISOString().substr(0, 10)}`, 10, 30);
  
    const summaries = [
      {
        title: 'Program Breakdown',
        details: `Total Guests: ${totalClients}`
      },
      {
        title: 'Heli Breakdown',
        details: `Helicopters: ${helicopterIds.join(', ')}`
      },
      {
        title: 'Groups',
        details: `Group IDs: ${groupIds.join(', ')}`
      },
      {
        title: 'Total Guides',
        details: 'Number of Guides' // You'll need to calculate or adjust this if needed
      }
    ];
  
    let y = 50;
    summaries.forEach(summary => {
      doc.setFontSize(12);
      doc.text(summary.title, 10, y);
      doc.setFontSize(10);
      doc.text(summary.details, 10, y + 10);
      y += 30;
    });
  
    doc.addPage('landscape'); // Add a new page for the detailed reports
  };
  

  // Drawing the headers for each group section
  const drawHeaders = (doc, y) => {
    doc.setFontSize(10);
    const headers = [
      { header: 'Last Name', width: 40 },
      { header: 'First Name', width: 40 },
      { header: 'Weight', width: 30 },
      { header: 'Beacon', width: 30 },
      { header: 'Medical', width: 30 },
      { header: 'Dietary', width: 30 },
      { header: 'Ski/Snowboard', width: 40 }
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
  const allHelicopterIds = data.map(helicopter => helicopter.helicopterId);
  const allGroupIds = [];
  let totalClients = 0;

  data.forEach(helicopter => {
    helicopter.groups.forEach(group => {
      allGroupIds.push(group.groupId);
      totalClients += group.clients.length;
    });
  });

  // Pass this data to the cover page function
  addCoverPage(doc, allHelicopterIds, allGroupIds, totalClients);

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
        doc.setTextColor(client.medical_fields ? 255 : 0, 0, 0);
        doc.text(client.medical_fields ? "YES" : "NO", x, y);
        x += 30;
        doc.setTextColor(client.dietary_fields ? 255 : 0, 0, 0);
        doc.text(client.dietary_fields ? "YES" : "NO", x, y);
        doc.setTextColor(0);
        x += 30;
        doc.text(client.ridertype || 'N/A', x, y);
        y += 10;
      });

      doc.text(`Total Weight: ${totalWeight}lb`, 10, y + 5);
      y += 20;
    });
  });

  const today = new Date();
  const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  doc.save(`guide-report-${dateString}.pdf`);
}
