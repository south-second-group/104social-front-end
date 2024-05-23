<script lang="ts" setup>
const props = defineProps<{
  status: string
  click?: () => void
}>()

const text = computed(() => {
  switch (props.status) {
    case 'status1':
      return '已解鎖評價'
    case 'status2':
      return '收回邀約'
    default:
      return ''
  }
})
</script>

<template>
  <div class="">
    <button class="btn-withIcon-outline md:scale-100 scale-90 " @click="props.click">
      <icon-heroicons:lock-open v-if="status === 'status1'" />
      <icon-heroicons:heart v-if="status === 'status2'" />

      <p>{{ text }}</p>
    </button>
  </div>
</template>

<style scoped></style>
