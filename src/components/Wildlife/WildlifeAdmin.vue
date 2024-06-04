<template>
    <div class="wildlife-admin-page">
        <h1>Wildlife Administration</h1>

        <!-- Interface for viewing wildlife sightings in trip groups -->
        <div class="view-wildlife-interface">
            <h2>View Wildlife Sightings</h2>
            <div class="date-picker-container">
                <label for="selectedDate">Select Date:</label>
                <input type="date" id="selectedDate" v-model="selectedDate" @change="fetchTripsByDate" class="date-picker" />
            </div>
            <div v-if="trips.length === 0" class="no-trips-message">
                <p>No trips found for the selected date.</p>
            </div>
            <div v-else class="trips-container">
                <div v-for="(trip, tripIndex) in sortedTrips" :key="trip.tripId" class="trip-card">
                    <div class="trip-header" @click="toggleTripCollapse(trip)">
                        <h2>Heli #{{ tripIndex + 1 }} ({{ trip.triptype || '' }})</h2>
                        <span>{{ trip.isCollapsed ? '▼' : '▲' }}</span>
                    </div>
                    <div v-if="!trip.isCollapsed" class="groups-container">
                        <div v-for="(group, groupIndex) in sortedGroups(trip.groups)" :key="group.groupid" class="group-card">
                            <h3>Group #{{ groupIndex + 1 }}</h3>
                            <div class="wildlife-sightings">
                                <h4>Wildlife Sightings:</h4>
                                <table class="wildlife-sightings-table">
                                    <thead>
                                        <tr>
                                            <th>Location</th>
                                            <th>Species</th>
                                            <th>Type</th>
                                            <th>Comments</th>
                                            <th>Spotted Time</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(sighting, index) in group.wildlifeSightings" :key="index">
                                            <td>{{ getRunName(sighting.runid) }}</td>
                                            <td>{{ sighting.species }}</td>
                                            <td>{{ sighting.type }}</td>
                                            <td>{{ sighting.comments }}</td>
                                            <td>{{ formatTime(sighting.spottedtime) }}</td>
                                            <td><button class="delete-button" @click="deleteSighting(sighting.wildlifeid, group)">Delete</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class="location-selectors">
                                                    <select v-model="group.newSighting.zoneid" @change="fetchRunsByZone(group.newSighting.zoneid, group)">
                                                        <option disabled value="">Select Zone</option>
                                                        <option v-for="zone in zones" :key="zone.id" :value="zone.id">{{ zone.zonename }}</option>
                                                    </select>
                                                    <select v-model="group.newSighting.runid">
                                                        <option disabled value="">Select Run</option>
                                                        <option v-for="run in group.runs" :key="run.runid" :value="run.runid">{{ run.runname }}</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <select v-model="group.newSighting.species">
                                                    <option disabled value="">Select Species</option>
                                                    <option v-for="species in speciesList" :key="species" :value="species">{{ species }}</option>
                                                </select>
                                            </td>
                                            <td><input type="text" v-model="group.newSighting.type" placeholder="Type" /></td>
                                            <td><input type="text" v-model="group.newSighting.comments" placeholder="Comments" /></td>
                                            <td><input type="time" v-model="group.newSighting.spottedTime" /></td>
                                            <td><button class="add-button" @click="addSighting(group)">Add Spotting</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TripDataService from '@/services/TripDataService.js';
import WildlifeDataService from '@/services/WildlifeDataService.js';
import RunsZonesDataService from '@/services/RunsZonesDataService.js';

