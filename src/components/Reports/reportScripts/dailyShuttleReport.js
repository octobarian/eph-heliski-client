import { jsPDF } from "jspdf";

export default function generateShuttleReport(data) {
  const doc = new jsPDF('landscape');

  // Adding a cover page
  const addCoverPage = (doc, shuttleNames) => {
    doc.setFontSize(20);
    doc.text("Shuttle Report", 10, 20);
    doc.setFontSize(16);
    doc.text(`Report Date: ${new Date().toISOString().substr(0, 10)}`, 10, 30);

    const summaries = [
      {
        title: 'Shuttle Breakdown',
        details: `Shuttles: ${shuttleNames.join(', ')}`
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
      { header: 'First Name', width: 40 },
      { header: 'Last Name', width: 40 },
      { header: 'Phone', width: 40 },
      { header: 'Email', width: 60 },
      { header: 'Shuttle Name', width: 40 },
      { header: 'Dropoff Location', width: 40 },
      { header: 'Arrival Time', width: 30 },
      { header: 'Flight Time', width: 30 },
      { header: 'Pickup Location', width: 40 }
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

  // Process data
  const shuttleNames = [...new Set(data.map(item => item.shuttleName))];

  // Pass this data to the cover page function
  addCoverPage(doc, shuttleNames);

  shuttleNames.forEach((shuttleName, index) => {
    if (index > 0) doc.addPage('landscape');
    doc.setFontSize(16);
    doc.text(`Shuttle Name: ${shuttleName}`, 10, 20);
    let y = 30;

    const shuttleData = data.filter(item => item.shuttleName === shuttleName);
    y = drawHeaders(doc, y);

    shuttleData.forEach(item => {
      let x = 10;
      doc.setFontSize(10);
      doc.text(String(item.firstname), x, y);
      x += 40;
      doc.text(String(item.lastname), x, y);
      x += 40;
      doc.text(String(item.phone), x, y);
      x += 40;
      doc.text(String(item.email), x, y);
      x += 60;
      doc.text(String(item.shuttleName), x, y);
      x += 40;
      doc.text(String(item.dropoff_location), x, y);
      x += 40;
      doc.text(String(item.arrival_time), x, y);
      x += 30;
      doc.text(String(item.flight_time), x, y);
      x += 30;
      doc.text(String(item.pickup_location), x, y);
      y += 10;
    });
  });

  const today = new Date();
  const dateString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  doc.save(`shuttle-report-${dateString}.pdf`);
}
