<template>
  <div class="shuttles-page">
    <div class="header">
      <h1>Organize Shuttles</h1>
      <div class="date-picker-container">
        <label for="selectedDate">Select Date:</label>
        <input type="date" id="selectedDate" v-model="selectedDate" @change="handleDateChange" class="date-picker" />
      </div>
    </div>
    <div v-if="trips.length === 0" class="no-trips-message">
      <p>No trips found for the selected date.</p>
    </div>
    <div v-else class="trips-container">
      <div v-for="(trip, tripIndex) in sortedTrips" :key="trip.tripId" class="trip-card">
        <h2>Heli #{{ tripIndex + 1 }} ({{ trip.triptype || '' }})</h2>
        <div v-for="(group, groupIndex) in sortedGroups(trip.groups)" :key="group.groupid" class="group-card">
          <h3>Group #{{ groupIndex + 1 }}</h3>
          <div v-for="client in group.clients" :key="client.tripClientId" class="client-row">
            <div class="client-info">
              <span>{{ client.person.firstname }} {{ client.person.lastname }} ({{ trip.triptype || '' }})</span>
            </div>
            <div class="form-group-inline">
              <label for="shuttleNumber">Shuttle Number:</label>
              <select v-model="client.shuttleNumber" @change="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)">
                <option value="">Unassigned</option>
                <option v-for="shuttle in shuttles" :key="shuttle.id" :value="shuttle.id">
                  {{ shuttle.shuttlename }}
                </option>
              </select>
            </div>
            <div class="form-group-inline">
              <label :class="{ disabled: !client.shuttleNumber }" for="pickupTime">Pickup Time:</label>
              <input type="time" v-model="client.flightTime" @change="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" :disabled="!client.shuttleNumber" />
            </div>
            <div class="form-group-inline">
              <label :class="{ disabled: !client.shuttleNumber }" for="pickupLocation">Pickup Location:</label>
              <input type="text" v-model="client.pickupLocation" @change="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" :disabled="!client.shuttleNumber" />
            </div>
            <div class="form-group-inline">
              <label :class="{ disabled: !client.shuttleNumber }" for="arrivalTime">Arrival Time:</label>
              <input type="time" v-model="client.arrivalTime" @change="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" :disabled="!client.shuttleNumber" />
            </div>
            <div class="form-group-inline">
              <label :class="{ disabled: !client.shuttleNumber }" for="dropoffLocation">Dropoff Location:</label>
              <input type="text" v-model="client.dropoffLocation" @change="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" :disabled="!client.shuttleNumber" />
            </div>
            <div class="form-group-inline training-status">
              <label for="trainingStatus">Training Status:</label>
              <input type="checkbox" id="trainingCheckbox" v-model="client.person.isTrained" @change="toggleTraining(client.person)" />
              <div v-if="client.person && hasTrainingType1(client.person.trainings)">
                <div class="training-date" @dblclick="editTrainingDate(client.person)">{{ getTrainingDate(client.person.trainings) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TripDataService from '@/services/TripDataService';
import ShuttleDataService from '@/services/ShuttleDataService';

export default {
  data() {
    return {
      selectedDate: this.getStoredDate() || new Date().toISOString().split('T')[0],
      trips: [],
      shuttles: [],
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
      this.fetchTripsByDate();
    },
    async fetchTripsByDate() {
      try {
        const response = await TripDataService.fetchTripsByDate(this.selectedDate);
        this.trips = response.data;

        // Sort trips and their groups
        this.trips = this.trips.map(trip => {
          trip.groups = trip.groups.sort((a, b) => a.sortingindex - b.sortingindex || a.groupid - b.groupid);
          return trip;
        }).sort((a, b) => a.sortingindex - b.sortingindex || a.tripId - b.tripId);

        const tripIds = this.trips.map(trip => trip.tripId);
        const clientIds = this.trips.flatMap(trip => trip.groups.flatMap(group => group.clients.map(client => client.tripClientId)));

        const shuttleResponse = await ShuttleDataService.getTripShuttles(tripIds, clientIds);
        const tripShuttles = shuttleResponse.data;

        // Prefill the client data with trip shuttle details
        for (const trip of this.trips) {
          for (const group of trip.groups) {
            for (const client of group.clients) {
              const tripShuttle = tripShuttles.find(ts => ts.trip_id === trip.tripId && ts.tripclientid === client.tripClientId);
              if (tripShuttle) {
                this.$set(client, 'shuttleNumber', tripShuttle.shuttle_id);
                this.$set(client, 'dropoffLocation', tripShuttle.dropoff_location);
                this.$set(client, 'arrivalTime', tripShuttle.arrival_time);
                this.$set(client, 'flightTime', tripShuttle.flight_time);
                this.$set(client, 'pickupLocation', tripShuttle.pickup_location);
              }
            }
          }
        }

        // Set isTrained flag based on trainings
        for (const trip of this.trips) {
          for (const group of trip.groups) {
            for (const client of group.clients) {
              client.person.isTrained = this.hasTrainingType1(client.person.trainings);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
        this.trips = [];
      }
    },
    fetchShuttles() {
      ShuttleDataService.getAllShuttles()
        .then(response => {
          this.shuttles = response.data;
        })
        .catch(error => {
          console.error("Error fetching shuttles:", error);
        });
    },
    updateClientShuttle(tripId, groupId, clientId) {
      const trip = this.trips.find(t => t.tripId === tripId);
      if (!trip) return;

      const group = trip.groups.find(g => g.groupid === groupId);
      if (!group) return;

      const client = group.clients.find(c => c.tripClientId === clientId);
      if (!client) return;

      const updateData = {
        shuttleNumber: client.shuttleNumber,
        dropoffLocation: client.dropoffLocation,
        arrivalTime: client.arrivalTime,
        flightTime: client.flightTime,
        pickupLocation: client.pickupLocation,
        tripclientid: client.tripClientId
      };

      if (client.shuttleNumber === '') {
        updateData.shuttleNumber = null; // Unassign shuttle if the value is blank
      }

      ShuttleDataService.updateGroupShuttle(tripId, groupId, clientId, updateData)
        .then(() => {
          if (updateData.shuttleNumber === null) {
            // If the shuttle was unassigned, clear the fields
            client.dropoffLocation = '';
            client.arrivalTime = '';
            client.flightTime = '';
            client.pickupLocation = '';
          }
          console.log("Client shuttle details updated successfully.");
        })
        .catch(error => {
          console.error("Error updating client shuttle details:", error);
        });
    },
    hasTrainingType1(trainings) {
      return trainings.some(training => training.trainingtypeid === 1);
    },
    getTrainingDate(trainings) {
      const training = trainings.find(training => training.trainingtypeid === 1);
      return training ? training.trainingdate : null;
    },
    async updateTraining(person, trainingdate) {
      try {
        const response = await TripDataService.updateTraining({
          personid: person.id,
          trainingtypeid: 1,
          trainingdate: trainingdate
        });

        if (response.status === 200 || response.status === 201) {
          console.log("Training date updated successfully:", response.data);
          const training = person.trainings.find(training => training.trainingtypeid === 1);
          if (training) {
            if (trainingdate === null) {
              // Remove training if trainingdate is null
              const index = person.trainings.indexOf(training);
              person.trainings.splice(index, 1);
            } else {
              // Update training date
              training.trainingdate = this.selectedDate;
            }
          } else if (trainingdate !== null) {
            // Add new training if not present
            person.trainings.push({
              trainingtypeid: 1,
              trainingname: 'Avalanche Safety and Helicopter safety training',
              trainingdate: this.selectedDate
            });
          }
        }
      } catch (error) {
        console.error("Error updating training date:", error);
      }
    },
    toggleTraining(person) {
      const trainingdate = person.isTrained ? this.selectedDate : null;
      this.updateTraining(person, trainingdate);
    },
    sortedGroups(groups) {
      return groups.slice().sort((a, b) => a.sortingindex - b.sortingindex || a.groupid - b.groupid);
    },
  },
  computed: {
    sortedTrips() {
      return this.trips.slice().sort((a, b) => a.sortingindex - b.sortingindex || a.tripId - b.tripId);
    }
  },
  created() {
    this.fetchTripsByDate();
    this.fetchShuttles();
  }
};
</script>

<style scoped>
.shuttles-page {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.date-picker-container {
  display: flex;
  align-items: center;
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

.group-card {
  margin-top: 20px;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.client-row {
  display: grid;
  grid-template-columns: 200px repeat(6, 1fr);
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.client-info {
  grid-column: span 1;
}

.form-group-inline {
  display: flex;
  flex-direction: column;
}

.form-group-inline label {
  font-weight: bold;
}

.form-group-inline label.disabled {
  color: lightgrey;
}

.form-group-inline select,
.form-group-inline input {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
}

.training-date {
  background-color: lightgreen;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.training-status {
  display: flex;
  align-items: center;
}
</style>
