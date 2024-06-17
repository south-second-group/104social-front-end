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
        'name': appName,
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
  <ClientOnly>
    <h1 class="sr-only">
      104緣來如此
    </h1>
    <NuxtImg
      src="/banner/bg-sm.png"
      alt="Banner_sm"
      class="sr-only size-full max-w-[300px]"
    />
    <indexBanner />
    <indexSelectedMembers />
    <indexArticles />
    <indexStory />
    <indexSubmitStory />
    <indexCallToAction />
  </ClientOnly>
</template>
