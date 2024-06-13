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
  <transition name="fade">
    <div
      v-if="toastMessage"
      class="Toast flex"
      role="alert"
    >
      <div
        class="toast"
        :class="[toastType === 'success' ? 'success' : 'error']"
      >
        {{ toastMessage }}
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;

  &.success {
    background-color: #4caf50;
  }

  &.error {
    background-color: #f44336;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
