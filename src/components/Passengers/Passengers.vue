<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="searchName"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchNameMethod"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <h4>Clients List</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, index) in clients" :key="client.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ client.person.firstname }}</td>
              <td>{{ client.person.lastname }}</td>
              <td>{{ client.person.email }}</td>
              <td>
                <router-link :to="{ name: 'client', params: { id: client.clientid }}">Edit</router-link>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import ClientsDataService from "../../services/ClientsDataService.js";
  
  export default {
    name: "passengers-list",
    data() {
      return {
        clients: [],
        searchName: ""
      };
    },
    methods: {
      retrieveClients() {
        ClientsDataService.getAll()
          .then(response => {
            this.clients = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      searchNameMethod() {
        ClientsDataService.findByName(this.searchName)
          .then(response => {
            this.clients = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveClients();
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
  