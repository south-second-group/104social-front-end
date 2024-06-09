<script setup>
const props = defineProps(['item'])
const { item } = props
</script>

<template>
  <UBadge
    :ui="{ rounded: 'rounded-full' }"
    class="bg-neutral-200 px-5 py-2 "
  >
    <p class="me-1 text-base text-zinc-900">
      {{ item }}
    </p>
    <icon-heroicons-plus class="size-4 text-zinc-900" />
  </UBadge>
</template>
