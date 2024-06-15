<template>
    <transition name="fade">
      <span v-if="visible" class="saved-message">Saved!</span>
    </transition>
  </template>
  
  <script>
  export default {
    name: "SavedMessage",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .saved-message {
    position: absolute;
    bottom: 40px;
    right: 5px;
    color: blue;
    font-weight: bold;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  }
  
  .saved-message-enter-active,
  .saved-message-leave-active {
    transition: all 0.5s;
  }
  
  .saved-message-enter,
  .saved-message-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>
  