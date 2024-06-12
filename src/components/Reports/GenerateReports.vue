<template>
  <div class="reports-page">
    <h1 class="reports-title">Reports</h1>
    <div class="report-generation-box">
      <!-- Date Selector -->
      <div class="form-group">
        <label for="reportDate">Report Date</label>
        <input type="date" id="reportDate" class="form-control" v-model="selectedDate" @change="handleDateChange">
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
  generateShuttleReport,
  generateGroupListReport,
  generateRentalReport // Import the rental report function
} from './reportScripts';

export default {
  data() {
    return {
      selectedReportTypes: [],
      selectAll: false,
      selectedDate: this.getStoredDate() || new Date().toISOString().substr(0, 10),
      reportTypes: [
        'Trips Overview',
        'Medical Report',
        'Lunch Report',
        'Shuttle Report',
        'Group List Report',
        'Rental Report' // Add new report type
      ],
    };
  },
  methods: {
    getStoredDate() {
      return sessionStorage.getItem('selectedDate');
    },
    storeDate(date) {
      sessionStorage.setItem('selectedDate', date);
    },
    handleDateChange() {
      this.storeDate(this.selectedDate);
      // Any other operations that need to happen when date changes
    },
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
          case 'Group List Report':
            this.generateGroupListReport();
            break;
          case 'Rental Report': // Handle new report type
            this.generateDateRentalReport();
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
          const sortedTripsData = tripsData.sort((a, b) => a.heliIndex - b.heliIndex);
          sortedTripsData.forEach(trip => {
            trip.groups = trip.groups.sort((a, b) => a.groupId - b.groupId);
          });
          generateDailyTripsReport(sortedTripsData);
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },
    generateDateLunchReport() {
      ReportsDataService.getLunchReportData(this.selectedDate)
        .then(response => {
          const lunchData = response.data;
          const sortedLunchData = lunchData.sort((a, b) => a.heliIndex - b.heliIndex);
          sortedLunchData.forEach(trip => {
            trip.groups = trip.groups.sort((a, b) => a.groupId - b.groupId);
          });
          generateLunchReport(sortedLunchData);
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },
    generateDateMedicalReport() {
      ReportsDataService.getMedicalReportData(this.selectedDate)
        .then(response => {
          const medicalData = response.data;
          const sortedMedicalData = medicalData.sort((a, b) => a.heliIndex - b.heliIndex);
          sortedMedicalData.forEach(trip => {
            trip.groups = trip.groups.sort((a, b) => a.groupId - b.groupId);
          });
          generateMedicalReport(sortedMedicalData, this.selectedDate);
        })
        .catch(error => {
          console.error("Error fetching trips for report:", error);
        });
    },
    generateDateShuttleReport() {
      ReportsDataService.getDailyShuttleReportData(this.selectedDate)
        .then(response => {
          const shuttleData = response.data;
          const sortedShuttleData = shuttleData.sort((a, b) => {
            if (a.heliIndex === b.heliIndex) {
              return a.groupIndex - b.groupIndex;
            }
            return a.heliIndex - b.heliIndex;
          });
          generateShuttleReport(sortedShuttleData);
        })
        .catch(error => {
          console.error("Error fetching shuttle data for report:", error);
        });
    },
    generateGroupListReport() {
      ReportsDataService.getGroupListReportData(this.selectedDate)
        .then(response => {
          const groupListData = response.data;
          const sortedGroupListData = groupListData.sort((a, b) => a.heliIndex - b.heliIndex);
          sortedGroupListData.forEach(trip => {
            trip.groups = trip.groups.sort((a, b) => a.groupId - b.groupId);
          });
          generateGroupListReport(sortedGroupListData);
        })
        .catch(error => {
          console.error("Error fetching group list data for report:", error);
        });
    },
    generateDateRentalReport() {
      ReportsDataService.getDailyRentalReportData(this.selectedDate)
        .then(response => {
          const rentalData = response.data;
          const sortedRentalData = rentalData.sort((a, b) => a.heliIndex - b.heliIndex);
          sortedRentalData.forEach(trip => {
            trip.groups = trip.groups.sort((a, b) => a.groupId - b.groupId);
          });
          generateRentalReport(sortedRentalData);
        })
        .catch(error => {
          console.error("Error fetching rental data for report:", error);
        });
    },
    testReport() {
      console.log("Testing Report");
      ReportsDataService.getLunchReportData(this.selectedDate)
        .then(response => {
          console.log('Test Report Data:', response.data);
        })
        .catch(error => {
          console.error("Error during test fetch for report:", error);
        });
    },
  },
  mounted() {
    this.selectAll = true;
    this.toggleSelectAll();
  },
  computed: {
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
  margin-bottom: 20px;
}

.report-generation-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;
}

#reportType {
  width: 300px;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 0;
}

.btn-generate-report {
  padding: 0.375rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #fff;
  background-color: var(--primary-text-eph-color);
  border: none;
  cursor: pointer;
}

.previous-reports {
  margin-top: 20px;
  background-color: #fff;
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
  background-color: #28a745;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
</style>
