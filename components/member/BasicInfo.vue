<script setup>
defineProps({
  userNickName: String,
  userId: String,
  rating: String || null,
  isMatch: Boolean,
  point: Number,
})

// 功能按鈕
const functionButtonsList = [
  {
    title: '配對設定',
    path: '/account/match-setting',
  },
  {
    title: '我的約會',
    path: '/account/my-date',
  },
  {
    title: '配對結果',
    path: '/account/match-result',
  },
  {
    title: '我留下的評價',
    path: '/account/my-comment',
  },
  {
    title: '我的收藏',
    path: '/account/my-favorite',
  },
  {
    title: '拒絕來信',
    path: '/account/reject-letter',
  },
]
</script>

<template>
  <section class="container mt-12 space-y-4 lg:flex lg:space-x-6 lg:space-y-0">
    <!-- 基本資料 -->
    <div class="flex w-full space-x-6 rounded-[10px] bg-[#FFF5F5] p-4 lg:p-6">
      <div class="w-[100px] lg:w-[120px]">
        <img
          src="~assets/img/member/memberCentre/UserSticker.png"
          alt="UserSticker Image"
          class="size-full object-cover"
        >
      </div>

      <div class="flex flex-col justify-center text-left">
        <h6
          class="lg:text-H4 text-xl font-bold text-primary-dark"
        >
          <!-- {{ userBasicInfo?.data.nickNameDetails.nickName }} -->
          {{ userNickName }}
        </h6>
        <p
          class="mt-1 block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
        >
          <!-- {{ userBasicInfo?.data.userId }} -->
          {{ userId }}
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
          <b>{{ rating ?? 0 }}</b>
        </li>

        <li class="flex">
          <h4 class="text-B2 mb-4 text-[#52525B]">
            配對狀態｜
          </h4>
          <b>{{ isMatch === false ? "尚未配對" : "配對中" }}</b>
        </li>

        <li class="flex">
          <h4 class="text-B2 mb-4 text-[#52525B]">
            剩餘點數｜
          </h4>
          <b>{{ point }} 點</b>
        </li>
      </ul>

      <button class="btn-linear-nav block">
        儲值
      </button>
    </div>

    <!-- 功能按鈕 -->
    <div class="grid w-full grid-flow-col grid-rows-3 gap-x-6 gap-y-2">
      <button
        v-for="(button) in functionButtonsList"
        :key="button.title"
        class="w1/2 rounded-full bg-gray-200 py-3 font-bold"
      >
        {{ button.title }}
      </button>
    </div>
  </section>
</template>
