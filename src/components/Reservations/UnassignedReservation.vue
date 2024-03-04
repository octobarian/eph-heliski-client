<template>
  <div class="unassigned-reservation card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">
          <router-link :to="`/reservation/${reservation.reservationid}`" class="reservation-link">
            {{ reservation.clientName }}
          </router-link>
          <span class="email-text">- {{ reservation.email }}</span>
        </h5>
        <div class="id-box">ID: {{ reservation.reservationid }}</div>
      </div>
      <div class="card-text">
        <div class="activity-label">
          <label>Activity:</label>
          <div class="activity-box">{{ reservation.activityName }}</div>
        </div>
        <p v-if="reservation.groupcode">Group Code: {{ reservation.groupcode }}</p>
        <p style="">Weight: {{ reservation.weight }} lb</p>

        <!-- Toggle Button/Div for Details -->
      <div class="details-expandable">
        <div class="details-toggle" @click="toggleDetails">
          Reservation Details
          <span class="arrow">{{ showDetails ? '▲' : '▼' }}</span>
        </div>

        <!-- Details Section -->
        <div v-if="showDetails" class="detail-section">
          <div v-for="(detail, index) in reservation.reservationDetails" :key="index">
            <div v-for="(value, key) in detail" :key="key" class="detail-item">
              <span v-if="key !== 'activity'" class="detail-key">{{ formatKey(key) }}:</span>
              <span v-if="key !== 'activity'" class="detail-value">{{ formatValue(value) }}</span>
              <div v-if="key === 'activity'" class="activity-box">{{ value.activityname }}</div>
            </div>
          </div>
        </div>
      </div>

      </div>
      <div class="d-flex align-items-end">
        <select v-model="selectedTrip" class="form-select me-2">
          <option disabled value="">Select Trip</option>
          <option v-for="trip in trips" :key="trip.tripid" :value="trip.tripid">
            Trip ID#{{ trip.tripid }}
          </option>
        </select>
        <button @click="assignToTrip" class="btn assign-button">Assign</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reservation: Object,
    trips: Array
  },
  data() {
    return {
      selectedTrip: '',
      showDetails: false // New property
    };
  },
  methods: {
    assignToTrip() {
      // Emit an event to parent component with selected trip ID and reservation ID
      this.$emit('assignReservation', { tripId: this.selectedTrip, reservationId: this.reservation.reservationid, personId:this.reservation.personid });
    },
    formatKey(key) {
      // Capitalize and replace underscores with spaces
      return key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    },
    formatValue(value) {
      // Handling null values
      return value === null ? 'None' : value;
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
  }
};
</script>

<style scoped>
.unassigned-reservation {
  max-width: 350px;
}

.reservation-link {
  color: var(--primary-text-eph-color);
  text-decoration: none;
}

.assign-button{
  background-color: var(--primary-eph-color);
}

.reservation-link:hover {
  text-decoration: underline;
}

.email-text {
  color: grey;
  font-size: small;
}

.id-box {
  background-color: #f2f2f2;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: small;
  color: grey;
}

.activity-label {
  font-weight: bold;
  margin-top: 10px;
}
.details-toggle {
  cursor: pointer;
  background-color: #f0f0f0;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
  margin-bottom: 0; /* Remove gap */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details-expandable {
  margin-bottom: 10px;
}

.detail-section {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-top: none; /* Remove top border */
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-top: 0; /* Remove gap */
}

.arrow {
  font-size: 0.8em;
}

.detail-item {
  margin-bottom: 5px;
}

.detail-key {
  font-weight: bold;
  margin-right: 5px;
}

.detail-value {
  color: #333;
}

.activity-box {
  background-color: var(--primary-eph-color);
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>

  