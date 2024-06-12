<!-- 儲值方案 -->
<script setup>
import { ref } from 'vue'

const pointsType = ['100點', '200點', '300點', '400點', '500點', '600點', '700點', '800點', '900點', '1000點']
const pointsSelected = ref('100點')
const router = useRouter()

// 新增函數，用來從選擇的點數中提取數字並計算價格
function calculatePrice(points) {
  if (!points)
    return 150 // 如果沒有選擇點數，返回基本價格
  const numericPoints = Number.parseInt(points.match(/\d+/)[0]) // 從字串中提取數字
  return numericPoints * 1.5 // 根據點數計算價格
}

function navigateToPayPage() {
  router.push('/order/PayPage')
}
</script>

<template>
  <div class="col-span-12 md:col-span-4 lg:col-span-3">
    <div class="mb-4 rounded-xl bg-primary-light p-4 lg:mb-6 lg:p-6">
      <p class="mb-2 text-[16px] font-bold text-primary-dark lg:text-[20px]">
        儲值方案
      </p>
      <div class="mb-4">
        <span class="text-H3 font-bold">{{ pointsSelected || '100點' }}</span>
        <span class="text-B1 text-neutral-400"> / NTD$ {{ calculatePrice(pointsSelected) }}</span>
      </div>

      <div class="mb-4 flex justify-between lg:mb-6">
        <div class="mr-2 h-12 w-full rounded-lg border bg-white">
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
          class="btn-withIcon-outline h-12 w-[100px]"
          type="button"
          @click="navigateToPayPage"
        >
          <p>購買</p>
        </button>
      </div>
      <div class="rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A]">
        <p class="sm:text-B3 pb-2 font-bold text-neutral-400">
          更多曝光
        </p>
        <p class="sm:text-B3 text-neutral-600">
          每100點可被曝光在精選會員
        </p>
      </div>
    </div>
  </div>
</template>
