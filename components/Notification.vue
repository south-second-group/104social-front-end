<template>
  <ul class="flex flex-col gap-3">
    <li class="flex bg-[#F5F5F5] rounded-md p-3 md:p-0 pe-[28px] md:pe-0">
      <div class="py-[15px] px-[25.5px] hidden md:block">
        <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-primary-dark">NEW</UBadge>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center md:w-full ms-[30px] md:ms-0">
        <div class="relative">
          <div class="bg-primary-dark h-1.5 w-1.5 rounded-full absolute top-2 -start-[23px] md:hidden"></div>
          <p class="font-bold text-sm mb:text-base text-zinc-950 line-clamp-1">快來查看本周由系統為您推薦的對象</p>
        </div>
        <p class="text-xs text-zinc-400 mt-1 md:mt-0 md:w-[90px] md:ps-3">2 分鐘前</p>
      </div>
    </li>
    <li class="flex bg-[#F5F5F5] rounded-md p-3 md:p-0 pe-[28px] md:pe-0">
      <div class="py-[15px] px-[25.5px] hidden md:block">
        <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-primary-dark">NEW</UBadge>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center md:w-full ms-[30px] md:ms-0">
        <div class="relative">
          <div class="bg-primary-dark h-1.5 w-1.5 rounded-full absolute top-2 -start-[23px] md:hidden"></div>
          <p class="font-bold text-sm mb:text-base text-zinc-950 line-clamp-1">Tina 同意了你的邀約，快來跟她聊聊</p>
        </div>
        <p class="text-xs text-zinc-400 mt-1 md:mt-0 md:w-[90px] md:ps-3">4 小時前</p>
      </div>
    </li>
    <li class="flex bg-[#F5F5F5] rounded-md p-3 md:p-0 pe-[28px] md:pe-0">
      <div class="py-[15px] px-[25.5px] hidden md:block">
        <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-primary-dark opacity-0">NEW</UBadge>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center md:w-full ms-[30px] md:ms-0">
        <div class="relative">
          <div class="bg-primary-dark opacity-0 h-1.5 w-1.5 rounded-full absolute top-2 -start-[23px] md:hidden"></div>
          <p class="text-sm mb:text-base text-zinc-600 line-clamp-1">快來查看本周由系統為您推薦的對象</p>
        </div>
        <p class="text-xs text-zinc-400 mt-1 md:mt-0 md:w-[90px] md:ps-3">3/14</p>
      </div>
    </li>
    <li class="flex bg-[#F5F5F5] rounded-md p-3 md:p-0 pe-[28px] md:pe-0">
      <div class="py-[15px] px-[25.5px] hidden md:block">
        <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-primary-dark opacity-0">NEW</UBadge>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between md:items-center md:w-full ms-[30px] md:ms-0">
        <div class="relative">
          <div class="bg-primary-dark opacity-0 h-1.5 w-1.5 rounded-full absolute top-2 -start-[23px] md:hidden"></div>
          <p class="text-sm mb:text-base text-zinc-600 line-clamp-1">您的會員方案已更動，請確認以下服務內容及會員權益。</p>
        </div>
        <p class="text-xs text-zinc-400 mt-1 md:mt-0 md:w-[90px] md:ps-3">3/10</p>
      </div>
    </li>
    
  </ul>
</template>
