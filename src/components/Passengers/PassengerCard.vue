<template>
  <div class="passenger-card" ref="cardContainer">
    <h3 class="passenger-name" ref="passengerName">{{ passenger.name }}</h3>
    <div class="activity-label">
          <label>Activity:</label>
          <div class="activity-box">{{ activityname }}</div>
        </div>
    <p><strong>Weight:</strong> {{ passenger.weight }} kg</p>
    <!-- Placeholder for additional passenger data -->
    <div v-if="passenger.additionalData" class="additional-data">
      <!-- Render additional data here -->
    </div>
    <div class="trip-client-id">
        Trip Client ID: {{ passenger.tripclientid }}
      </div>

    <label for="dropdownMenuButton" class="beacon-label">Beacon #</label>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {{ selectedBeaconNumber || 'Select Beacon' }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="beacon in beacons" :key="beacon.beaconid">
          <a class="dropdown-item"
             :class="{ 'text-danger': beacon.tripclientid, 'text-dark': !beacon.tripclientid }"
             href="#"
             @click.prevent="handleBeaconChange(beacon.beaconid, beacon.beaconnumber)">
            {{ beacon.beaconnumber }} {{ beacon.tripclientid?'Assigned':'' }}
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    passenger: Object,
    activityname: String,
    beacons: Array,
  },
  data() {
    return {
      selectedBeacon: null,
      selectedBeaconNumber: ''
    };
  },
  watch: {
    beacons: {
      handler(newBeacons) {
        const assignedBeacon = newBeacons.find(beacon => beacon.tripclientid === this.passenger.tripclientid);
        if (assignedBeacon) {
          this.selectedBeacon = assignedBeacon.beaconid;
          this.selectedBeaconNumber = assignedBeacon.beaconnumber;
        }
      },
      deep: true // To watch for nested data changes within the array
    }
  },
  methods: {
    handleBeaconChange(beaconId, beaconNumber) {
      this.selectedBeacon = beaconId;
      this.selectedBeaconNumber = beaconNumber;
      this.$emit('beacon-change', { beaconId, tripClientId: this.passenger.tripclientid });
    },
    resizeFont() {
      const nameElement = this.$refs.passengerName;
      const containerWidth = this.$refs.cardContainer.offsetWidth;
      const nameLength = this.passenger.name.length;

      if (nameLength <= 20) {
        let fontSize = 20; // Start with a base font size
        nameElement.style.fontSize = fontSize + 'px';
        nameElement.style.whiteSpace = 'nowrap';

        while (nameElement.scrollWidth > containerWidth && fontSize > 8) {
          fontSize -= 1;
          nameElement.style.fontSize = fontSize + 'px';
        }
      } else {
        nameElement.style.whiteSpace = 'normal';
        nameElement.style.fontSize = 'initial'; // Reset font size for longer names
      }
    }
  },
  mounted() {
    this.resizeFont();
    window.addEventListener('resize', this.resizeFont);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeFont);
  },
  created() {
    // Find and set the currently assigned beacon if it exists
    const assignedBeacon = this.beacons.find(beacon => beacon.tripclientid === this.passenger.tripclientid);
    if (assignedBeacon) {
      this.selectedBeacon = assignedBeacon.beaconid;
      this.selectedBeaconNumber = assignedBeacon.beaconnumber;
    }
  }
};
</script>


<style scoped>
.assigned {
  color: red;
}
.unassigned {
  color: black;
}

.passenger-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.additional-data {
  margin-top: 10px;
}

.activity-label {
  font-weight: bold;
  margin-top: 10px;
}

.activity-box {
  background-color: var(--primary-eph-color);
  border-radius: 10px;
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.passenger-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This will push the beacon select to the bottom */
}

.passenger-name {
  overflow-wrap: break-word;
  font-weight: bold;
  color: var(--primary-text-eph-color);
}

.trip-client-id {
  color: lightgrey;
  font-size: 0.8rem;
}

.additional-data {
  margin-top: 10px;
}

/* Responsive text sizing for passenger name */
@media (max-width: 767px) {
  .passenger-name {
    font-size: 1.2rem;
  }
}

@media (max-width: 575px) {
  .passenger-name {
    font-size: 1rem;
  }
}

@media (max-width: 400px) {
  .passenger-name {
    font-size: 0.8rem;
  }
}
</style>