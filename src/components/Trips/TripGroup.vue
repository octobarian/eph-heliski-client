<template>
    <div class="trip-group">
        <button class="delete-group-btn" @click="deleteGroup(groupId)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>
        <div class="guide-dropdown">
            <label>Guide:</label>
            <select v-model="selectedGuideId">
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
        <label>Continue till:</label>
        <input type="date" class="continue-till-date">
      </div>
      <div class="clients-section">
        <label>Group Members:</label>
        <div class="client-tags">
          <span v-for="(client, index) in clients" :key="client.reservationid" class="client-tag">
            {{ client.person.firstname }} ({{ client.reservationid }})
            <button class="remove-client-btn" @click="emitRemoveClient(client, index)">x</button>
          </span>
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
      deleteGroup(groupId) {
        this.$emit('deleteGroup', groupId);
      },
      emitRemoveGuide(guide) {
        this.$emit('removeGuide', guide);
      },
      emitRemoveClient(client, index) {
        this.$emit('removeClient', { client, index });
      }
    },
    data() {
        return {
        };
    },
    watch: {

    },
    computed: {
        selectedGuideId: {
            get() {
                // This will get the staffid that matches the guideid of the currently selected guide
                const matchingGuide = this.allGuides.find(guide => guide.staffid === this.guide.guideid);
                return matchingGuide ? matchingGuide.staffid : null;
            },
            set(value) {
                // When a new guide is selected, emit an event with the selected guide's staffid
                this.$emit('update:guide', this.allGuides.find(guide => guide.staffid === value));
            }
        }
    },
  };
  </script>
  
  <style scoped>
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
    border: none;
    border-radius: 4px; /* Rounded corners */
    padding: 4px 8px; /* Smaller padding */
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .guide-section,
  .continue-section {
    margin-bottom: 10px;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
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

  