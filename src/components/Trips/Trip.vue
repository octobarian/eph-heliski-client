<!-- TRIP OBJECT, CONTAINS A SINGLE TRIP-->
<!-- TODO: SHOULD BE ABLE TO BE PASSES A TRIP ID, THEN SEARCH THE DB FOR THAT TRIP AND POPULATE THE FORM -->
<template>
    <div class="trip-container">
        <button class="back-button" @click="goBack"> Back </button>
        <h2>Trip #{num}</h2>
        <!-- New Group Info section -->
        <div class="input-section">
            <div class="tags">
            <label>Tags</label>
            <select multiple v-model="selectedGuides">
                <option v-for="guide in guides" :key="guide" :value="guide">{{ guide }}</option>
            </select>
            </div>
            <div class="group">
            <label>Group #</label>
            <select v-model="selectedGroup">
                <option v-for="group in groups" :key="group" :value="group">{{ group }}</option>
            </select>
            </div>
            <div class="pilot">
            <label>Pilot</label>
            <select v-model="selectedPilot">
                <option v-for="pilot in pilots" :key="pilot" :value="pilot">{{ pilot }}</option>
            </select>
            </div>
            <div class="helicopter">
            <label>Helicopter</label>
            <select v-model="selectedHelicopter">
                <option v-for="helicopter in helicopters" :key="helicopter" :value="helicopter">{{ helicopter }}</option>
            </select>
            </div>
        </div>
        <!-- New Runs section -->
        <div class="input-section">
            <div class="run-section">
                <label>Run Name:</label>
                <select v-model="selectedRun">
                    <option v-for="run in runs" :key="run" :value="run">{{ run }}</option>
                </select>
                <button @click="addRun">Add</button>

                <div class="added-runs">
                    <span v-for="runObject in addedRuns" :key="runObject.id">
                    {{ runObject.name }} <button @click="removeRun(runObject.id)">X</button>
                    </span>
                </div>
            </div>
        </div>
        <!-- New Notes section -->
        <div class="input-section">
            <div class="notes-section">
                <label>Group Notes:</label>
                <textarea v-model="notes" placeholder="Placeholder"></textarea>
            </div>
        </div>  
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      //placeholder data, should be changed later when we are recieving data
      num: 1, // Just a placeholder
      runId: 0, // Initialize a run identifier
      guides: ['Guide 1', 'Guide 2'],
      groups: ['#1', '#2', '#3'],
      pilots: ['Pilot 1', 'Pilot 2', 'Pilot 3'],
      helicopters: ['Heli 1', 'Heli 2', 'Heli 3'],
      runs: ['Run 1', 'Run 2', 'Run 3', 'Run 4'],
      //End of placeholder data

      //Form Data, Stored
      selectedRun: '',
      selectedGuides: [],
      selectedGroup: null,
      selectedPilot: null,
      selectedHelicopter: null,
      addedRuns: [],
      notes: ''
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    removeGuide(index) {
      this.guides.splice(index, 1);
    },
    addRun() {
      if (this.selectedRun) {
        this.addedRuns.push({ id: this.runId++, name: this.selectedRun });
        this.selectedRun = ''; // Reset the selection
      }
    },
    removeRun(runIdToRemove) {
      this.addedRuns = this.addedRuns.filter(run => run.id !== runIdToRemove);
    }
  }
};
  </script>
  
  <style scoped>
  .trip-container {
    width: 100%;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
  }
  .back-button {
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
  }
  .input-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
    padding: 10px;
    border: solid;
  }
  .run-section{
    grid-column: span 2;
  }
  .notes-section{
    grid-column: span 2;
  }
  input, select {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  </style>
  