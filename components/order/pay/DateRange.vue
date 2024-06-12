<!-- 方案資訊 -->
<script setup>
const today = new Date()
const formatDate = date => `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
const startDate = formatDate(today)
const endDateObj = new Date(today)
endDateObj.setDate(endDateObj.getDate() + 30)
const endDate = formatDate(endDateObj)
</script>

<template>
  <div class="relative mb-4 me-0 max-w-full rounded-xl bg-neutral-100 p-4 lg:p-6">
    <div class="mb-3 border-b-2 border-x-neutral-300 pb-3 text-[20px] font-bold text-neutral-400">
      方案資訊
    </div>
    <div>
      <p class="mb-1 font-bold">
        點數使用期限（今日付款）
      </p>
      <p>{{ startDate }} - {{ endDate }}</p>
    </div>
  </div>
</template>
