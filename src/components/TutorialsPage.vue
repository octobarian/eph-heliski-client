<template>
    <div id="drawer" class="row">
        <AddTutorial style="margin-right: -80px;" class="col"></AddTutorial>
        <TutorialsList class="col"></TutorialsList>
    </div>
</template>
  
<script>
    import AddTutorial from "./AddTutorial.vue"
    import TutorialsList from "./TutorialsList.vue"

    export default {
    name: "tutorials-page",
    components: {
        AddTutorial,
        TutorialsList,
    },
    data() {
        return {
        };
    },
    methods: {
        
    },
    mounted() {
        
    }
    };
</script>

<style>
</style>
  