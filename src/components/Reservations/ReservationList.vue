<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name, email, ID, or group code"
            v-model="searchQuery"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchReservations"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <h4>Reservation List</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Group Code</th>
              <th scope="col">Activity Date</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Balance Owing</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(reservation, index) in reservations" :key="reservation.reservationid">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ reservation.groupcode }}</td>
              <td>{{ reservation.activitydate }}</td>
              <td>{{ reservation.person.firstname }}</td>
              <td>{{ reservation.person.lastname }}</td>
              <td>{{ reservation.person.email }}</td>
              <td>{{ reservation.balanceowing }}</td>
              <td>
                <router-link :to="{ name: 'reservation', params: { id: reservation.reservationid }}">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import ReservationDataService from "../../services/ReservationDataService.js";
  
  export default {
    name: "reservation-list",
    data() {
      return {
        reservations: [],
        searchGroupCode: "",
        searchQuery: "",
        serverIP: process.env.VUE_APP_SERVERIP+":"+process.env.VUE_APP_SERVERPORT,
      };
    },
    methods: {
      retrieveReservations() {
        ReservationDataService.getAll()
          .then(response => {
            this.reservations = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      searchGroupCodeMethod() {
        ReservationDataService.findByGroupCode(this.searchGroupCode)
          .then(response => {
            this.reservations = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },

      searchReservations() {
        if (!this.searchQuery.trim()) {
          // If the search query is empty or only whitespace, retrieve all reservations
          this.retrieveReservations();
        } else {
          // Perform the search
          ReservationDataService.search(this.searchQuery)
            .then(response => {
              this.reservations = response.data;
            })
            .catch(e => {
              console.log(e);
            });
        }
      },
    },
    mounted() {
      this.retrieveReservations();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 950px;
    margin: auto;
  }
  </style>
  