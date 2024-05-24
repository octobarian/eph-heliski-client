<template>
    <div class="shuttle-list">
        <h1>Shuttle List</h1>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createShuttleModal">Create Shuttle</button>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Shuttle Name</th>
                    <th>Staff ID</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="shuttle in shuttles" :key="shuttle.id">
                    <td>{{ shuttle.id }}</td>
                    <td>{{ shuttle.shuttlename }}</td>
                    <td>{{ shuttle.staffid }}</td>
                    <td>{{ shuttle.description }}</td>
                    <td class="action-buttons">
                        <button class="btn btn-warning" @click="editShuttle(shuttle)">Edit</button>
                        <button class="btn btn-danger" @click="deleteShuttle(shuttle.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Create Shuttle Modal -->
        <div class="modal fade" id="createShuttleModal" tabindex="-1" aria-labelledby="createShuttleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createShuttleModalLabel">Create New Shuttle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="createShuttle">
                            <div class="mb-3">
                                <label for="shuttlename" class="form-label">Shuttle Name</label>
                                <input type="text" class="form-control" id="shuttlename" v-model="newShuttle.shuttlename" required>
                            </div>
                            <div class="mb-3">
                                <label for="staffid" class="form-label">Staff ID</label>
                                <input type="number" class="form-control" id="staffid" v-model="newShuttle.staffid">
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">Description</label>
                                <input type="text" class="form-control" id="description" v-model="newShuttle.description">
                            </div>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Shuttle Modal -->
        <div class="modal fade" id="editShuttleModal" tabindex="-1" aria-labelledby="editShuttleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editShuttleModalLabel">Edit Shuttle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="updateShuttle">
                            <div class="mb-3">
                                <label for="editShuttlename" class="form-label">Shuttle Name</label>
                                <input type="text" class="form-control" id="editShuttlename" v-model="editShuttleData.shuttlename" required>
                            </div>
                            <div class="mb-3">
                                <label for="editStaffid" class="form-label">Staff ID</label>
                                <input type="number" class="form-control" id="editStaffid" v-model="editShuttleData.staffid">
                            </div>
                            <div class="mb-3">
                                <label for="editDescription" class="form-label">Description</label>
                                <input type="text" class="form-control" id="editDescription" v-model="editShuttleData.description">
                            </div>
                            <button type="submit" class="btn btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ShuttleDataService from "@/services/ShuttleDataService";

export default {
    data() {
        return {
            shuttles: [],
            newShuttle: {
                shuttlename: '',
                staffid: null,
                description: ''
            },
            editShuttleData: {
                id: '',
                shuttlename: '',
                staffid: null,
                description: ''
            }
        };
    },
    methods: {
        fetchShuttles() {
            ShuttleDataService.getAllShuttles()
                .then(response => {
                    this.shuttles = response.data;
                })
                .catch(error => {
                    console.error("Error fetching shuttles:", error);
                });
        },
        createShuttle() {
            ShuttleDataService.createShuttle(this.newShuttle)
                .then(() => {
                    this.fetchShuttles();
                    this.$bvModal.hide('createShuttleModal');
                })
                .catch(error => {
                    console.error("Error creating shuttle:", error);
                });
        },
        editShuttle(shuttle) {
            this.editShuttleData = { ...shuttle };
            this.$bvModal.show('editShuttleModal');
        },
        updateShuttle() {
            ShuttleDataService.editShuttle(this.editShuttleData.id, this.editShuttleData)
                .then(() => {
                    this.fetchShuttles();
                    this.$bvModal.hide('editShuttleModal');
                })
                .catch(error => {
                    console.error("Error updating shuttle:", error);
                });
        },
        deleteShuttle(shuttleId) {
            if (confirm("Are you sure you want to delete this shuttle? This action cannot be undone.")) {
                ShuttleDataService.deleteShuttle(shuttleId)
                    .then(() => {
                        this.fetchShuttles();
                    })
                    .catch(error => {
                        console.error("Error deleting shuttle:", error);
                        alert("An error occurred while trying to delete the shuttle.");
                    });
            }
        }
    },
    created() {
        this.fetchShuttles();
    }
};
</script>

<style scoped>
/* Add styles here */
</style>
