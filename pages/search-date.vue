<script setup>
const locationType = ['北部', '中部', '南部', '東部']
const locationSelected = ref(null)

const searchType = ['男性', '女性', '其他']
const searchTypeSelected = ref(null)

const sortType = ['最後更新時間', '最多評價']
const sortSelected = ref(null)

const keyWord = ref(null)
</script>

<template>
  <div class="mt-20 grid grid-cols-12 gap-6">
    <div class="col-span-9 mt-4">
      <div class="mb-20 flex">
        <div class="me-4 h-12 w-full max-w-[380px] rounded-lg border bg-white">
          <UInput
            v-model="keyWord"
            color="primary"
            variant="none"
            size="xl"
            placeholder="輸入理想對象的職業、興趣、星座..."
          />
        </div>
        <div class="flex gap-4">
          <div class="h-12 w-full rounded-lg border bg-white">
            <USelectMenu
              v-model="locationSelected"
              :options="locationType"
              placeholder="所在地區"
              class="text-gray-400"
              size="xl"
              variant="none"
            />
          </div>
          <div class="h-12 w-full rounded-lg border bg-white">
            <USelectMenu
              v-model="searchTypeSelected"
              :options="searchType"
              placeholder="性別"
              class="text-gray-400"
              size="xl"
              variant="none"
            />
          </div>
        </div>
        <div class="my-auto ms-[28px]">
          <div class="rounded-full bg-[#FFF5F5] p-2">
            <span class="cursor-pointer text-xl text-primary-dark">
              <icon-heroicons-adjustments-horizontal />
            </span>
          </div>
        </div>
        <UButton
          :ui="{ rounded: 'rounded-full' }"
          class="ms-4 bg-primary-dark px-5 py-2 text-base font-bold"
        >
          搜尋
        </UButton>
      </div>
      <div class="mb-6 flex w-full items-center justify-between">
        <div class="flex gap-6">
          <div class="p-2">
            全部（9487）
          </div>
          <UDivider
            orientation="vertical"
            class="my-1.5"
          />
          <div class="p-2">
            公開（8524）
          </div>
          <UDivider
            orientation="vertical"
            class="my-1.5"
          />
          <div class="p-2">
            近期刊登（487）
          </div>
        </div>
        <div class="h-12 w-full max-w-[196px] rounded-lg border bg-white">
          <USelectMenu
            v-model="sortSelected"
            :options="sortType"
            placeholder="預設排序"
            class="text-gray-400"
            size="xl"
            variant="none"
          />
        </div>
      </div>
      <div
        class="flex flex-col justify-between rounded-xl bg-[#F5F5F5] p-4 md:flex-row md:p-6"
      >
        <div class="flex flex-col md:flex-row">
          <div class="mb-4 shrink-0 self-center md:mb-0 md:me-6">
            <NuxtImg
              src="/notifications/member01.png"
              alt=""
              class="w-[150px]"
            />
          </div>
          <div class="me-6 text-start">
            <div class="mb-3">
              <p class="text-H4 mb-1 text-zinc-900">
                13
              </p>
              <p class="text-B2 text-zinc-900">
                生理女、身高 165cm、體重 50kg、健身、未婚
              </p>
            </div>
            <div
              class="mb-3 border-2 border-transparent border-l-[#E4E4E7] ps-3"
            >
              <p class="text-B2 text-[#52525B]">
                營養師
              </p>
              <p class="text-B2 text-zinc-400">
                台南白河國小
              </p>
            </div>
            <div class="text-B2 flex gap-3 text-[#4A72FF]">
              <p>團膳業</p>
              <p>職員</p>
              <p>年薪 650K</p>
            </div>
          </div>
        </div>
        <div class="flex items-center self-start md:self-end">
          <span class="text-xl text-amber-400">
            <icon-heroicons-star-solid />
          </span>
          <p class="ms-2 text-sm text-zinc-400">
            評分 4.2 (13)
          </p>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      會員享福利
    </div>
  </div>
</template>
