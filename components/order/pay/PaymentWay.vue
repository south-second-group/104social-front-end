<script setup>
const orderStore = useOrderStore()
</script>

<template>
  <div class="PaymentWay">
    <div class="relative mb-4 me-0 max-w-full rounded-xl bg-neutral-100 p-4 lg:p-6">
      <div class="mb-6 border-b-2 border-x-neutral-300 pb-3 text-[20px] font-bold text-neutral-400">
        付款方式
      </div>
      <div>
        <URadioGroup
          v-model="orderStore.selectedPayment"
          :options="orderStore.paymentOptions"
        >
          <template #label="{ option }">
            <p class="text-B2 mb-2 text-zinc-900">
              {{ option.label }}
            </p>
          </template>
        </URadioGroup>
      </div>
    </div>
  </div>
</template>
