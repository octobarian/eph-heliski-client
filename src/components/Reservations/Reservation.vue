<template>
    <div class="reservation">
      <h2 class="page-title">Reservation Details</h2>
  
      <div class="button-container">
        <button class="back-button" @click="goBack()">Back</button>
      </div>
  
      <section v-if="reservation">
        <section class="profile-section">
          <h3>Reservation Information</h3>
          <div class="profile-details">
            <p><strong>Group Code:</strong> {{ reservation.groupcode }}</p>
            <p><strong>Activity Date:</strong> {{ reservation.activitydate }}</p>
            <p><strong>Balance Owing:</strong> {{ reservation.balanceowing }}</p>
            <!-- Add other reservation details here -->
          </div>
        </section>
  
        <section class="profile-section">
          <h3>Guest Information</h3>
          <div class="profile-details" v-if="reservation.person">
            <p><strong>First Name:</strong> {{ reservation.person.firstname }}</p>
            <p><strong>Last Name:</strong> {{ reservation.person.lastname }}</p>
            <p><strong>Email:</strong> {{ reservation.person.email }}</p>
            <p><strong>Mobile Phone:</strong> {{ reservation.person.mobilephone }}</p>
            <router-link :to="`/clients/${clientId}`" class="btn btn-primary">View Guest</router-link>
            <!-- Add other guest details here -->
          </div>
        </section>
  
        <section class="profile-section">
          <h3>Reservation Details</h3>
          <div v-for="detail in reservation.details" :key="detail.reservationdetailid" class="details">
            <p><strong>Activity:</strong> {{ detail.activity }}</p>
            <p><strong>Van Pickup:</strong> {{ detail.vanpickup ? 'Yes' : 'No' }}</p>
            <p><strong>First Ski Trip of Year:</strong> {{ detail.firstskitripofyear ? 'Yes' : 'No' }}</p>
            <p><strong>New Guest:</strong> {{ detail.newguest ? 'Yes' : 'No' }}</p>
            <p><strong>Arriving to Revelstoke:</strong> {{ detail.arrivingtorevelstoke }}</p>
            <p><strong>Additional Details:</strong> {{ detail.ad2 }}</p>
            <!-- Add other reservation detail fields here -->
          </div>
        </section>
      </section>
      
      <div v-else>
        <p>Loading reservation details...</p>
      </div>
    </div>
  </template>
  
  <script>
  import ReservationDataService from "@/services/ReservationDataService";
  import ClientsDataService from "@/services/ClientsDataService";
  
  export default {
    name: 'Reservation',
    props: ['id'],
    data() {
      return {
        reservation: null,
        reservationDetails: [],
        clientId: null
        // Add other data properties as needed
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      fetchReservationData() {
        // Fetch reservation data by id
        ReservationDataService.get(this.id)
          .then(response => {
            this.reservation = response.data;
            this.reservationDetails = response.data.details; // Assuming the details are included in the response
            this.fetchClientId(); // Call fetchClientId when reservation data is loaded
          })
          .catch(e => {
            console.error(e);
          });
      },
      fetchClientId() {
        if (this.reservation && this.reservation.person) {
            const personId = this.reservation.person.personid;
            ClientsDataService.fetchClientId(personId)
            .then(response => {
                this.clientId = response.data.clientid; // Assuming the response contains the client ID
            })
            .catch(e => {
                console.error(e);
            });
        }
      },
      // Add other methods as needed
    },
    created() {
      this.fetchReservationData();
    }
  };
  </script>
  <style scoped>
  .reservation {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .profile-section {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 18px;
  }
  
  .profile-details, .details {
    margin-top: 10px;
  }
  
  .details {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .edit-button, .back-button {
    background-color: #ccc;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .edit-button:hover, .back-button:hover {
    background-color: #999;
  }
  
  .back-button {
    background-color: #007bff;
  }
  
  .back-button:hover {
    background-color: #0056b3;
  }
  </style>
  
  