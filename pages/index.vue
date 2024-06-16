<script setup>
import { appDescription, appKeywords, appName } from '@/constants'

useHead({
  meta: [
    { name: 'title', content: appName },
    { name: 'description', content: appDescription },
    { name: 'keywords', content: appKeywords },
    { property: 'og:title', content: appName },
    { property: 'og:description', content: appDescription },
    { property: 'og:image', content: '../assets/img/logo.png' },
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
