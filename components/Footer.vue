<template>
  <div class="w-full">
    <div class="container my-12 flex flex-col justify-between md:my-20 md:flex-row">
      <div class="">
        <div class="mb-4">
          <NuxtImg
            src="/logo.png"
            alt="104 緣來如此"
            class="mx-auto w-[144px] md:mx-0 lg:w-[192px]"
          />
        </div>
        <ul class="mt-2 flex flex-col justify-center gap-3 text-sm font-bold text-zinc-600 md:mt-0 md:flex-row md:justify-start md:text-base ">
          <li class="p-3 text-center">
            常見問答
          </li>
          <li class="p-3 text-center">
            使用條款
          </li>
          <li class="p-3 text-center">
            隱私中心
          </li>
          <li class="p-3 text-center">
            關於我們
          </li>
        </ul>
      </div>
      <ul class="mt-6 flex self-center text-sm text-zinc-600 md:mt-0 md:self-end">
        <li class="p-3">
          Facebook
        </li>
        <li class="p-3">
          Instagram
        </li>
        <li class="p-3">
          Threads
        </li>
        <li class="p-3">
          X
        </li>
      </ul>
    </div>
    <div class="bg-zinc-50 p-5 md:p-10">
      <p class="text-center text-sm md:text-base">
        © 2024 104 緣來如此 All Rights Reserved.
      </p>
    </div>
  </div>
</template>
