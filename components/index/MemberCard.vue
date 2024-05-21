<script setup lang="ts">
const isCheck01 = ref(false)
</script>

<template>
  <div class="me-6 text-center md:me-0">
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
            <p class="text-start text-xl font-bold  leading-7 text-zinc-950 md:text-2xl">
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
</template>
