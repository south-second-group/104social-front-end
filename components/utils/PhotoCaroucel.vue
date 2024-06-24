<script setup>
const props = defineProps({
  photoDetails: Object,
})

const items = ref([
  props.photoDetails.photo,
  'https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2F1716519560969.jpg?alt=media&token=eb42f638-6328-48a8-a151-ef0d55970ffc',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
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
