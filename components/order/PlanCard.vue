<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 點數選單
const pointsType = ['100點', '200點', '300點', '400點', '500點', '600點', '700點', '800點', '900點', '1000點']
const pointsSelected = ref(null)

// 使用 useRouter
const router = useRouter()

// 點擊購買按鈕跳轉
function navigateToPayPage() {
  if (pointsSelected.value)
    router.push('/order/PayPage')
  else
    alert('請選擇要儲值的點數')
}
</script>

<template>
  <!-- 儲值方案 -->
  <div class="col-span-12 md:col-span-4 lg:col-span-3">
    <div class="mb-4 rounded-xl bg-primary-light p-4 lg:mb-6 lg:p-6">
      <p class="mb-4 text-[16px] font-bold text-primary-dark lg:text-[20px]">
        儲值方案
      </p>
      <div class="mb-4 lg:mb-6">
        <span class="text-H3 md:text-H4 font-bold">{{ pointsSelected || '100點' }}</span>
        <span class="text-B1 sm:text-B2 text-neutral-400"> / NTD$ {{ pointsSelected ? (pointsSelected * 1.5) : 150 }}</span>
      </div>

      <div class="mb-4 flex justify-between lg:mb-6">
        <div class="me-3 h-12 min-w-[220px] rounded-lg border bg-white">
          <USelectMenu
            v-model="pointsSelected"
            :options="pointsType"
            placeholder="請選擇要儲值的點數"
            class="text-gray-400"
            size="xl"
            variant="none"
          />
        </div>
        <button
          class="btn-linear-sm min-h-12 min-w-[80px]"
          type="button"
          @click="navigateToPayPage"
        >
          <p>購買</p>
        </button>
      </div>
      <div class="min-h-[120px] rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A]">
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
