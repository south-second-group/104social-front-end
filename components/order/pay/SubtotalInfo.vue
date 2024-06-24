<script setup>
const orderStore = useOrderStore()

function handlePayment() {
  orderStore.checkout()
}
</script>

<template>
  <div class="flex flex-col flex-wrap justify-center">
    <div class="linear-border rounded-xl p-4 lg:p-6">
      <div class="mb-3 flex justify-between border-b-2 border-x-neutral-300 pb-3 font-bold">
        <div class="text-[20px] text-neutral-400">
          小計
        </div>
        <div class="text-H4">
          NTD$ {{ orderStore.totalPrice }}
        </div>
      </div>
      <div class="mt-6">
        <button
          type="button"
          class="btn-linear-md float-end"
          aria-label="Proceed to payment"
          @click="handlePayment"
        >
          <p>立即付款</p>
        </button>
      </div>
    </div>
  </div>
</template>
