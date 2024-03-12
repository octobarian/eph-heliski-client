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
            <button class="btn-generate-report" @click="generateReport"> Generate/Download Report </button>
        </div>
      </div>
  
      <div class="previous-reports">
        <h2>Previous Reports:</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in previousReports" :key="report.id">
              <td>{{ report.name }}</td>
              <td>{{ report.date }}</td>
              <td>
                <button class="btn-download">Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedReportType: '',
        reportTypes: [
          'Lodge Report',
          // Add other report types here
        ],
        previousReports: [
          // Placeholder for previous report data
          { id: 1, name: 'Sample Report', date: '2023-10-13' },
          // Add more reports here
        ],
      };
    },
    methods: {
      generateReport() {
        // Placeholder for generate report method
        console.log('Report generation not yet implemented.');
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
  