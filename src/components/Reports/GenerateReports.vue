<template>
  <div class="reports-page">
    <h1 class="reports-title">Reports</h1>
    <div class="report-generation-box">
      <!-- Date Selector -->
      <div class="form-group">
        <label for="reportDate">Report Date</label>
        <input type="date" id="reportDate" class="form-control" v-model="selectedDate">
      </div>
      <!-- Report Type Selector -->
      <div class="form-group">
        <label for="reportType">Report Type</label>
        <select id="reportType" class="form-control" v-model="selectedReportTypes" multiple>
          <option v-for="type in reportTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <!-- Select/Deselect All Checkbox -->
      <div class="form-group">
        <input type="checkbox" id="selectAll" v-model="selectAll" @change="toggleSelectAll">
        <label for="selectAll">Select/Deselect All</label>
      </div>
      <!-- Generate Report Button -->
      <div class="form-group">
        <button class="btn-generate-report" @click="generateReports">Generate/Download Reports</button>
      </div>
    </div>
  </div>
</template>


<script>
import ReportsDataService from '@/services/ReportsDataService.js';
//individual reports
import {
  generateDailyTripsReport,
  generateMedicalReport,
  generateLunchReport,
  generateShuttleReport
} from './reportScripts';

export default {
  data() {
    return {
      selectedReportTypes: [],
      selectAll: false,
      selectedDate: new Date().toISOString().substr(0, 10),
      reportTypes: [
        'Trips Overview',
        'Medical Report',
        'Lunch Report',
        'Shuttle Report' 
      ],
    };
  },
  methods: {
    generateReports() {
      this.selectedReportTypes.forEach(reportType => {
        switch (reportType) {
          case 'Trips Overview':
            this.generateDateTripsOverview();
            break;
          case 'Medical Report':
            this.generateDateMedicalReport();
            break;
          case 'Lunch Report':
            this.generateDateLunchReport();
            break;
          case 'Shuttle Report':
            this.generateDateShuttleReport(); 
            break;
        }
      });
    },
    toggleSelectAll() {
      this.allSelected = !this.allSelected;
    },

    generateDateTripsOverview() {
      ReportsDataService.getDailyTripsReportData(this.selectedDate)
        .then(response => {
          const tripsData = response.data;
          generateDailyTripsReport(tripsData); // Pass the fetched data to the report generation function
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },
    
    generateDateLunchReport() {
      ReportsDataService.getLunchReportData(this.selectedDate)
        .then(response => {
          const lunchData = response.data;
          generateLunchReport(lunchData); // Pass the fetched data to the report generation function
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },

    generateDateMedicalReport() {
      ReportsDataService.getMedicalReportData(this.selectedDate)
        .then(response => {
          const medicalData = response.data;
          generateMedicalReport(medicalData); // Pass the fetched data to the report generation function
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },

    generateDateShuttleReport() {
      ReportsDataService.getDailyShuttleReportData(this.selectedDate)
        .then(response => {
          const shuttleData = response.data;
          generateShuttleReport(shuttleData); // Pass the fetched data to the report generation function
        })
        .catch(error => {
          console.error("Error fetching shuttle data for report:", error);
        });
    },

    testReport() {
      console.log("Testing Report");
      ReportsDataService.getLunchReportData(this.selectedDate)
        .then(response => {
          console.log('Test Report Data:', response.data); // Log the response data to the console
        })
        .catch(error => {
          console.error("Error during test fetch for report:", error);
        });
    },
  },
  mounted() {
    // Auto-select all reports when component mounts
    this.selectAll = true;
    this.toggleSelectAll();
  },
  computed: {
    // Computed property to handle the select all functionality dynamically
    allSelected: {
      get() {
        return this.reportTypes.length && this.selectedReportTypes.length === this.reportTypes.length;
      },
      set(value) {
        this.selectedReportTypes = value ? this.reportTypes.slice() : [];
      }
    }
  },
  watch: {
    // Watcher to automatically update the selectAll based on selections
    selectedReportTypes(newValues) {
      this.selectAll = newValues.length === this.reportTypes.length;
    }
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
  