<script setup>
import { ref } from 'vue'
// import { useEmailValidation } from './useValidation.js'

// const { email, emailError, validateEmail } = useEmailValidation()

// 電子發票
const invoiceOptions = [
  { value: 'member', label: '104 會員載具' },
  { value: 'phone', label: '手機條碼載具' },
]
const selectedInvoice = ref('member')

// 付款方式
const paymentOptions = [
  { value: 'creditcard', label: '信用卡 / 金融卡' },
  { value: 'ATM', label: 'ATM 轉帳' },
]
const selectedPayment = ref('creditcard')
</script>

<template>
  <!-- 付款資訊 -->
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
          v-model="keyWord"
          color="primary"
          variant="none"
          size="xl"
          placeholder="請輸入您的Email"
        />
      </div>
      <div
        v-if="emailError"
        class="text-red-500"
      >
        {{ emailError }}
      </div>
    </UFormGroup>

    <div>
      <p class="text-B2 mb-2 text-neutral-400">
        電子發票儲存方式
      </p>
      <URadioGroup
        v-model="selectedInvoice"
        :options="invoiceOptions"
      >
        <template #label="{ option }">
          <p class="text-B2 mb-2 text-zinc-900">
            {{ option.label }}
          </p>
        </template>
      </URadioGroup>
    </div>
  </div>
  <!-- 付款方式 -->
  <div class="relative mb-4 me-0 max-w-full rounded-xl bg-neutral-100 p-4 lg:p-6">
    <div class="mb-6 border-b-2 border-x-neutral-300 pb-3 text-[20px] font-bold text-neutral-400">
      付款方式
    </div>
    <div>
      <URadioGroup
        v-model="selectedPayment"
        :options="paymentOptions"
      >
        <template #label="{ option }">
          <p class="text-B2 mb-2 text-zinc-900">
            {{ option.label }}
          </p>
        </template>
      </URadioGroup>
    </div>
  </div>
</template>
