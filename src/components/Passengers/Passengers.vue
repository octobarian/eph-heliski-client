<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name" v-model="searchName" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchNameMethod">
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
            <th scope="row">{{ (currentPage - 1) * pageSize + index + 1 }}</th>
            <td>{{ client.person ? client.person.firstname : 'N/A' }}</td>
            <td>{{ client.person ? client.person.lastname : 'N/A' }}</td>
            <td>{{ client.person ? client.person.email : 'N/A' }}</td>
            <td>
              <router-link :to="{ name: 'client', params: { id: client.clientid }}">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{disabled: currentPage === 1}">
            <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{active: currentPage === page}">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{disabled: currentPage === totalPages}">
            <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
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
      searchName: "",
      currentPage: 1,
      pageSize: 50,
      totalItems: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
  methods: {
    retrieveClients(page = 1) {
      ClientsDataService.getAll({ page: page, pageSize: this.pageSize })
        .then(response => {
          this.clients = response.data.clients;
          this.totalItems = response.data.totalItems; // Update totalItems here
          this.currentPage = page; // Ensure you update currentPage based on the response if needed
          // No need to manually update totalPages; it's computed automatically
        })
        .catch(e => {
          console.log(e);
        });
    },
    searchNameMethod() {
      ClientsDataService.findByName(this.searchName)
        .then(response => {
          // Assuming the response structure is the same as from getAll
          this.clients = response.data.clients || []; // Fallback to an empty array if undefined
          this.totalItems = response.data.totalItems || 0;
          this.currentPage = 1; // Reset to the first page for new search results
        })
        .catch(e => {
          console.log(e);
        });
    },
    changePage(page) {
      this.retrieveClients(page); // Fetch the new page of clients
    },
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
  