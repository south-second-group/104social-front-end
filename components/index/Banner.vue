<template>
  <div class="w-full h-screen relative overflow-x-hidden">
    <div class="absolute z-50 w-full h-full">
      <SearchCard />
    </div>
    <div class="absolute z-30 top-0 w-full overflow-hidden">
      <div class="flex justify-between h-screen items-center">
        <div class="-ms-[108px]">
          <img src="../../assets/img/banner/banner-1.png" alt="" />
        </div>
        <div class="flex gap-20 -me-[208px]">
          <div class="">
            <img src="../../assets/img/banner/banner-2.png" alt="" />
          </div>
          <div class="">
            <img src="../../assets/img/banner/banner-3.png" alt="" />
          </div>
          <div class="">
            <img src="../../assets/img/banner/banner-4.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute left-10 top-12 opacity-70">
      <img src="../../assets/img/banner/blur/bg-1.png" alt="" />
    </div>
    <div class="absolute left-1/3 opacity-70">
      <img src="../../assets/img/banner/blur/bg-2.png" alt="" />
    </div>
    <div class="absolute -right-28 opacity-70">
      <img src="../../assets/img/banner/blur/bg-3.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import SearchCard from "./SearchCard.vue";
</script>
