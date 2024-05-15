<template>
  <div
    class="relative w-full overflow-hidden rounded-t-[80px] bg-[#fff5f5] py-[100px]"
  >
    <div class="absolute -left-20 -top-20 opacity-80">
      <img
        src="../../assets/img/member/blur/lg.png"
        alt=""
      >
    </div>
    <div class="m-auto max-w-custom-container">
      <h2 class="text-[40px] font-bold text-primary-dark">
        精選會員
      </h2>
      <div class="my-[60px] grid grid-cols-2 gap-6">
        <div
          class="shadow-primary-light-800/10 border-real-transparent card-border flex rounded-lg border-2 bg-white shadow transition duration-150 ease-in-out"
        >
          <div class="shrink-0">
            <img
              class="rounded-l-lg"
              src="../../assets/img/member/Image01.png"
              alt=""
            >
          </div>
          <div class="flex w-full flex-col justify-between p-5">
            <div class="mb-3 flex items-center justify-between">
              <p class="text-start text-2xl font-bold leading-7 text-zinc-950">
                Lisa
              </p>
              <span class="text-xl text-primary-dark">
                <icon-heroicons-star />
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
            <div class="flex justify-end gap-3">
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
        <div
          class="shadow-primary-light-800/10 border-real-transparent card-border flex rounded-lg border-2 bg-white shadow transition duration-150 ease-in-out"
        >
          <div class="shrink-0">
            <img
              class="rounded-l-lg"
              src="../../assets/img/member/Image02.png"
              alt=""
            >
          </div>
          <div class="flex w-full flex-col justify-between p-5">
            <div class="mb-3 flex items-center justify-between">
              <p class="text-start text-2xl font-bold leading-7 text-zinc-950">
                Mike
              </p>
              <span class="text-xl text-primary-dark">
                <icon-heroicons-star />
              </span>
            </div>
            <div class="">
              <div class="mb-1 flex gap-3 text-zinc-600">
                <p>31 歲</p>
              </div>
              <div class="flex gap-3 text-zinc-600">
                <p>台南</p>
                <p>工程師</p>
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
                <li># 年薪百萬</li>
              </ul>
            </div>
            <div class="flex justify-end gap-3">
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
    </div>
    <button class="btn-textOrIcon-lg mx-auto">
      <p>查看更多</p>
      <icon-heroicons:arrow-right />
    </button>
  </div>
</template>
