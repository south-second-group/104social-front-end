<script setup>
const items = ref([
  'http://localhost:8001/_nuxt/assets/img/member/Image03.png',
  'http://localhost:8001/_nuxt/assets/img/member/Image03.png',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
])

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)
</script>

<template>
  <div>
    <USkeleton
      v-if="isLoading"
      class=" mx-auto mt-4 h-[300px] w-[250px] "
    />

    <UCarousel
      v-show="!isLoading"
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
          class="  card-hover size-14 justify-center overflow-hidden !rounded-lg border-2 border-white bg-white p-0 !shadow-none"
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
  </div>
</template>