export default {
    name: "WildlifeAdmin",
    data() {
        return {
            trips: [],
            zones: [],
            runs: [],
            selectedDate: new Date().toISOString().split('T')[0],
            speciesList: [
                'Grizzly Bear',
                'Black Bear',
                'Moose',
                'Elk',
                'Deer',
                'Mountain Goat',
                'Bighorn Sheep',
                'Wolverine',
                'Lynx',
                'Wolf',
                'Fox',
                'Cougar'
            ],
        };
    },
    computed: {
        sortedTrips() {
            return this.trips.slice().sort((a, b) => a.tripId - b.tripId);
        },
        sortedGroups() {
            return (groups) => groups.slice().sort((a, b) => a.groupid - b.groupid);
        },
    },
    methods: {
        fetchTripsByDate() {
            TripDataService.fetchTripsByDate(this.selectedDate)
                .then(response => {
                    this.trips = response.data;
                    this.trips.forEach(trip => {
                        this.$set(trip, 'isCollapsed', true);
                        trip.groups.forEach(group => {
                            this.$set(group, 'newSighting', {
                                zoneid: '',
                                runid: '',
                                species: '',
                                type: '',
                                comments: '',
                                spottedTime: ''
                            });
                            this.fetchWildlifeForGroup(this.selectedDate, group);
                        });
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        fetchWildlifeForGroup(date, group) {
            WildlifeDataService.getByDateAndTripGroup(date, group.groupid)
                .then(response => {
                    this.$set(group, 'wildlifeSightings', response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteSighting(wildlifeid, group) {
            WildlifeDataService.delete(wildlifeid)
                .then(() => {
                    group.wildlifeSightings = group.wildlifeSightings.filter(sighting => sighting.wildlifeid !== wildlifeid);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        addSighting(group) {
            const spottedDateTime = this.selectedDate + 'T' + group.newSighting.spottedTime;
            const newSighting = {
                runid: group.newSighting.runid,
                type: group.newSighting.type,
                comments: group.newSighting.comments,
                species: group.newSighting.species,
                observerid: 1, // Replace with actual observer id
                sightingdetails: '',
                isplaceholder: false,
                tripgroupid: group.groupid,
                spottedTime: spottedDateTime
            };

            WildlifeDataService.create(newSighting)
                .then(response => {
                    group.wildlifeSightings.push(response.data);
                    group.newSighting.zoneid = '';
                    group.newSighting.runid = '';
                    group.newSighting.species = '';
                    group.newSighting.type = '';
                    group.newSighting.comments = '';
                    group.newSighting.spottedTime = '';
                })
                .catch(e => {
                    console.log(e);
                });
        },
        fetchZones() {
            RunsZonesDataService.getAllZones()
                .then(response => {
                    this.zones = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        fetchAllRuns() {
            RunsZonesDataService.getAllRuns()
                .then(response => {
                    this.runs = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        fetchRunsByZone(zoneId, group) {
            RunsZonesDataService.getRunsByZone(zoneId)
                .then(response => {
                    this.$set(group, 'runs', response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getRunName(runid) {
            const run = this.runs.find(run => run.runid === runid);
            return run ? run.runname : 'Unknown Run';
        },
        formatTime(timestamp) {
            if (timestamp) {
                return timestamp.split('T')[1].substring(0, 5);
            }
            return 'N/A';
        },
        toggleTripCollapse(trip) {
            trip.isCollapsed = !trip.isCollapsed;
        }
    },
    mounted() {
        this.fetchTripsByDate();
        this.fetchZones();
        this.fetchAllRuns();
    }
};
</script>

<style scoped>
.wildlife-admin-page {
    padding: 20px;
}

.view-wildlife-interface {
    margin-bottom: 20px;
}

.date-picker-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.date-picker {
    margin-left: 10px;
}

.no-trips-message {
    text-align: center;
    font-size: 1.2em;
    color: #888;
}

.trips-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.trip-card {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
}

.trip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.groups-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.group-card {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
}

.wildlife-sightings {
    margin-top: 10px;
}

.wildlife-sightings-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
}

.wildlife-sightings-table th,
.wildlife-sightings-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.add-button,
.delete-button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.delete-button {
    background-color: red;
}

.location-selectors {
    display: flex;
    flex-direction: column;
}
</style>
