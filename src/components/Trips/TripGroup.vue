<template>
    <div class="trip-group">
        <div class="group-header">
            <span class="group-id-label">GID: {{ groupId }}</span>
            <span class="group-info">Clients: {{ clientCount }} | Total Weight: {{ totalWeight }}lb</span>
            <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
                <!-- Arrow icon will change direction based on collapsed state -->
                <span v-if="!isCollapsed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16">
                        <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
                    </svg>
                </span> <!-- Down arrow for uncollapsed -->
                <span v-else> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
                        <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659"/>
                    </svg>
                </span> <!-- Up arrow for collapsed -->
            </button>
            <button v-if="!isCollapsed" class="delete-group-btn" @click="deleteGroup(groupId)">
                Delete Group   
                <svg style="margin-left: 15px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
        </div>
        <div v-if="!isCollapsed" class="group-details">
            <div class="guide-dropdown">
                <label>Guide: </label>
                <select v-model="selectedGuideId" style="margin-left: 10px;">
                    <option disabled value="">Select a Guide</option>
                    <option 
                        v-for="availableGuide in allGuides" 
                        :key="availableGuide.staffid" 
                        :value="availableGuide.staffid">
                        {{ availableGuide.person.firstname }} {{ availableGuide.person.lastname }}
                    </option>
                </select>
            </div>
        <div class="continue-section">
            <label>Continue till: </label>
            <input type="date" style="margin-left: 10px;" class="continue-till-date">
        </div>
        <div class="clients-section">
            <label class="group-members-label">Group Members:</label>
            <div class="client-grid">
                <div v-for="(client, index) in clients" :key="client.reservationid" class="client-card">
                    <span class="age-emoji" :style="getAgeStyle(client.person.age)">{{ getAgeEmoji(client.person.age) }}</span>
                    {{ client.person.firstname }} {{ client.person.lastname }} 
                    <button class="remove-client-btn" @click="emitRemoveClient(client, index)">x</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props: {
      groupId: Number,
      guide: {
        type: Object,
        required: true,
      },
      clients: {
        type: Array,
        required: true,
      },
      allGuides: {
        type: Array,
        required: true,
      }
    },
    methods: {
        getAgeEmoji(age) {
            if (age < 18) {
                return '👶🏻'; // Kid emoji
            } else if (age > 65) {
                return '👴🏻'; // Senior
            } else {
                return ''; // No emoji for adults between 18 and 65
            }
        },
        getAgeStyle(age) {
            if (age < 18) {
                return {
                fontSize: '25px',
                backgroundColor: 'lightgreen',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                width: '33px',
                height: '33px'
                };
            } else if (age > 64) {
                return {
                fontSize: '25px',
                backgroundColor: 'lightcoral',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                width: '33px',
                height: '33px'
                };
            } else {
                return {};
            }
        },
        deleteGroup(groupId) {
            this.$emit('deleteGroup', groupId);
        },
        emitRemoveGuide(guide) {
            this.$emit('removeGuide', guide);
        },
        emitRemoveClient(client) {
            console.log(client); // This should now correctly log the client object
            this.$emit('removeClient', { tripClientId: client.tripClientId, groupId: this.groupId });
        }


    },
    data() {
        return {
            isCollapsed: true,
        };
    },
    watch: {

    },
    computed: {
        clientCount() {
        return this.clients.length;
        },
        totalWeight() {
            // Calculate total weight by summing up the weight of each client
            return this.clients.reduce((total, client) => total + parseInt(client.person.weight), 0);
        },
        selectedGuideId: {
            get() {
                // Check if guide exists before trying to access its properties
                if (this.guide && this.guide.guideid) {
                    const matchingGuide = this.allGuides.find(guide => guide.staffid === this.guide.guideid);
                    return matchingGuide ? matchingGuide.staffid : '';
                }
                return ''; // Return an empty string or a default value if no guide is assigned
            },
            set(value) {
                if (value) {
                    // Find the guide object but only emit its staffid
                    let guideObject = this.allGuides.find(guide => guide.staffid === value);
                    if(guideObject) {
                        this.$emit('update:guide', guideObject.staffid, this.groupId);
                        }
                    }
                }
        }
    },
  };
  </script>
  
<style scoped>

    .group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        background-color: #f5f5f5;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .group-id-label{
        color: var(--primary-text-eph-color);
        margin-bottom: 10px
    }

    .collapse-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1rem;
        margin-right: 20px;
    }

    .trip-group {
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 15px;
        position: relative;
        margin-bottom: 15px; /* Spacing between trip groups */
    }

    .delete-group-btn {
        background-color: #dc3545; /* Bootstrap's .btn-danger background color */
        color: #fff; /* White text color for visibility */
        border-radius: 10px;
        border: none;
        position: absolute;
        bottom: 6px;
        right: 25%;
        cursor: pointer;
        /* Set a fixed width and height for a square appearance */
        width: 200px; 
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .guide-section,
    .continue-section {
        margin-bottom: 10px;
    }

    .guide-dropdown{
        margin-bottom: 10px;
    }

    .group-members-label {
        margin-bottom: 10px; /* Space below the label before the grid starts */
    }

    .group-details {
        border: 1px solid #ccc;
        border-top: none;
        padding: 0 15px 15px;
        margin-bottom: 35px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }

    .group-info {
        background-color: #333; /* Dark grey background */
        color: #fff; /* White text color */
        font-size: 0.875rem; /* Small font size */
        padding: 5px 10px; /* Padding around the text */
        border-radius: 15px; /* Rounded corners */
        margin-left: 20px; /* Space from the group ID label */
        display: inline-block; /* Ensures the span behaves like a block with width and height but stays in line */
    }

    .dropdown-text {
        display: block;
        background-color: #fff;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .continue-till-date {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 5px;
    }

    .clients-section {
        display: flex;
        flex-direction: column;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .clients-section .client-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* 2 columns */
        gap: 10px; /* Spacing between grid items */
        /* No need for margin-top here since label has bottom margin */
    }

    .client-tag {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #dedede;
        border-radius: 16px;
        padding: 5px 10px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .client-card {
        background-color: #dedede;
        border-radius: 8px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .client-tag:hover {
        background-color: #ccc;
    }

    .remove-client-btn {
        margin-left: 8px;
        background-color: #dc3545;
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        padding: 0 6px;
        line-height: 1.5;
    }

    .remove-client-btn:hover {
        background-color: #c82333;
    }
</style>

  