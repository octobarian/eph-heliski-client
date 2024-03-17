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
          <div class="activity-box" :class="activityClass">{{ reservation.activityName }}</div>
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

      <div class="row">
        <div class="select-group">
          <label for="UAtrip-selector">Trip ID:</label>
          <select name="UAtrip-selector" v-model="selectedTrip" class="UAtrip-selector form-select me-2" @change="fetchGroupsForTrip">
            <option disabled value="">Select Trip</option>
            <option v-for="trip in trips" :key="trip.tripId" :value="trip.tripId">
              #{{ trip.tripId }}
            </option>
          </select>
        </div>
        <!-- New group selection dropdown, shown only if there are groups -->
        <div class="select-group" v-if="showGroupDropdown">
          <label for="UAgroup-selector">Group ID:</label>
          <select name="UAgroup-selector" v-model="selectedGroup" class=" UAgroup-selector form-select me-2">
            <option disabled value="">Select Group</option>
            <option v-for="group in groups" :key="group.trip_group_id" :value="group.trip_group_id">
              #{{ group.trip_group_id }}
            </option>
          </select>
        </div>
      </div>

      <button @click="assignToGroup" class="btn assign-button" v-if="selectedGroup">Assign</button>
    </div>
  </div>
</template>

<script>
import TripDataService from '@/services/TripDataService';

export default {
  props: {
    reservation: Object,
    trips: Array
  },
  data() {
    return {
      selectedTrip: '',
      selectedGroup: '', // Initialize selectedGroup
      showDetails: false,
      showGroupDropdown: false,
      groups: [],
    };
  },
  methods: {
    fetchGroupsForTrip() {
      this.showGroupDropdown = false;
      if (!this.selectedTrip) return; // Guard clause if no trip is selected
      TripDataService.fetchGroupsForTrip(this.selectedTrip)
        .then(response => {
          this.groups = response.data; // Assuming the response contains an array of groups
          this.selectedGroup = ''; // Reset selectedGroup when trip changes
          if(this.groups.length > 0){
            this.showGroupDropdown = true;
          }
        })
        .catch(error => {
          console.error("Error fetching groups:", error);
        });
    },
    assignToGroup() {
      // Emit an event to parent component with selected trip ID and reservation ID
      this.$emit('assignReservation', { 
        tripId: this.selectedTrip, 
        groupId: this.selectedGroup,
        reservationId: this.reservation.reservationid, 
        personId:this.reservation.personid });
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
  },
  computed: {
    activityClass() {
      if (this.reservation.activityName.toLowerCase().includes('private')) {
        return 'private-event';
      } else if (this.reservation.activityName.toLowerCase().includes('media')) {
        return 'media-event';
      } else if (this.reservation.activityName.toLowerCase().includes('lodge')) {
        return 'lodge-event';
      } else if (this.reservation.activityName.toLowerCase().includes('day')) {
        return 'day-event';
      }
      return ''; // default class if needed
    },
  },

};
</script>

<style scoped>

.select-group {
  margin-bottom: 1rem;
}

.select-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.select-group select {
  width: 100%;
}

@media (min-width: 768px) {
  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem; /* This will add space between the rows */
  }

  .select-group {
    width: calc(50% - 0.5rem);
  }
}

.private-event {
  background-color: var(--private-event-color);
}

.media-event {
  background-color: var(--minor-media-event-color);
}

.lodge-event {
  background-color: var(--lodge-event-color);
}

.day-event {
  background-color: var(--day-event-color);
}

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
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>

  