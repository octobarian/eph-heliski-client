import { jsPDF } from "jspdf";

//This is renamed to Guide Report on the front-end

export default function generateGuideReport(data) {
  const doc = new jsPDF('landscape');
  console.log(data);

  let latestReportDate = null;
  data.forEach(helicopter => {
    if (helicopter.reportDate) {
      const currentDate = new Date(helicopter.reportDate);
      if (!latestReportDate || currentDate > latestReportDate) {
        latestReportDate = currentDate;
      }
    }
  });

  // Format the latest report date
  const formattedDate = latestReportDate ? latestReportDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  // Adding a cover page
  const addCoverPage = (doc, helicopterIds, groupIds, totalClients) => {
    doc.setFontSize(20);
    doc.text("Guide Report", 10, 20);
    doc.setFontSize(16);

    

    doc.text(`Report Date: ${formattedDate}`, 10, 30);

  
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
      { header: 'Last Name', width: 30 },
      { header: 'First Name', width: 30 },
      { header: 'Group Code', width: 30 },
      { header: 'Training', width: 30 },
      { header: 'New Guest', width: 30 },
      { header: 'Country', width: 40 },
      { header: 'Ability', width: 20 },
      { header: 'Ski/Snowboard', width: 30 },
      { header: 'DOB', width: 20 },
      { header: 'Room', width: 20 }
    ];

    let x = 10;
    headers.forEach(head => {
      doc.setDrawColor(0);
      doc.setFillColor(211, 211, 211);
      doc.rect(x, y, head.width, 7, 'FD');
      doc.text(head.header, x + 5, y + 5);
      x += head.width;
    });

    return y + 6;
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

  // Pass this data to the cover page function
  addCoverPage(doc, allHelicopterIds, allGroupIds, totalClients);

  data.forEach((helicopter, index) => {
    if (index > 0) doc.addPage('landscape');
    doc.setFontSize(12);
    doc.text(`Heli #${helicopter.heliIndex}`, 10, 10);
    doc.text(`Pilot: ${helicopter.pilot}`, 10, 15);
    let y = 30;

    helicopter.groups.forEach(group => {
      let totalWeight = 0;
      doc.setFontSize(11);
      doc.text(`Group #${group.groupIndex}`, 10, y - 5);
      y = drawHeaders(doc, y);
      y += 5;

      group.clients.forEach(client => {
        let x = 10;
        doc.setFontSize(10);
        doc.text(client.lastName, x+3, y);
        x += 30;
        doc.text(client.firstName, x+3, y);
        x += 30;
        //Group Code Implementation in future
        doc.setTextColor(156, 156, 156);
        doc.text("Awaiting Zaui", x+3, y);
        doc.setTextColor(0, 0, 0);
        totalWeight += parseInt(client.weight);
        x += 30;
        doc.text(client.training, x+3, y);
        x += 30;
        //doc.setTextColor(client.medical_fields ? 255 : 0, 0, 0);
        doc.text(client.returning_guest, x+3, y);
        x += 30;
        //doc.setTextColor(client.dietary_fields ? 255 : 0, 0, 0);
        doc.text(client.country, x+4, y);
        x += 40;
        doc.text(client.rider_ability, x+3, y);
        x += 20;
        doc.text(client.ridertype || 'N/A', x+4, y);
        x += 30;
        doc.text(client.dateOfBirth, x+3, y);
        x += 20;
        //Room Implementation in future
        doc.setTextColor(156, 156, 156);
        doc.text("Awaiting Zaui", x+1, y);
        doc.setTextColor(0, 0, 0);
        y += 5;
      });

      doc.text(`Total Weight: ${totalWeight}lb`, 10, y + 2);
      y += 15;
    });
  });

  const today = new Date();
  const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  doc.save(`guide-report-${dateString}.pdf`);
}
