<script setup>
const orderStore = useOrderStore()
</script>

<template>
  <div class="relative mb-4 me-0 max-w-full rounded-xl bg-neutral-100 p-4 lg:p-6">
    <div class="mb-6 border-b-2 border-x-neutral-300 pb-3 text-[20px] font-bold text-neutral-400">
      付款資訊
    </div>
    <UFormGroup
      label="Email"
      class="text-B2 mb-6 text-gray-500"
    >
      <div class="mb-2 h-12 w-full rounded-lg border bg-white lg:max-w-[514px]">
        <UInput
          v-model="orderStore.paymentEmail"
          color="primary"
          variant="none"
          size="xl"
          placeholder="請輸入您的Email"
          name="email"
          type="email"
        />
      </div>
      <span class="text-primary-dark">{{ orderStore.errorMessage }}</span>
    </UFormGroup>

    <div>
      <p class="text-B2 mb-2 text-neutral-400">
        電子發票儲存方式
      </p>
      <URadioGroup
        v-model="orderStore.selectedInvoice"
        :options="orderStore.invoiceOptions"
      >
        <template #label="{ option }">
          <p class="text-B2 mb-2 text-zinc-900">
            {{ option.label }}
          </p>
        </template>
      </URadioGroup>

      <template v-if="orderStore.selectedInvoice === 'phone'">
        <div class="mb-2 h-12 w-full rounded-lg border bg-white lg:max-w-[514px]">
          <UInput
            v-model="orderStore.paymentEmail"
            color="primary"
            variant="none"
            size="xl"
            placeholder="請輸入您的載具編號"
            name="eInvoice"
            type="text"
          />
        </div>
      </template>
    </div>
  </div>
</template>
