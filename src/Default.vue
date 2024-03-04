<!-- DEFAULT HOME ROUTE, CHANGES COMPONENT BASED ON THE ROLE SET IN THE USER SESSION -->
<template>
    <div class="default">
        <GreetingGuide v-if="role=='guide'"/>
        <GreetingOffice v-else-if="role=='office'"/>
        <div v-else>You Have No Role, Contact your system administrator to ensure you have the proper access to mechski</div>
    </div>
  </template>
  <script>
  import GreetingGuide from './components/Greeting-Guide.vue';
  import GreetingOffice from './components/Greeting-Office.vue';

 

  export default {
    name: 'Default',
    components: {
        GreetingGuide,
        GreetingOffice
    },
    data() {
        return {
            role: null,
        }
    },
    mounted(){
         //check user session for their current role, use this to decide which dashboard to show
        this.role = sessionStorage.getItem("role");
    },
  };
  </script>
  <style>
  
  </style>