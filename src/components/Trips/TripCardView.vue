<template>
    <div class="trip-card card">
      <div class="card-header">
        <h2>Trip #{{ tripNumber }}</h2>
        <p>Trip ID: {{ tripData.tripid }}</p>
      </div>
  
      <div class="card-body">
        <div class="guide-section">
          <label>Guides:</label>
          <div class="selected-guides">
            <span class="guide-tag" v-for="guide in tripData.guides" :key="guide.personid">
              {{ guide.firstname }} {{ guide.lastname }}
            </span>
          </div>
        </div>
  
        <div class="pilot-helicopter">
          <p><strong>Pilot:</strong> {{ tripData.pilot.firstname }} {{ tripData.pilot.lastname }}</p>
          <p><strong>Helicopter:</strong> {{ tripData.helicopter.model }} ({{ tripData.helicopter.callsign }})</p>
        </div>
  
        <div class="reservations-section">
          <h5 class="card-title">Reservations</h5>
          <div class="selected-reservations">
            <span class="reservation-tag" v-for="reservation in tripData.reservationPersons" :key="reservation.reservationid">
              {{ reservation.person.firstname }} {{ reservation.person.lastname }} - {{ reservation.person.weight }} kg
            </span>
          </div>
        </div>
  
        <div class="notes-section">
          <label>Notes:</label>
          <p>{{ noteContent }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NotesDataService from '@/services/NotesDataService';
  export default {

    props: {
      tripData: {
        type: Object,
        required: true
      },
      tripNumber: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        // ... other data properties ...
        noteContent: '',
      };
    },
    methods: {
      fetchNote() {
        NotesDataService.getTripNote(this.tripData.tripid)
          .then(response => {
            this.noteContent = response.data.text;
          })
          .catch(error => {
            console.error('Error fetching note:', error);
          });
      }
    },
    mounted() {
      this.fetchNote();
    },

  };
  </script>
  
  <style scoped>
  /* You can reuse most of the CSS from TripCard.vue */
  /* However, you need to remove or adjust styles for interactive elements */
  .trip-card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px;
  }
  
  .trip-card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  
  .card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e3e6ea;
  }
  
  .card-body {
    padding: 15px;
  }
  
  .selected-guides, .selected-reservations {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  
  .guide-tag, .reservation-tag {
    padding: 5px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    background-color: #e9ecef;
    border-radius: 16px;
    font-size: 14px;
  }
  
  .notes-section p {
    background-color: #f8f9fa;
    padding: 10px;
    border-radius: 5px;
  }
  
  /* Other styles as necessary */
  </style>
  