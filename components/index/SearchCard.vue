<script setup>
const gender = ['男性', '女性', '其他']
const genderSelected = ref(null)

const searchType = ['男性', '女性', '其他']
const searchTypeSelected = ref(null)

const keyWord = ref(null)
</script>

<template>
  <div class="container mx-auto flex h-full items-center">
    <div class="linear-border w-[634px] rounded-3xl p-[60px]">
      <div class="mb-[60px] flex-col space-y-[60px]">
        <div class="">
          <p class="text-left text-xl font-bold">
            我是
          </p>

          <!-- 搜尋欄位 -->
          <div class="mt-2 h-12 w-full rounded-lg border bg-white">
            <USelectMenu
              v-model="genderSelected"
              :options="gender"
              placeholder="請選擇性別"
              class="text-gray-400"
              size="xl"
              variant="none"
            />
          </div>
        </div>

        <div class="">
          <p class="text-left text-xl font-bold">
            我想尋找
          </p>

          <!-- 搜尋欄位 -->
          <div class="mt-2 h-12 w-full rounded-lg border bg-white">
            <USelectMenu
              v-model="searchTypeSelected"
              :options="searchType"
              placeholder="請選擇性別"
              class="text-gray-400"
              size="xl"
              variant="none"
            />
          </div>
        </div>

        <div class="">
          <p class="text-left text-xl font-bold">
            尋找對象的關鍵字
          </p>

          <!-- 搜尋欄位 -->
          <div class="mt-2 h-12 w-full rounded-lg border bg-white">
            <UInput
              v-model="keyWord"
              color="primary"
              variant="none"
              size="xl"
              placeholder="職業、興趣、星座..."
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn-linear-rwd"
      >
        <p>搜尋</p>
      </button>
    </div>
  </div>
</template>
