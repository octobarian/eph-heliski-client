import { jsPDF } from "jspdf";

export default function generateGroupListReport(data) {
  const doc = new jsPDF('portrait');

  // Adding a cover page
  const addCoverPage = (doc, helicopterIds, groupIds, totalClients, reportDate, helicoptersData) => {
    doc.setFontSize(20);
    doc.text("Client Group List", 10, 20);
    doc.setFontSize(16);
    doc.text(`Eagle Pass Heli`, 10, 30);
    doc.text(`Date: ${reportDate}`, 10, 40);

    const summaries = [
      /*{
        title: 'Heli Breakdown',
        details: `Helicopters: ${helicopterIds.join(', ')}`
      },
      {
        title: 'Groups',
        details: `Group IDs: ${groupIds.join(', ')}`
      },*/
      {
        title: 'Total Clients',
        details: `Total Clients: ${totalClients}`
      }
    ];
    console.log(helicoptersData);
    console.log(groupIds);
    // Drawing the headers for main page table 
    let y = 60;

//build table here
const drawMainHeaders = (doc, y) => {
  doc.setFontSize(12);
  doc.setFont('helvetica','bold');
  const Mainheaders = [
    { mainheader: 'Heli', width: 50 },
    { mainheader: 'Group', width: 50 }
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
helicoptersData.forEach(heliObj => {
  heliObj.groups.forEach(groupObj => {
    let x =15;
    let rectWidth = 50; // Width of each column
    let rectHeight = 10; // Height of each row
     // Draw rectangle for 'Heli' column
     doc.setDrawColor(0);
     doc.setFillColor(255, 255, 255); // White fill for 'Heli' column
     doc.rect(x-5, y-5, rectWidth, rectHeight, 'FD');
    doc.text(`Heli #${heliObj.heliIndex}`, x, y);
    x+=rectWidth; // Width of each column
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255); // White fill for 'Group' column
    doc.rect(x-5, y-5, rectWidth, rectHeight, 'FD');
    doc.text(`Group #${groupObj.groupIndex}`, x, y);
    y += rectHeight ;
  });
});
y+=10;



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

  let helicoptersData = [];

  data.forEach(helicopter => {
      let heliObj = {
          heliIndex: helicopter.heliIndex,
          groups: []
      };
      helicopter.groups.forEach(group => {
          let groupObj = {
              groupIndex: group.groupIndex
          };
          heliObj.groups.push(groupObj);
      });
  
      helicoptersData.push(heliObj);
  });
   

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
  addCoverPage(doc, allHelicopterIds, allGroupIds, totalClients, reportDate, helicoptersData);

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
      let rectWidth = 50; // Width of each 50 column
      let rectWidth30 = 30; // Width of each 50 column
      let rectHeight = 10; // Height of each row

//try guide here

      if (group.guideFirstName && group.guideLastName) {
        let x = 15;
        doc.setFontSize(10);
        doc.setTextColor(89,103,135); // text color to blue
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Guide Last Name' column
        doc.rect(x-5, y-5, rectWidth, rectHeight, 'FD');
        doc.text(group.guideLastName, x, y);
        x += 50;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Guide First Name' column
        doc.rect(x-5, y-5, rectWidth, rectHeight, 'FD');
        doc.text(group.guideFirstName, x, y);
        x += 50;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Guide Weight' column
        doc.rect(x-5, y-5, rectWidth30, rectHeight, 'FD');
        doc.text(group.guideWeight ? group.guideWeight.toString() : 'N/A', x, y);
        x += 30;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Beacon Number' column
        doc.rect(x-5, y-5, rectWidth30, rectHeight, 'FD');
        doc.text('N/A', x, y); // Placeholder for beacon number
        x += 30;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Allergies' column
        doc.rect(x-5, y-5, rectWidth30, rectHeight, 'FD');
        doc.text('N/A', x, y); // Placeholder for allergies
        doc.setTextColor(0, 0, 0);
        y += 10;
      }

      group.clients.forEach(client => {
        let x = 15;
        doc.setFontSize(10);
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Client Last Name' column
        doc.rect(x-5, y-5, rectWidth, rectHeight, 'FD');
        doc.text(client.lastName, x, y);
        x += 50;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Client First Name' column
        doc.rect(x-5, y-5, rectWidth, rectHeight, 'FD');
        doc.text(client.firstName, x, y);
        x += 50;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Client Weight' column
        doc.rect(x-5, y-5, rectWidth30, rectHeight, 'FD');
        doc.text(client.weight.toString(), x, y);
        x += 30;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Beacon Number' column
        doc.rect(x-5, y-5, rectWidth30, rectHeight, 'FD');
        doc.text(client.beaconNumber || 'N/A', x, y);
        x += 30;
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255); // White fill for 'Allergies' column
        doc.rect(x-5, y-5, rectWidth30, rectHeight, 'FD');
        doc.setTextColor(client.medical_fields ? 255 : 0, 0, 0);
        if(client.hasAllergies  === true) {
            doc.setTextColor(255, 0, 0);
          }
        else{
            doc.setTextColor(0, 0, 0);
          }
       doc.text(client.hasAllergies ? "YES" : "NO", x, y);
        doc.setTextColor(0);
        y += 10;
      });

      doc.text(`Fuel Percentage: ${group.fuelPercentage}%`, 10, y);
      y += 20;
    });
  });

  doc.save(`group-list-report-${reportDate}.pdf`);
}
