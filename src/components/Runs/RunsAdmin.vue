<template>
  <div class="runs-admin-page">
    <h1>Runs Administration</h1>

    <!-- Interface for assigning runs to trip groups -->
    <div class="assign-runs-interface">
      <h2>Assign Runs to Trip Groups</h2>
      <div class="date-picker-container">
        <label for="selectedDate">Select Date:</label>
        <input type="date" id="selectedDate" v-model="selectedDate" @change="handleDateChange" class="date-picker" />
      </div>
      <div v-if="trips.length === 0" class="no-trips-message">
        <p>No trips found for the selected date.</p>
      </div>
      <div v-else class="trips-container">
        <div v-for="(trip, tripIndex) in sortedTrips" :key="trip.tripId" class="trip-card">
          <h2>Heli #{{ tripIndex + 1 }} ({{ trip.triptype || '' }})</h2>
          <div class="groups-container">
            <div v-for="(group, groupIndex) in sortedGroups(trip.groups)" :key="group.groupid" class="group-card">
              <h3>Group #{{ groupIndex + 1 }}</h3>
              <div class="form-group-inline">
                <label for="run">Assign Run:</label>
                <select v-model="group.selectedRun" @change="assignRunToGroup(trip.tripId, group.groupid, group)">
                  <option disabled value="">Select Run</option>
                  <option v-for="run in runs" :key="run.runid" :value="run.runid">
                    {{ run.runzone }} - {{ run.runname }}
                  </option>
                </select>
              </div>
              <div class="assigned-runs">
                <h4>Assigned Runs:</h4>
                <table class="assigned-runs-table">
                  <thead>
                    <tr>
                      <th>Run Name</th>
                      <th>Run Zone</th>
                      <th>Total Elevation</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(tripRun, index) in getGroupRuns(trip.tripId, group.groupid)" :key="index">
                      <td>{{ getRunName(tripRun.runid) }}</td>
                      <td>{{ getRunZone(tripRun.runid) }}</td>
                      <td>{{ getTotalElevation(tripRun.runid) }}</td>
                      <td><button class="delete-button" @click="deleteRunFromGroup(tripRun.triprunid)">Delete</button></td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-vertical">
                  Total Vertical: {{ getTotalVertical(trip.tripId, group.groupid) }}
                </div>
                <!-- Notes Section -->
                <div class="notes-container">
                  <textarea v-model="group.noteContent" placeholder="Enter note here..."></textarea>
                  <button class="save-note" @click="saveNoteForGroup(trip.tripId, group.groupid, group)">Save Note</button>
                  <transition name="fade">
                    <span v-if="group.noteSaved" class="saved-message">Saved!</span>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Zones Administration -->
    <div class="collapsible-section">
      <div class="header" @click="toggleZonesCollapse">
        <h2>Zones Administration</h2>
        <span>{{ isZonesCollapsed ? '▼' : '▲' }}</span>
      </div>
      <div v-if="!isZonesCollapsed" class="content">
        <div class="add-zone-form">
          <div class="form-group">
            <label for="zoneName">Zone Name:</label>
            <input id="zoneName" v-model="newZoneName" placeholder="Zone Name" />
          </div>
          <div class="form-group">
            <label for="zoneDescription">Description (Optional):</label>
            <input id="zoneDescription" v-model="newZoneDescription" placeholder="Description (Optional)" />
          </div>
          <button @click="addZone">Add Zone</button>
        </div>
        <table class="zones-table">
          <thead>
            <tr>
              <th>Zone Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="zone in sortedZones" :key="zone.id">
              <td>{{ zone.zonename }}</td>
              <td>{{ zone.description }}</td>
              <td>
                <div v-if="zoneToDelete === zone.id">
                  <div class="delete-confirmation">
                    <p>
                      Are you sure you want to delete {{ zone.zonename }}? Doing so will cascade delete all associated runs and trip runs. If you are sure, type the zone name "{{ zone.zonename }}" and press delete.
                    </p>
                    <input type="text" v-model="deleteZoneName" placeholder="Type zone name here" />
                    <button class="confirm-button" @click="confirmDeleteZone(zone.id, zone.zonename)">Delete</button>
                    <button class="cancel-button" @click="cancelDelete">Cancel</button>
                  </div>
                </div>
                <div v-else>
                  <button class="delete-button" @click="showDeleteZoneConfirmation(zone.id)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Runs Administration -->
    <div class="collapsible-section">
      <div class="header" @click="toggleRunsCollapse">
        <h2>Runs Administration</h2>
        <span>{{ isRunsCollapsed ? '▼' : '▲' }}</span>
      </div>
      <div v-if="!isRunsCollapsed" class="content">
        <div class="add-run-form">
          <div class="form-group">
            <label for="runName">Run Name:</label>
            <input id="runName" v-model="newRunName" placeholder="Run Name" />
          </div>
          <div class="form-group">
            <label for="runZone">Zone:</label>
            <select id="runZone" v-model="newRunZone">
              <option disabled value="">Select Zone</option>
              <option v-for="zone in zones" :key="zone.id" :value="zone.id">
                {{ zone.zonename }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="startElevation">Start Elevation:</label>
            <input id="startElevation" v-model="newStartElevation" placeholder="Start Elevation" type="number" />
          </div>
          <div class="form-group">
            <label for="endElevation">End Elevation:</label>
            <input id="endElevation" v-model="newEndElevation" placeholder="End Elevation" type="number" />
          </div>
          <button @click="addRun">Add Run</button>
        </div>
        <table class="runs-table">
          <thead>
            <tr>
              <th>Run Name</th>
              <th>Zone Name</th>
              <th>Start Elevation</th>
              <th>End Elevation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="run in sortedRuns" :key="run.runid">
              <td>{{ run.runname }}</td>
              <td>{{ run.zone?.zonename }}</td>
              <td>{{ run.startelevation }}</td>
              <td>{{ run.endelevation }}</td>
              <td>
                <div v-if="runToDelete === run.runid">
                  <div class="delete-confirmation">
                    <p>
                      Are you sure you want to delete {{ run.runname }}? Doing so will cascade delete all associated trip runs. If you are sure, type the run name "{{ run.runname }}" and press delete.
                    </p>
                    <input type="text" v-model="deleteRunName" placeholder="Type run name here" />
                    <button class="confirm-button" @click="confirmDeleteRun(run.runid, run.runname)">Delete</button>
                    <button class="cancel-button" @click="cancelDelete">Cancel</button>
                  </div>
                </div>
                <div v-else>
                  <button class="delete-button" @click="showDeleteRunConfirmation(run.runid)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import RunsZonesDataService from "@/services/RunsZonesDataService.js";
import TripDataService from '@/services/TripDataService.js';
import NotesDataService from '@/services/NotesDataService.js';

export default {
  name: "RunsAdmin",
  data() {
    return {
      isZonesCollapsed: true,
      isRunsCollapsed: true,
      zones: [],
      runs: [],
      trips: [],
      tripRuns: [],
      selectedDate: this.getStoredDate() || new Date().toISOString().split('T')[0],
      newZoneName: "",
      newZoneDescription: "",
      newRunName: "",
      newRunZone: "",
      newStartElevation: "",
      newEndElevation: "",
      zoneToDelete: null,
      runToDelete: null,
      deleteZoneName: "",
      deleteRunName: ""
    };
  },
  computed: {
    sortedZones() {
      return this.zones.slice().sort((a, b) => a.zonename.localeCompare(b.zonename));
    },
    sortedRuns() {
      return this.runs.slice().sort((a, b) => a.runname.localeCompare(b.runname));
    },
    sortedTrips() {
      return this.trips.slice().sort((a, b) => a.tripId - b.tripId);
    }
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
      this.fetchTripsByDate();
    },
    toggleZonesCollapse() {
      this.isZonesCollapsed = !this.isZonesCollapsed;
    },
    toggleRunsCollapse() {
      this.isRunsCollapsed = !this.isRunsCollapsed;
    },
    fetchZones() {
      RunsZonesDataService.getAllZones()
        .then(response => {
          this.zones = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    fetchRuns() {
      RunsZonesDataService.getAllRuns()
        .then(response => {
          this.runs = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    fetchTripsByDate() {
      TripDataService.fetchTripsByDate(this.selectedDate)
        .then(response => {
          this.trips = response.data;
          this.fetchTripRuns(this.trips.map(trip => trip.tripId));
          this.trips.forEach(trip => {
            trip.groups.forEach(group => {
              this.$set(group, 'noteSaved', false); // Ensure noteSaved is reactive
              this.fetchNoteForGroup(trip.tripId, group.groupid, group);
            });
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    fetchTripRuns(tripIds) {
      RunsZonesDataService.getTripRuns(tripIds)
        .then(response => {
          this.tripRuns = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    addZone() {
      if (!this.newZoneName) {
        alert("Zone name cannot be empty!");
        return;
      }
      const newZone = {
        zonename: this.newZoneName,
        description: this.newZoneDescription
      };
      RunsZonesDataService.createZone(newZone)
        .then(() => {
          this.fetchZones();
          this.newZoneName = "";
          this.newZoneDescription = "";
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteZone(zoneId) {
      RunsZonesDataService.deleteZone(zoneId)
        .then(() => {
          this.fetchZones();
        })
        .catch(e => {
          console.log(e);
        });
    },
    addRun() {
      if (!this.newRunName || !this.newRunZone) {
        alert("Run name and zone cannot be empty!");
        return;
      }
      const newRun = {
        runname: this.newRunName,
        zoneid: this.newRunZone,
        runzone: this.zones.find(zone => zone.id === this.newRunZone)?.zonename,
        startelevation: this.newStartElevation,
        endelevation: this.newEndElevation,
        isplaceholder: false // Default value for now
      };
      RunsZonesDataService.createRun(newRun)
        .then(() => {
          this.fetchRuns();
          this.newRunName = "";
          this.newRunZone = "";
          this.newStartElevation = "";
          this.newEndElevation = "";
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteRun(runId) {
      RunsZonesDataService.deleteRun(runId)
        .then(() => {
          this.fetchRuns();
        })
        .catch(e => {
          console.log("Error deleting run:", e.response.data);
          alert(`Error deleting run: ${e.response.data.message}`);
        });
    },
    assignRunToGroup(tripId, groupId, group) {
      const newTripRun = {
        tripid: tripId,
        runid: group.selectedRun,
        trip_group_id: groupId // Include trip_group_id in the data sent to the backend
      };
      RunsZonesDataService.createTripRun(newTripRun)
        .then(response => {
          console.log("Trip run assigned successfully:", response.data);
          group.selectedRun = ""; // Clear the dropdown after assigning
          this.fetchTripRuns(this.trips.map(trip => trip.tripId));
        })
        .catch(e => {
          console.log("Error assigning trip run:", e);
        });
    },
    deleteRunFromGroup(tripRunId) {
      RunsZonesDataService.deleteTripRun(tripRunId)
        .then(() => {
          this.fetchTripRuns(this.trips.map(trip => trip.tripId));
        })
        .catch(e => {
          console.log("Error deleting trip run:", e);
        });
    },
    getGroupRuns(tripId, groupId) {
      return this.tripRuns.filter(tr => tr.tripid === tripId && tr.trip_group_id === groupId);
    },
    getRunName(runId) {
      const run = this.runs.find(r => r.runid === runId);
      return run ? run.runname : "Unknown Run";
    },
    getRunZone(runId) {
      const run = this.runs.find(r => r.runid === runId);
      return run ? run.runzone : "Unknown Zone";
    },
    getTotalElevation(runId) {
      const run = this.runs.find(r => r.runid === runId);
      return run ? (run.startelevation - run.endelevation) : 0;
    },
    getTotalVertical(tripId, groupId) {
      const groupRuns = this.getGroupRuns(tripId, groupId);
      return groupRuns.reduce((total, tripRun) => {
        const run = this.runs.find(r => r.runid === tripRun.runid);
        return total + (run ? (run.startelevation - run.endelevation) : 0);
      }, 0);
    },
    sortedGroups(groups) {
      return groups.slice().sort((a, b) => a.groupid - b.groupid);
    },
    showDeleteZoneConfirmation(zoneId) {
      this.zoneToDelete = zoneId;
      this.deleteZoneName = "";
    },
    showDeleteRunConfirmation(runId) {
      this.runToDelete = runId;
      this.deleteRunName = "";
    },
    confirmDeleteZone(zoneId, zoneName) {
      if (this.deleteZoneName === zoneName) {
        this.deleteZone(zoneId);
        this.zoneToDelete = null;
      } else {
        alert("Zone name does not match. Please type the correct zone name.");
      }
    },
    confirmDeleteRun(runId, runName) {
      if (this.deleteRunName === runName) {
        this.deleteRun(runId);
        this.runToDelete = null;
      } else {
        alert("Run name does not match. Please type the correct run name.");
      }
    },
    cancelDelete() {
      this.zoneToDelete = null;
      this.runToDelete = null;
    },
    fetchNoteForGroup(tripId, groupId, group) {
      NotesDataService.getGroupNote(groupId)
        .then(response => {
          if (response.data && response.data.text !== null) {
            group.noteContent = response.data.text;
            group.noteId = response.data.noteid;
          } else {
            group.noteContent = '';
            group.noteId = null;
          }
        })
        .catch(error => {
          console.error('Error fetching note:', error);
          if (error.response && error.response.status === 404) {
            group.noteContent = '';
            group.noteId = null;
          }
        });
    },
    saveNoteForGroup(tripId, groupId, group) {
      const noteData = {
        text: group.noteContent,
        personid: 1,
        type: 'tripGroupNote',
        itemid: groupId
      };

      if (group.noteId) {
        NotesDataService.update(group.noteId, noteData)
          .then(() => {
            console.log("Note updated successfully");
            this.updateGroupNotes(tripId, groupId);
            this.animateSavedMessage(group);
          })
          .catch(error => {
            console.error("Error updating note:", error);
          });
      } else {
        NotesDataService.create(noteData)
          .then(response => {
            group.noteId = response.data.noteid;
            console.log("Note created successfully");
            this.updateGroupNotes(tripId, groupId);
            this.animateSavedMessage(group);
          })
          .catch(error => {
            console.error("Error creating note:", error);
          });
      }
    },
    animateSavedMessage(group) {
      group.noteSaved = true;
      setTimeout(() => {
        this.$set(group, 'noteSaved', false); // Use Vue's $set to ensure reactivity
      }, 3000); // Show the message for 3 seconds
    },
    updateGroupNotes(tripId, groupId) {
      console.log(groupId)
      this.fetchTripRuns([tripId]);
    },
    fetchLoggedInPersonId() {
      // Implement this method to fetch the logged-in person ID and set it to this.loggedInPersonId
      // Example: this.loggedInPersonId = fetchedPersonId;
    }
  },
  mounted() {
    this.fetchZones();
    this.fetchRuns();
    this.fetchTripsByDate();
    this.fetchLoggedInPersonId();
  }
};
</script>

<style scoped>
.runs-admin-page {
  padding: 20px;
}

.assign-runs-interface {
  margin-bottom: 20px;
}

.date-picker-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.date-picker {
  margin-left: 10px;
}

.no-trips-message {
  text-align: center;
  font-size: 1.2em;
  color: #888;
}

.trips-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.trip-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
}

.groups-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.group-card {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.form-group-inline {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group-inline label {
  font-weight: bold;
}

.form-group-inline select,
.form-group-inline input {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}

.assigned-runs {
  margin-top: 10px;
}

.assigned-runs-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

.assigned-runs-table th,
.assigned-runs-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.total-vertical {
  font-weight: bold;
  margin-top: 10px;
}

.notes-container {
  position: relative;
  margin-top: 10px;
}

.notes-container textarea {
  width: 100%;
  height: 100px;
  padding: 8px;
  padding-bottom: 30px; /* Make space for the 'Save Note' button */
  box-sizing: border-box;
}

.notes-container .save-note {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 5px 10px;
}

.saved-message {
  position: absolute;
  bottom: 40px;
  right: 5px;
  color: blue;
  font-weight: bold;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.saved-message-enter-active,
.saved-message-leave-active {
  transition: all 0.5s;
}

.saved-message-enter, 
.saved-message-leave-to {
  opacity: 0;
  bottom: 40px;
  transform: translateY(20px);
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.confirm-button {
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.cancel-button {
  background-color: gray;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.delete-confirmation {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.collapsible-section {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.header {
  background-color: #f5f5f5;
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  padding: 10px;
}

.add-zone-form,
.add-run-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.add-zone-form .form-group,
.add-run-form .form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 150px;
}

.zones-table,
.runs-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.zones-table th,
.runs-table th,
.zones-table td,
.runs-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
