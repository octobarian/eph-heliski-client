<template>
    <div class="shuttles-page">
      <div class="header">
        <h1>Organize Shuttles</h1>
        <div class="date-picker-container">
          <label for="selectedDate">Select Date:</label>
          <input type="date" id="selectedDate" v-model="selectedDate" @change="fetchTripsByDate" class="date-picker" />
        </div>
      </div>
      <div v-if="trips.length === 0" class="no-trips-message">
        <p>No trips found for the selected date.</p>
      </div>
      <div v-else class="trips-container">
        <div v-for="trip in trips" :key="trip.tripId" class="trip-card">
          <h2>Trip ID: {{ trip.tripId }} ({{ trip.triptype || '' }})</h2>
          <div v-for="group in trip.groups" :key="group.groupid" class="group-card">
            <h3>Group ID: {{ group.groupid }}</h3>
            <div v-for="client in group.clients" :key="client.tripClientId" class="client-row">
              <div class="client-info">
                <span>{{ client.person.firstname }} {{ client.person.lastname }} ({{ trip.triptype || '' }})</span>
              </div>
              <div class="form-group-inline">
                <label for="shuttleNumber">Shuttle Number:</label>
                <select v-model="client.shuttleNumber" @change="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)">
                  <option disabled value="">Select Shuttle</option>
                  <option v-for="shuttle in shuttles" :key="shuttle.id" :value="shuttle.id">
                    {{ shuttle.number }}
                  </option>
                </select>
              </div>
              <div class="form-group-inline">
                <label for="dropoffLocation">Dropoff Location:</label>
                <input type="text" v-model="client.dropoffLocation" @blur="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" />
              </div>
              <div class="form-group-inline">
                <label for="arrivalTime">Arrival Time:</label>
                <input type="time" v-model="client.arrivalTime" @blur="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" />
              </div>
              <div class="form-group-inline">
                <label for="flightTime">Flight Time:</label>
                <input type="time" v-model="client.flightTime" @blur="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" />
              </div>
              <div class="form-group-inline">
                <label for="pickupLocation">Pickup Location:</label>
                <input type="text" v-model="client.pickupLocation" @blur="updateClientShuttle(trip.tripId, group.groupid, client.tripClientId)" />
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
        selectedDate: new Date().toISOString().split('T')[0],
        trips: [],
        shuttles: [],
      };
    },
    methods: {
      fetchTripsByDate() {
        TripDataService.fetchTripsByDate(this.selectedDate)
          .then(response => {
            this.trips = response.data.sort((a, b) => a.tripId - b.tripId);
          })
          .catch(error => {
            console.error("Error fetching trips:", error);
            this.trips = [];
          });
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
        };
  
        ShuttleDataService.updateClientShuttle(tripId, groupId, clientId, updateData)
          .then(() => {
            console.log("Client shuttle details updated successfully.");
          })
          .catch(error => {
            console.error("Error updating client shuttle details:", error);
          });
      },
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
    grid-template-columns: 200px repeat(5, 1fr);
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
  
  .form-group-inline select,
  .form-group-inline input {
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
  }
  </style>
  