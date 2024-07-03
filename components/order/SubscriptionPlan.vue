<script setup>
const orderStore = useOrderStore()

async function createSubscriptionOrder() {
  await orderStore.subscriptionCheckout()
}

// const shaCode = ref('')

// onMounted(async () => {
//   const data = await orderStore.createSubscriptionOrder()
//   shaCode.value = data
// })
</script>

<template>
  <div class="col-span-12 md:col-span-4 lg:col-span-3">
    <div class="relative mb-4 rounded-xl bg-primary-light p-4 lg:mb-6 lg:p-6">
      <p class="mb-2 text-[16px] font-bold text-primary-dark lg:text-[20px]">
        訂閱方案
      </p>
      <div class="mb-4">
        <span class="text-H3 font-bold">$99</span>
        <span class="text-B1 text-neutral-400"> / 月</span>
      </div>

      <button
        class="btn-withIcon-outline mb-4 h-12 w-full lg:mb-6"
        type="button"
        @click="createSubscriptionOrder"
      >
        <p>立即訂閱</p>
      </button>
      <div class=" rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A]">
        <p class="sm:text-B3 pb-2 font-bold text-neutral-400">
          媒合成功率超高
        </p>
        <p class="sm:text-B3 text-neutral-600">
          平台獨家功能、更多曝光機會
        </p>
      </div>
    </div>
  </div>
</template>
