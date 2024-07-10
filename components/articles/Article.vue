<script setup>
const props = defineProps(['cover', 'title', 'sub', 'id'])
const { cover, title, sub, id } = props

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
  <NuxtLink
    :to="`/articles/${id}`"
    class="px-4 pb-4"
    :class="{ 'linear-border-bottom': !isDesktop }"
  >
    <NuxtImg
      :src="`/article/${cover}.png`"
      alt=""
      class="h-[160px] w-full rounded-xl object-cover md:h-[300px]"
    />
    <div class="mt-2 px-3 text-start md:mt-4">
      <p
        class="mb-1 line-clamp-2 text-xl font-bold text-zinc-950 md:mb-2 md:text-2xl"
      >
        {{ title }}
      </p>
      <p class="line-clamp-3 text-base text-zinc-600 md:text-xl">
        {{ sub }}
      </p>
    </div>
  </NuxtLink>
</template>
