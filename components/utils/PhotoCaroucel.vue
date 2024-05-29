<script setup>
const items = ref([
  'https://s3-alpha-sig.figma.com/img/71bc/45d0/95bbdebcb0e970acd3742fed807cad15?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dzC92pa9Bu-1GNFO~C1gW8MO5K7LC6V3umbTX2O3BChkQ-2So9XcMaw~WUZHBBZwfXSCudlvMd9fsD0w1AeQDgOOOm36s7DLszl3cmWjo9AnFst-6WulhW-8Ko7GnZ2KVQZaxkovxA-hML3G2fpl5e~vWoSvuY3b9xs~pwIaD-kU7W5Gcn7c0kqfp4HLasA1zTbn9I~H5mRpZ5zqVASrec0~zHf0xTCfWm~bMAXxmNPb2JbopNWoKTPA17Tl03gfVDhe9teVOB-U~rj-36DoNi8I592B7gqrmwKCuIES1q98UMdxwaUNLLg~7Hmje0f~IMdxTVffZakODb3w9H2GGQ__',
  'https://s3-alpha-sig.figma.com/img/990c/b550/ea2830a595687efdd753cc1a7c02a7d3?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DJNDLxWZkrDsBmUArsjRaTa3TPQ2P9P3XYCASgdgW0Vr7H2yRqOQ8n-c-6WuqXD5~R0JqW-VlkviM5prLlmB3fqwzwEQ2kIbzM553jmTrr4EArJh-E56UXvlLfX4VIqMqMFJlNQHwJvgmzTbMl9zVyNM0Zkul8NcapXitvv2LBZfQJ5HU7olepuAJVM-ZDcxXdVPphm4RsFGr~8glHQlDp2VdFkPttk2JERhkAQAe-DID159UwSLqSKcfeIVT5L7h1wlDquw9GjkmNof7Jnc2W3dkDIF5ZZsH0WPfXpgPtq3tzz5wFjKH5RXhZSn~9AbDZbSIorcpBMkEF4Djly00Q__',
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
