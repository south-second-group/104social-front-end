<script setup>
const props = defineProps({
  toastMessage: {
    type: String,
    default: '',
  },
  toastType: {
    type: String,
    default: '',
  },
  timeOut: {
    type: Number,
    default: 2000,
  },
})

const tempMessage = ref('')

watch(() => props.toastMessage, () => {
  tempMessage.value = props.toastMessage

  setTimeout(() => {
    tempMessage.value = ''
  }, props.timeOut)
}, { immediate: true, deep: true })

const computedToastType = computed(() => {
  return props.toastType || 'info'
})
</script>

<template>
  <transition name="fade">
    <div
      v-if="tempMessage"
      class="Toast flex"
      role="alert"
    >
      <div
        class="toast"
        :class="computedToastType"
      >
        {{ tempMessage }}
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
  top: .2em;
  left: 50%;
  transform: translateX(-50%);

  &.success {
    background-color: #4caf50;
  }

  &.error {
    background-color: #f44336;
  }

  &.warning {
    background-color: orange;
  }

  &.info {
    background-color: #2196f3;
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
