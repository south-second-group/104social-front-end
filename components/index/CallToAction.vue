<script setup>
const userDataStore = useUserDataStore()
const { userData } = storeToRefs(userDataStore)
</script>

<template>
  <div
    v-show="userData"
    class="w-full bg-[url('@/public/callToAction/bg-sm.png')] bg-cover py-12 md:bg-[url('@/public/callToAction/bg-lg.png')] md:py-[100px]"
  >
    <div class="container flex flex-col">
      <p
        class="bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-2xl font-bold leading-[28.8px] text-transparent md:text-[56px] md:leading-[67.2px]"
      >
        儲值方案
      </p>
      <NuxtImg
        src="/callToAction/img-lg02.png"
        alt=""
        class="mx-auto w-[300px] md:w-[300px]"
      />
      <NuxtLink to="/order/OrderList">
        <button class="btn-linear-lg mx-auto mt-6 hidden md:mt-20 md:block">
          <p>查看儲值方案</p>
        </button>
        <button
          class="btn-linear-nav mx-auto mt-6 block h-[40px] min-w-[303px] md:mt-20 md:hidden"
        >
          <p>查看儲值方案</p>
        </button>
      </NuxtLink>
    </div>
  </div>
  <div
    v-show="!userData"
    class="w-full bg-[url('@/public/callToAction/bg-sm.png')] bg-cover py-12 md:bg-[url('@/public/callToAction/bg-lg.png')] md:py-[100px]"
  >
    <div class="container flex flex-col lg:grid lg:grid-cols-2">
      <div class="col-span-1 py-20">
        <div class="w-full">
          <p
            class="bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-2xl font-bold leading-[28.8px] text-transparent md:text-[56px] md:leading-[67.2px]"
          >
            最誠實的線上相親服務
          </p>
          <div class="mt-3 flex justify-center md:mt-6">
            <p class="me-10 text-xl font-bold md:text-[40px]">
              先做自己
            </p>
            <p class="text-xl font-bold md:text-[40px]">
              再找對象
            </p>
          </div>
        </div>
        <NuxtLink to="/login">
          <button class="btn-linear-lg mx-auto mt-6 hidden md:mt-20 md:block">
            <p>立即註冊</p>
          </button>
          <button
            class="btn-linear-nav mx-auto mt-6 block min-w-[303px] md:mt-20 md:hidden"
          >
            <p>立即註冊</p>
          </button>
        </NuxtLink>
      </div>
      <div class="col-span-1 flex items-center justify-center">
        <NuxtImg
          src="/callToAction/img-lg01.png"
          alt=""
          class="w-[300px] md:w-[450px]"
        />
      </div>
    </div>
  </div>
</template>
