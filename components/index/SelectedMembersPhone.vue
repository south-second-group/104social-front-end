<script setup lang="ts">
const isCheck01 = ref(false)
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
    :items="items"
  >
    <div class="mx-auto me-6 text-center">
      <div
        class="shadow-primary-light-800/10 border-real-transparent card-border mx-auto w-[300px] rounded-lg border-2 bg-white shadow transition duration-150 ease-in-out lg:flex lg:w-full"
      >
        <div class="shrink-0">
          <NuxtImg
            src="/member/member-lg-01.png"
            alt="banner_image"
            class="hidden w-[200px]   rounded-l-lg lg:block"
          />
          <NuxtImg
            src="/member/member-sm-01.png"
            alt="banner_image"
            class="w-[300px] rounded-t-lg lg:hidden"
          />
        </div>
        <div class="flex w-full flex-col justify-between p-5">
          <div class="mb-3">
            <div class="mb-2 flex justify-between">
              <p class="text-start text-2xl font-bold leading-7 text-zinc-950">
                Lisa
              </p>
              <span class="text-xl text-primary-dark">
                <CollectionBtn v-model="isCheck01" />
              </span>
            </div>
            <div class="">
              <div class="mb-1 flex gap-3 text-zinc-600">
                <p>28 歲</p>
                <p>167 cm</p>
              </div>
              <div class="flex gap-3 text-zinc-600">
                <p>房仲業</p>
              </div>
              <div class="my-3 flex items-center">
                <span class="text-xl text-amber-400">
                  <icon-heroicons-star-solid />
                </span>
                <p class="ms-2 text-sm text-zinc-400">
                  評分 4.6 (12)
                </p>
              </div>
              <ul class="flex gap-3 text-primary-dark">
                <li># 婚後自住</li>
                <li># 不生小孩</li>
              </ul>
            </div>
          </div>
          <div class="flex justify-center gap-3 lg:justify-end">
            <button class="btn-withIcon-outline">
              <icon-heroicons:lock-open />
              <p>解鎖評價</p>
            </button>
            <button class="btn-withIcon-fill">
              <icon-heroicons:heart />
              <p>邀約</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </UCarousel>
</template>
