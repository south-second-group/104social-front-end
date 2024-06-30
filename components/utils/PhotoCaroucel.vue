<script setup>
const props = defineProps({
  photoDetails: Object,
})

const items = ref([
  props.photoDetails.photo,
  'https://plus.unsplash.com/premium_photo-1682091872078-46c5ed6a006d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1617243876873-6cea4ea0b4eb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1672418281793-050e1028ba69?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
])
</script>

<template>
  <UCarousel
    size="xl"
    :arrows="true"
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'rounded-lg mt-0',
      indicators: {
        wrapper: 'relative -bottom-5 ',
      },
    }"
    indicators
    class="mx-auto w-64"
  >
    <template #default="{ item }">
      <img
        :src="item"
        class="w-full object-contain"
        draggable="false"
      >
    </template>
    <template #indicator="{ onClick, page, active }">
      <UButton
        :label="String(page)"
        :variant="active ? 'solid' : 'outline'"
        size="2xs"
        class="card-hover size-14 justify-center overflow-hidden !rounded-lg border-2 border-white bg-white p-0 !shadow-none"
        :class="{ 'card-active ': active }"
        @click="onClick(page)"
      >
        <img
          :src="items[page - 1]"
          class="size-full object-cover"
          draggable="false"
        >
      </UButton>
    </template>
  </UCarousel>
</template>
