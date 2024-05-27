<template>
  <div class="container mt-20">
    <div class="grid grid-cols-6 gap-x-6">
      <p class="text-H3 col-span-4 col-start-2 mb-10 text-start">
        站內通知
      </p>
      <ul class="col-span-4 col-start-2 mb-6 flex">
        <li
          class="text-B2 border-2 border-transparent border-b-primary-dark px-4 py-2 text-zinc-400 focus:text-primary-dark"
        >
          全部通知
        </li>
        <li class="text-B2 border-2 border-transparent px-4 py-2 text-zinc-400 focus:text-primary-dark">
          邀約通知
        </li>
        <li class="text-B2 border-2 border-transparent px-4 py-2 text-zinc-400 focus:text-primary-dark">
          系統通知
        </li>
      </ul>
      <div class="col-span-4 col-start-2 ">
        <ul class="flex flex-col gap-3">
          <li class="flex rounded-md bg-[#F5F5F5] p-3 pe-[28px] md:p-0 md:pe-0">
            <div class="hidden px-[25.5px] py-[15px] md:block">
              <UBadge
                :ui="{ rounded: 'rounded-full' }"
                class="bg-primary-dark"
              >
                NEW
              </UBadge>
            </div>
            <div class="ms-[30px] flex flex-col md:ms-0 md:w-full md:flex-row md:items-center md:justify-between">
              <div class="relative">
                <div class="absolute -start-[23px] top-2 size-1.5 rounded-full bg-primary-dark md:hidden"></div>
                <p class="mb:text-base line-clamp-1 text-sm font-bold text-zinc-950">
                  快來查看本周由系統為您推薦的對象
                </p>
              </div>
              <p class="mt-1 text-xs text-zinc-400 md:mt-0 md:w-[90px] md:ps-3">
                2 分鐘前
              </p>
            </div>
          </li>
          <li class="flex rounded-md bg-[#F5F5F5] p-3 pe-[28px] md:p-0 md:pe-0">
            <div class="hidden px-[25.5px] py-[15px] md:block">
              <UBadge
                :ui="{ rounded: 'rounded-full' }"
                class="bg-primary-dark"
              >
                NEW
              </UBadge>
            </div>
            <div class="ms-[30px] flex flex-col md:ms-0 md:w-full md:flex-row md:items-center md:justify-between">
              <div class="relative">
                <div class="absolute -start-[23px] top-2 size-1.5 rounded-full bg-primary-dark md:hidden"></div>
                <p class="mb:text-base line-clamp-1 text-sm font-bold text-zinc-950">
                  Tina 同意了你的邀約，快來跟她聊聊
                </p>
              </div>
              <p class="mt-1 text-xs text-zinc-400 md:mt-0 md:w-[90px] md:ps-3">
                4 小時前
              </p>
            </div>
          </li>
          <li class="flex rounded-md bg-[#F5F5F5] p-3 pe-[28px] md:p-0 md:pe-0">
            <div class="hidden px-[25.5px] py-[15px] md:block">
              <UBadge
                :ui="{ rounded: 'rounded-full' }"
                class="bg-primary-dark opacity-0"
              >
                NEW
              </UBadge>
            </div>
            <div class="ms-[30px] flex flex-col md:ms-0 md:w-full md:flex-row md:items-center md:justify-between">
              <div class="relative">
                <div class="absolute -start-[23px] top-2 size-1.5 rounded-full bg-primary-dark opacity-0 md:hidden">
                </div>
                <p class="mb:text-base line-clamp-1 text-sm text-zinc-600">
                  快來查看本周由系統為您推薦的對象
                </p>
              </div>
              <p class="mt-1 text-xs text-zinc-400 md:mt-0 md:w-[90px] md:ps-3">
                3/14
              </p>
            </div>
          </li>
          <li class="flex rounded-md bg-[#F5F5F5] p-3 pe-[28px] md:p-0 md:pe-0">
            <div class="hidden px-[25.5px] py-[15px] md:block">
              <UBadge
                :ui="{ rounded: 'rounded-full' }"
                class="bg-primary-dark opacity-0"
              >
                NEW
              </UBadge>
            </div>
            <div class="ms-[30px] flex flex-col md:ms-0 md:w-full md:flex-row md:items-center md:justify-between">
              <div class="relative">
                <div class="absolute -start-[23px] top-2 size-1.5 rounded-full bg-primary-dark opacity-0 md:hidden">
                </div>
                <p class="mb:text-base line-clamp-1 text-sm text-zinc-600">
                  您的會員方案已更動，請確認以下服務內容及會員權益。
                </p>
              </div>
              <p class="mt-1 text-xs text-zinc-400 md:mt-0 md:w-[90px] md:ps-3">
                3/10
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
