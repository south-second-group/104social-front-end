<script setup>
import { appDescription, appKeywords, appName } from '@/constants'

useHead({
  meta: [
    { name: 'google-site-verification', content: 'zs_wqfJ13a7s9kJIrbJRRq5NGh1k4XRgoIFSbIou360' },
    { name: 'title', content: appName },
    { name: 'description', content: appDescription },
    { name: 'keywords', content: appKeywords },
    { property: 'og:title', content: appName },
    { property: 'og:description', content: appDescription },
    { property: 'og:image', content: '~/assets/img/logo.png' },
  ],
})
</script>

<template>
  <ClientOnly>
    <indexBanner />
    <indexSelectedMembers />
    <indexArticles />
    <indexStory />
    <indexSubmitStory />
    <indexCallToAction />
  </ClientOnly>
</template>
