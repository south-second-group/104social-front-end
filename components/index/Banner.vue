<script setup>
import SearchCard from './SearchCard.vue'
</script>

<template>
  <div class="relative h-screen w-full overflow-x-hidden">
    <div class="absolute z-50 size-full">
      <SearchCard />
    </div>
    <div class="absolute top-0 z-30 w-full overflow-hidden">
      <div class="flex h-screen items-center justify-between">
        <div class="-ms-[108px]">
          <img
            src="../../assets/img/banner/banner-1.png"
            alt=""
          >
        </div>
        <div class="-me-[208px] flex gap-20">
          <div class="">
            <img
              src="../../assets/img/banner/banner-2.png"
              alt=""
            >
          </div>
          <div class="">
            <img
              src="../../assets/img/banner/banner-3.png"
              alt=""
            >
          </div>
          <div class="">
            <img
              src="../../assets/img/banner/banner-4.png"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>

    <div class="absolute left-10 top-12 opacity-70">
      <img
        src="../../assets/img/banner/blur/bg-1.png"
        alt=""
      >
    </div>
    <div class="absolute left-1/3 opacity-70">
      <img
        src="../../assets/img/banner/blur/bg-2.png"
        alt=""
      >
    </div>
    <div class="absolute -right-28 opacity-70">
      <img
        src="../../assets/img/banner/blur/bg-3.png"
        alt=""
      >
    </div>
  </div>
</template>
