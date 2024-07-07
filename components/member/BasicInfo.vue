<script setup>
const memberStore = useMemberStore()
const userDataStore = useUserDataStore()

// 功能按鈕
const functionButtonsList = [
  {
    title: '配對設定',
    path: '/member/match',
  },
  {
    title: '我的約會',
    path: '/member/invite',
  },
  {
    title: '配對結果',
    path: '/member/match/MatchResult',
  },
  {
    title: '我留下的評價',
    path: '/member/comment',
  },
  {
    title: '我的收藏',
    path: '/member/collection',
  },
  {
    title: '拒絕來信',
    path: '/member/banlist',
  },
]
</script>

<template>
  <section class="container mt-12 space-y-4 lg:flex lg:space-x-6 lg:space-y-0">
    <!-- 基本資料 -->
    <div class="flex w-full items-center space-x-6 rounded-[10px] bg-[#FFF5F5] p-4 lg:p-6">
      <div class="size-[100px] shrink-0 overflow-hidden rounded-full lg:size-[120px]">
        <NuxtImg
          v-if="memberStore.previewImage || memberStore.personalPhoto.photo"
          :src="memberStore.previewImage || memberStore.personalPhoto.photo"
          alt="UserSticker Image"
          class="size-full object-cover"
        />
        <USkeleton
          v-else
          class="size-full"
          :ui="{ rounded: 'rounded-full' }"
        />
      </div>

      <div class="flex flex-col justify-center text-left">
        <h6
          class="lg:text-H4 text-xl font-bold text-primary-dark"
        >
          {{ memberStore.basicInfo.name }}
        </h6>
        <p
          class="mt-1 block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
        >
          {{ memberStore.basicInfo.email }}
        </p>
      </div>
    </div>

    <!-- 會員狀態 -->
    <div class=" flex w-full items-end justify-between rounded-[10px] bg-neutral-100 p-4 text-left lg:p-6">
      <ul class="">
        <li class="flex">
          <h4 class="text-B2 mb-4 text-[#52525B]">
            會員評價｜
          </h4>
          <b>{{ memberStore.basicInfo.rating }}</b>
        </li>

        <li class="flex">
          <h4 class="text-B2 mb-4 text-[#52525B]">
            配對狀態｜
          </h4>
          <b>{{ memberStore.basicInfo.isMatch === false ? "尚未配對" : "配對中" }}</b>
        </li>

        <li class="flex">
          <h4 class="text-B2 mb-4 text-[#52525B]">
            剩餘點數｜
          </h4>
          <b>{{ memberStore.basicInfo.point }} 點</b>
        </li>

        <li class="flex">
          <h4 class="text-B2 mb-4 text-[#52525B]">
            訂閱狀態｜
          </h4>
          <b>{{ userDataStore.isSubscribe ? "訂閱中" : "尚未訂閱" }}</b>
        </li>
      </ul>

      <router-link to="/order/OrderList">
        <GradientButton class="m-[2px] px-4 py-2 lg:py-2 xl:px-5">
          <GradientButtonText
            text="儲值"
            class="text-sm lg:text-base"
          />
        </GradientButton>
      </router-link>
    </div>

    <!-- 功能按鈕 -->
    <div class="grid w-full grid-flow-col grid-rows-3 gap-x-6 gap-y-2 ">
      <router-link
        v-for="(button) in functionButtonsList"
        :key="button.title"
        :to="button.path"
        class="flex items-center justify-center rounded-full bg-gray-200 py-3 font-bold duration-300 ease-in-out active:scale-75 lg:h-12 lg:hover:opacity-70"
      >
        {{ button.title }}
      </router-link>
    </div>
  </section>
</template>
