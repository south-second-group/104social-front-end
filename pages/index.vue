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
    src="https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2F104%E7%B7%A3%E4%BE%86%E5%A6%82%E6%AD%A4-%E5%B0%81%E9%9D%A2.png?alt=media&token=3f17c7e4-a691-46f5-9943-5b953ccef2af"
    alt="104緣來如此首頁"
    class=" absolute left-0 top-0 w-[300px] -translate-x-full"
  />
  <img
    src="https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2F104%E7%B7%A3%E4%BE%86%E5%A6%82%E6%AD%A4-%E5%B0%81%E9%9D%A2.png?alt=media&token=3f17c7e4-a691-46f5-9943-5b953ccef2af"
    alt="104緣來如此首頁"
    class=" absolute left-0 top-0 w-[300px] -translate-x-full"
  >
  <indexBanner />
  <indexSelectedMembers />
  <indexArticles />
  <indexStory />
  <indexSubmitStory />
  <indexCallToAction />
</template>
