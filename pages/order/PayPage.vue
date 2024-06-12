<script setup>
import { computed, ref } from 'vue'

const pointsSelected = ref('100點')
const pricePerPoint = 1.5

const totalPrice = computed(() => {
  const points = Number.parseInt(pointsSelected.value.match(/\d+/)[0])
  return points * pricePerPoint
})

function updatePrice(newTotalPrice) {
  // 更新 totalPrice
  totalPrice.value = newTotalPrice
}
function updatePoints(points) {
  pointsSelected.value = points
}
</script>

<template>
  <div class="container text-start">
    <div class="grid grid-cols-12 gap-6 py-5 lg:py-20">
      <!-- 左側選單 -->
      <OrderPayOrderOptions
        class="lg:block"
        @update-points="updatePoints"
        @update-price="updatePrice"
      />
      <!-- 右側付款資訊 -->
      <div class="col-span-12 lg:col-span-9">
        <div class="flex flex-col justify-center">
          <!-- 方案資訊 -->
          <OrderPayDateRange />
          <!-- 付款資訊 -->
          <OrderPayPaymentInformation />
        </div>
        <!-- 小計 -->
        <OrderPaySubtotalInfo :total-price="totalPrice" />
      </div>
    </div>
  </div>
</template>
