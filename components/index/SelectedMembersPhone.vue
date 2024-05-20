<script setup lang="ts">
const items = [{
  name: 'Sébastien Chopin',
  to: 'https://github.com/Atinux',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux' },
}, {
  name: 'Pooya Parsa',
  to: 'https://github.com/pi0',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' },
}, {
  name: 'Daniel Roe',
  to: 'https://github.com/danielroe',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' },
}, {
  name: 'Anthony Fu',
  to: 'https://github.com/antfu',
  avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' },
}]
</script>

<template>
  <UCarousel
    v-slot="{ item, index }"
    :items="items"
    :ui="{ item: 'w-full' }"
  >
    <div class="mx-auto text-center">
      <img
        :src="item.avatar.src"
        :alt="item.name"
        class="mb-2 size-48 rounded-full"
        draggable="false"
      >

      <p class="font-semibold">
        {{ index + 1 }}. {{ item.name }}
      </p>
    </div>
  </UCarousel>
</template>
