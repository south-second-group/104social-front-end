<script setup>
import {
  appDescription,
  appKeywordArray,
  appKeywords,
  appName,
} from '@/constants'

useHead({
  meta: [
    {
      name: 'google-site-verification',
      content: 'zs_wqfJ13a7s9kJIrbJRRq5NGh1k4XRgoIFSbIou360',
    },
    { name: 'title', content: appName },
    { name: 'description', content: appDescription },
    { name: 'keywords', content: appKeywords },
    { property: 'og:title', content: appName },
    { property: 'og:description', content: appDescription },
    { property: 'og:image', content: '~/assets/img/logo.png' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': '104緣來如此',
        'alternateName': appKeywordArray,
        'url': process.env.BASE_API_URL,
      }),
      json: true,
    },
  ],
  link: [{ rel: 'icon', href: '../public/favicon.ico' }],
})
</script>

<template>
  <h1 class="sr-only">
    104緣來如此
  </h1>
  <!-- SEO搜尋結果大圖 -->
  <NuxtImg
    src="https://console.firebase.google.com/u/0/project/my-first-project-1110913/storage/my-first-project-1110913.appspot.com/files/~2F104social"
    alt="Banner_sm"
    class="sr-only size-full max-w-[300px]"
  />
  <indexBanner />
  <indexSelectedMembers />
  <indexArticles />
  <indexStory />
  <indexSubmitStory />
  <indexCallToAction />
</template>
