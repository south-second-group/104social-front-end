<script setup>

</script>

<template>
  <div class="container text-start">
    <div class="grid grid-cols-12 gap-6 py-5 lg:py-20">
      <!-- 左側選單 -->
      <OrderPayOrderOptions class="lg:block" />

      <!-- 右側付款資訊 -->
      <div class="col-span-12 lg:col-span-9">
        <div class="flex flex-col justify-center">
          <!-- 方案資訊 -->
          <OrderPayDateRange />

          <!-- 付款資訊 -->
          <OrderPayPaymentInformation />

          <!-- 付款方式 -->
          <OrderPayPaymentWay />
        </div>

        <!-- 小計 -->
        <OrderPaySubtotalInfo />
      </div>
    </div>
  </div>
</template>
