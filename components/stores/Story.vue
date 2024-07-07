<script setup>
const props = defineProps({
  cover: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,

  },
  sub: {
    type: String,
    required: true,
  },
  exampleId: {
    type: String,
    required: true,
  },
})

// const props = defineProps(['cover', 'title', 'sub'])

useHead({
  title: '找案例',
})

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
  <NuxtLink
    :to="`/stores/story/${exampleId}`"
    class="rounded-xl bg-neutral-50 p-4 shadow-neutral-L2 lg:hover:bg-neutral-200"
    :class="{ 'linear-border-bottom': !isDesktop }"
  >
    <NuxtImg
      :src="cover"
      alt=""
      class="mx-auto size-[180px] rounded-xl object-cover"
    />
    <div class="mt-2 px-3 md:mt-4">
      <p
        class="mb-1 line-clamp-2 bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-xl font-bold text-transparent md:mb-2 md:text-2xl"
      >
        {{ title }}
      </p>
      <p
        class="line-clamp-3 text-start text-base text-zinc-600 md:text-xl"
        v-html="sub"
      >
      </p>
    </div>
  </NuxtLink>
</template>
