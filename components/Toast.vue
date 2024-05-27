<script setup>
defineProps({
  toastMessage: {
    type: String,
    default: '',
  },
  toastType: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="Toast flex">
    <div
      v-if="toastMessage"
      class="toast"
      :class="[toastType === 'success' ? 'success' : 'error']"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .toast.show {
    display: block;
  }
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
    display: block;
  }
  .toast.success {
    background-color: #4caf50;
  }
  .toast.error {
    background-color: #f44336;
  }
</style>
