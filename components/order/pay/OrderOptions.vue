<script setup>
const orderStore = useOrderStore()
</script>

<template>
  <div class="col-span-12 md:col-span-4 lg:col-span-3">
    <div class="mb-4 rounded-xl bg-primary-light p-4 lg:mb-6 lg:p-6">
      <p class="mb-4 text-[16px] font-bold text-primary-dark lg:text-[20px]">
        儲值方案
      </p>
      <div class="mb-4 lg:mb-6">
        <span class="text-H3 md:text-H4 font-bold">{{ orderStore.pointsSelected }}</span>
        <span class="text-B1 sm:text-B2 text-neutral-400"> / NTD$ {{ orderStore.totalPrice }}</span>
      </div>

      <div class="mb-4 h-12 w-full rounded-lg border bg-white lg:mb-6">
        <USelectMenu
          v-model="orderStore.pointsSelected"
          :options="orderStore.pointsType"
          placeholder="請選擇要儲值的點數"
          class="text-gray-400"
          size="xl"
          variant="none"
        />
      </div>
      <div
        class="rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A]"
      >
        <p class="sm:text-B3 pb-2 font-bold text-neutral-400">
          提高曝光度
        </p>
        <p class="sm:text-B3 text-neutral-600">
          每100點可被曝光在精選會員
        </p>
      </div>
    </div>
  </div>
</template>
