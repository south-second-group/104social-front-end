<script setup>
const props = defineProps(['cover', 'title', 'sub'])
const { cover, title, sub } = props

const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <div
    class="px-4 pb-4"
    :class="{ 'linear-border-bottom': !isDesktop }"
  >
    <NuxtImg
      :src="`/story/${cover}.png`"
      alt=""
      class="mx-auto size-[180px] rounded-xl object-cover"
    />
    <div class="mt-2 px-3 md:mt-4">
      <p
        class="mb-1 line-clamp-2 bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-xl font-bold text-transparent md:mb-2 md:text-2xl"
      >
        {{ title }}
      </p>
      <p class="line-clamp-3 text-start text-base text-zinc-600 md:text-xl">
        {{ sub }}
      </p>
    </div>
  </div>
</template>
