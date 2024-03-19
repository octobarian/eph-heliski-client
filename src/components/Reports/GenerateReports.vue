<template>
  <div class="reports-page">
    <h1 class="reports-title">Reports</h1>

    <div class="report-generation-box">
      <div class="form-group">
        <label for="reportType">Report Type</label>
        <select id="reportType" class="form-control" v-model="selectedReportType">
          <option disabled value="">Select a report</option>
          <option v-for="type in reportTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="btn-generate-report">.</label>
        <button class="btn-generate-report" @click="generateReport">Generate/Download Report</button>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import TripDataService from "@/services/TripDataService"; // Adjust the path as needed

export default {
  data() {
    return {
      selectedReportType: '',
      reportTypes: [
        'Today\'s Trips Overview',
        // Add other report types here
      ],
    };
  },
  methods: {
    generateReport() {
      if (this.selectedReportType === "Today's Trips Overview") {
        this.generateTodaysTripsOverview();
      }
      // Add cases for other reports
    },

    generateTodaysTripsOverview() {
      const date = new Date().toISOString().slice(0, 10); // Format today's date as YYYY-MM-DD
      TripDataService.fetchTripsByDate(date) // Adjust this method name as per your service
        .then(response => {
          const tripsData = response.data;
          this.createPDFReport(tripsData); // Call function to generate and download the report
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },

    createPDFReport(tripsData) {
      const doc = new jsPDF();
      let startY = 20; // Vertical position to start drawing from
      const pageWidth = doc.internal.pageSize.getWidth();
      const boxWidth = pageWidth / 2 - 15; // Calculate box width to fit 2 per page

      doc.setFontSize(16);
      doc.text(`Trips Overview for ${new Date().toLocaleDateString()}`, 10, 10);

      tripsData.forEach((trip, index) => {
        let x = 10 + (index % 2) * (boxWidth + 10); // Position X; alternate position for every trip
        let y = startY + Math.floor(index / 2) * 60; // Position Y; new row every 2 trips
        let groupStartY = y + 10; // Start Y position for groups

        // Draw Trip box
        doc.setDrawColor(0);
        doc.rect(x, y, boxWidth, 50); // Adjust the height as needed

        // Trip ID in primary color
        doc.setTextColor("#007bff"); // Primary color
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Trip ID: ${trip.tripId}`, x + 3, y + 5);
        doc.setTextColor(0, 0, 0); // Reset text color
        doc.setFont("helvetica", "normal");

        // Helicopter and Pilot info
        doc.setFontSize(10);
        doc.text(`Helicopter: ${trip.helicopter ? trip.helicopter.callsign : 'N/A'}`, x + 3, y + 10);
        doc.text(`Pilot: ${trip.pilot ? trip.pilot.firstname + ' ' + trip.pilot.lastname : 'N/A'}`, x + 3, y + 15);

        trip.groups.forEach(group => {
          // Draw Group box within Trip box
          doc.setDrawColor(0);
          doc.rect(x + 2, groupStartY, boxWidth - 4, 15); // Adjust the height based on content

          // Group ID and Guide
          doc.setFontSize(10);
          doc.text(`Group ID: ${group.groupid}, Guide: ${group.guide ? group.guide.firstname + ' ' + group.guide.lastname : 'N/A'}`, x + 5, groupStartY + 5);

          // Clients within Group
          let clientStartY = groupStartY + 7;
          group.clients.forEach(client => {
            // Client Name in bold
            doc.setFont("helvetica", "bold");
            const clientInfo = client.person ? `${client.person.firstname} ${client.person.lastname}, Weight: ${client.person.weight}` : 'Client info unavailable';
            doc.text(clientInfo, x + 5, clientStartY);
            clientStartY += 5; // Increment Y position for next client
          });

          doc.setFont("helvetica", "normal"); // Reset font style
          groupStartY += 20; // Increment Y position for next group
        });

        // Check for page end and add a new page if needed
        if (y > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          startY = 20; // Reset Y position for new page
        }
      });

      // Trigger download of the PDF
      doc.save('todays-trips-overview.pdf');
    },
  },
};
</script>
  
  
  <style scoped>
  .reports-page {
    margin: 20px;
  }
  
  .reports-title {
    text-align: center;
    margin-bottom: 20px; /* Ensure there's space between the title and the box */
  }
  
  .report-generation-box {
    display: flex;
    justify-content: flex-end; /* Align to the right side */
    align-items: center; /* Align items vertically */
    padding: 20px;
    background-color: #f8f9fa; /* Light grey background */
    border-radius: 5px; /* Rounded corners */
  }
  
.form-group {
  display: flex;
  flex-direction: column; /* Stack the children vertically */
  align-items: flex-start; /* Align items to the start of the flex container */
  margin-right: 10px; /* Space between the dropdown and button */
}
  
  #reportType {
    width: 300px; /* Width for dropdown */
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    margin-bottom: 0; /* Remove any default margin-bottom */
  }
  
  .btn-generate-report {
    padding: 0.375rem 1rem; /* Adjust padding */
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    color: #fff;
    background-color: var(--primary-text-eph-color); /* Use primary color */
    border: none;
    cursor: pointer;
  }
  
  .previous-reports {
    margin-top: 20px; /* Space between sections */
    background-color: #fff; /* Change if needed */
  }
  
  .table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
  }
  
  .table th,
  .table td {
    padding: 0.75rem;
    border-top: 1px solid #eceeef;
  }
  
  .table thead th {
    border-bottom: 2px solid #eceeef;
  }
  
  .table tbody + tbody {
    border-top: 2px solid #eceeef;
  }
  
  .btn-download {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
    cursor: pointer;
  }
  </style>
  