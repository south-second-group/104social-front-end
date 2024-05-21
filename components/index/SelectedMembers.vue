<script setup lang="ts">
// const items = [{
//   name: 'Sébastien Chopin',
//   to: 'https://github.com/Atinux',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux' },
// }, {
//   name: 'Pooya Parsa',
//   to: 'https://github.com/pi0',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0' },
// }, {
//   name: 'Daniel Roe',
//   to: 'https://github.com/danielroe',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe' },
// }, {
//   name: 'Anthony Fu',
//   to: 'https://github.com/antfu',
//   avatar: { src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu' },
// }]
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-t-[40px] bg-[#fff5f5] py-12 lg:rounded-t-[80px] lg:py-[100px]">
    <div class="absolute -left-20 -top-20 opacity-80">
      <NuxtImg
        src="/member/blur/lg.png"
        alt="banner_image"
        class="w-[242px]"
      />
    </div>
    <div class="container relative z-50 m-auto">
      <p class="text-H4 mb-6 font-bold text-primary-dark md:hidden lg:mb-0">
        精選會員
      </p>
      <p class="text-H2 mb-6 hidden font-bold text-primary-dark md:block lg:mb-0">
        精選會員
      </p>

      <UCarousel
        class="block md:hidden"
      >
        <div class="mx-auto text-center">
          <indexMemberCard />
        </div>
      </UCarousel>

      <div class="my-[60px] hidden grid-cols-2 gap-6 md:grid">
        <indexMemberCard />
        <indexMemberCard />
        <indexMemberCard />
        <indexMemberCard />
      </div>
    </div>
    <div class="lg:hidden">
      <button class="btn-textOrIcon-sm mx-auto mt-6">
        <p>查看更多</p>
        <icon-heroicons:arrow-right />
      </button>
    </div>
    <div class="hidden lg:block">
      <button class="btn-textOrIcon-lg mx-auto mt-6 ">
        <p>查看更多</p>
        <icon-heroicons:arrow-right />
      </button>
    </div>
  </div>
</template>
