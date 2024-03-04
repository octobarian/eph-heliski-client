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
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createStaffModal">
            Create Staff
          </button>
        </div>
      </div>
      <div class="col-md-12">
        <h4>Staff List</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Job Title</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(staff, index) in staffs" :key="staff.staffid">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ staff.person.firstname }}</td>
              <td>{{ staff.person.lastname }}</td>
              <td>{{ staff.person.email }}</td>
              <td>{{ staff.job ? staff.job.jobtitle : 'N/A' }}</td>
              <td>
                <router-link :to="{ name: 'staff', params: { id: staff.staffid }}">Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
         <!-- Modal -->
      <div ref="createStaffModal" class="modal fade" id="createStaffModal" tabindex="-1" aria-labelledby="createStaffModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createStaffModalLabel">Create New Staff Member</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveNewStaff">
              <div class="mb-3">
                <label for="staffFirstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="staffFirstName" v-model="newStaff.firstName" required>
              </div>
              <div class="mb-3">
                <label for="staffLastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="staffLastName" v-model="newStaff.lastName" required>
              </div>
              <div class="mb-3">
                <label for="staffEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="staffEmail" v-model="newStaff.email" required>
              </div>
              <div class="mb-3">
                <label for="staffJobTitle" class="form-label">Job Title</label>
                <select class="form-select" id="staffJobTitle" v-model="newStaff.jobTitle" required>
                  <option value="" disabled>Select job title</option>
                  <option v-for="job in jobs" :key="job.jobid" :value="job.jobtitle">{{ job.jobtitle }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import StaffDataService from "../../services/StaffDataService.js";
  
  export default {
    name: "staff-list",
    data() {
      return {
        newStaff: {
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: ''
        },
        staffs: [],
        jobs: [],
        searchName: ""
      };
    },
    methods: {
      retrieveStaff() {
        StaffDataService.getAll()
          .then(response => {
            this.staffs = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },

      saveNewStaff() {
        const newStaffData = {
          // Assuming your newStaff data structure matches your backend expectations
          jobid: this.jobs.find(job => job.jobtitle === this.newStaff.jobTitle).jobid,
          person: {
            firstname: this.newStaff.firstName,
            lastname: this.newStaff.lastName,
            email: this.newStaff.email,
            // Add other details as required
          },
          // Add other staff details if required
        };

        StaffDataService.create(newStaffData)
          .then(response => {
            console.log(response.data);
            this.staffs.push(response.data.staff);
            this.closeModalAndReset();
            this.retrieveStaff(); // Refetch the staff list
          })
          .catch(error => {
            console.error("Error creating staff:", error);
          });
      },

      closeModalAndReset() {
        // Hide the modal
        const modal = this.$refs.createStaffModal;
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        
        // Remove the modal's backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        // Reset the form fields
        this.newStaff = {
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: ''
        };
      },

      fetchJobs() {
        StaffDataService.fetchJobs()
          .then(response => {
            this.jobs = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      searchNameMethod() {
        StaffDataService.findByName(this.searchName)
          .then(response => {
            this.staffs = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveStaff();
      this.fetchJobs();
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
  