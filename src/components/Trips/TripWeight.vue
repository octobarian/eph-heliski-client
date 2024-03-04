<template>
    <div class="trip-weight">
      <h5>Total Weights</h5>
      <p>Total Passenger Weight: {{ totalPassengerWeight }} lb</p>
      <div>
        <label for="gearWeight">Gear Weight (lb):</label>
        <input type="number" id="gearWeight" v-model.number="totalGearWeight">
      </div>
      <p>Total Fuel Percentage: {{ totalFuelPercentage.toFixed(2) }}%</p>
      <p v-if="isTooHeavy" class="too-heavy-warning">Too Heavy</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tripData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        totalGearWeight: 0
      };
    },
    computed: {
        totalPassengerWeight() {
            let totalWeight = 0;

            // Add the pilot's weight
            if (this.tripData.pilot && this.tripData.pilot.weight) {
            totalWeight += parseFloat(this.tripData.pilot.weight);
            }

            // Add the weight of each guide
            this.tripData.guides.forEach(guide => {
                if (guide.weight) {
                    totalWeight += parseFloat(guide.weight);
                }
            });

            // Add the weight of each client from the reservations
            this.tripData.reservationPersons.forEach(reservation => {
                if (reservation.person && reservation.person.weight) {
                    totalWeight += parseFloat(reservation.person.weight);
                }
            });

            return totalWeight;
        },
        totalFuelPercentage() {
            const totalWeight = this.totalPassengerWeight + this.totalGearWeight;
            var helicopter = this.tripData.helicopter;
            if (helicopter) {
                const weightRemainder = helicopter.maxweight - totalWeight;
                return (weightRemainder / helicopter.fuelamounttotal) * 100;
            }
        return 0;
        },
        isTooHeavy() {
            return this.totalFuelPercentage < 20;
        }
    },
    watch: {
        totalGearWeight(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$emit('gearWeightUpdated', newVal);
            }
        },
        'tripData.helicopterId'(newVal, oldVal) {
          if (newVal !== oldVal) {
            this.$forceUpdate();
          }
        }
    }
  };
  </script>
  
  <style scoped>
.trip-weight {
    background-color: #f8f9fa; /* Light background for the section */
    border-top: 2px solid #e9ecef; /* Separating line from the rest of the card */
    padding-top: 20px; /* Spacing at the top */
    padding-left: 20px;
}
.too-heavy-warning {
    color: red;
}
  </style>