<template>
  <div class="reports-page">
    <h1 class="reports-title">Reports</h1>

    <div class="report-generation-box">
      <!-- Date Selector -->
      <div class="form-group">
        <label for="reportDate">Report Date</label>
        <input type="date" id="reportDate" class="form-control" v-model="selectedDate">
      </div>
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
      <div class="form-group">
        <button class="btn-test-report" @click="testReport">Test Report Data Fetch</button>
      </div>
    </div>
  </div>
</template>

<script>
import ReportsDataService from '@/services/ReportsDataService.js';
//individual reports
import generateDailyTripsReport from './reportScripts/dailyTripsReport.js'; // Ensure path correctness
import generateMedicalReport from './reportScripts/medicalReport.js'

export default {
  data() {
    return {
      selectedReportType: '',
      selectedDate: new Date().toISOString().substr(0, 10), // Set default to today's date
      reportTypes: [
        'Trips Overview',
        'Medical Report',
        // Add other report types here
      ],
    };
  },
  methods: {
    generateReport() {
      if (this.selectedReportType === "Trips Overview") {
        this.generateTodaysTripsOverview();
      }
      if (this.selectedReportType === "Medical Report") {
        this.generateMedicalReport();
      }
      // Add cases for other reports
    },

    generateTodaysTripsOverview() {
      ReportsDataService.getDailyTripsReportData(this.selectedDate)
        .then(response => {
          const tripsData = response.data;
          generateDailyTripsReport(tripsData); // Pass the fetched data to the report generation function
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },

    generateMedicalReport() {
      ReportsDataService.getMedicalReportData(this.selectedDate)
        .then(response => {
          const medicalData = response.data;
          generateMedicalReport(medicalData); // Pass the fetched data to the report generation function
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },

    testReport() {
      console.log("Testing Report");
      ReportsDataService.getMedicalReportData(this.selectedDate)
        .then(response => {
          console.log('Test Report Data:', response.data); // Log the response data to the console
        })
        .catch(error => {
          console.error("Error during test fetch for report:", error);
        });
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

  .btn-test-report {
    padding: 0.375rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #28a745; /* Bootstrap success color for test button */
    border: none;
    cursor: pointer;
    margin-top: 10px; /* Add some margin at the top of the button */
  }
  </style>
  