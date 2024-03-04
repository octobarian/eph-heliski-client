<template>
    <div class="unassigned-reservations">
      <h3>Unassigned Reservations</h3>
      <unassigned-reservation
        v-for="reservation in unassignedReservations"
        :key="reservation.reservationid"
        :reservation="reservation"
        :trips="trips"
        @assignReservation="handleAssignment"
      />
    </div>
  </template>
  
  <script>
  import UnassignedReservation from './UnassignedReservation.vue';
  
  export default {
    components: {
      UnassignedReservation
    },
    props: {
      unassignedReservations: Array,
      trips: Array
    },
    methods: {
      handleAssignment(data) {
        // Logic to handle assignment
        // Emit an event to the parent component (Greeting-Office.vue) with the data
        this.$emit('reservationAssigned', data);
      }
    }
  };
  </script>
  