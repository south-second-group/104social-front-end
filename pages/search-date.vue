<script setup>
const locationType = ['北部', '中部', '南部', '東部']
const locationSelected = ref(null)

const searchType = ['男性', '女性', '其他']
const searchTypeSelected = ref(null)

const sortType = ['最後更新時間', '最多評價']
const sortSelected = ref(null)

const keyWord = ref(null)

const userGenderOptions = [{
  value: 'male',
  label: '男性',
}, {
  value: 'female',
  label: '女性',
}, {
  value: 'non-binary',
  label: '非二元性別',
}]

const lookingForGenderOptions = [{
  value: 'male',
  label: '男性',
}, {
  value: 'female',
  label: '女性',
}, {
  value: 'non-binary',
  label: '非二元性別',
}]

const selectedUserGender = ref('')
const selectedLookingForGenderOptions = ref('')
</script>

<template>
  <div class="container">
    <div class="mb-[73px] mt-20 grid grid-cols-12 gap-6">
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
        <MemberSearchCard />
        <MemberSearchCard />
        <MemberSearchCard />
      </div>
      <div class="col-span-3">
        <div class="mb-6 rounded-xl bg-primary-light p-6">
          <p class="mb-4 text-[20px] font-bold text-primary-dark">
            會員享福利
          </p>
          <div class="mb-2 flex items-center rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A]">
            <icon-heroicons-lock-open />
            <p class="ms-2 font-bold">
              解鎖評價
            </p>
          </div>
          <div class="flex items-center rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A]">
            <icon-heroicons-sparkles-solid />
            <p class="ms-2 font-bold">
              成為精選會員
            </p>
          </div>
        </div>
        <div class="mb-6 rounded-xl border border-zinc-200 p-6">
          <div class="mb-10">
            <p class="text-B2 mb-4 text-start text-zinc-400">
              我是
            </p>
            <URadioGroup
              v-model="selectedUserGender"
              class="custom-radio-group"
              :options="userGenderOptions"
            >
              <template #label="{ option }">
                <p class="text-B2 mb-2 text-zinc-900">
                  {{ option.label }}
                </p>
              </template>
            </URadioGroup>
          </div>
          <div class="">
            <p class="text-B2 mb-4 text-start text-zinc-400">
              尋找
            </p>
            <URadioGroup
              v-model="selectedLookingForGenderOptions"
              class="custom-radio-group"
              :options="lookingForGenderOptions"
            >
              <template #label="{ option }">
                <p class="text-B2 mb-2 text-zinc-900">
                  {{ option.label }}
                </p>
              </template>
            </URadioGroup>
          </div>
        </div>
        <div class="rounded-xl border border-zinc-200 p-6">
          <div class="mb-6 flex items-center justify-center text-zinc-600">
            <icon-heroicons-fire-solid class="size-6" />
            <p class="ms-2 text-[20px] font-bold">
              熱門關鍵字
            </p>
          </div>
          <div class="flex flex-wrap gap-3 text-start">
            <UBadge
              :ui="{ rounded: 'rounded-full' }"
              class="bg-neutral-200 px-3 py-2 text-base text-zinc-600"
            >
              水瓶座
            </UBadge>
            <UBadge
              :ui="{ rounded: 'rounded-full' }"
              class="bg-neutral-200 px-3 py-2 text-base text-zinc-600"
            >
              年薪百萬
            </UBadge>
            <UBadge
              :ui="{ rounded: 'rounded-full' }"
              class="bg-neutral-200 px-3 py-2 text-base text-zinc-600"
            >
              性格外向
            </UBadge>
            <UBadge
              :ui="{ rounded: 'rounded-full' }"
              class="bg-neutral-200 px-3 py-2 text-base text-zinc-600"
            >
              父母雙亡
            </UBadge>
          </div>
        </div>
      </div>
    </div>
    <div class="border border-transparent border-y-zinc-200 py-20">
      <p class="text-H4 mb-[60px] text-zinc-400">
        也許你也喜歡...
      </p>
      <div class="grid grid-cols-2 gap-6">
        <MemberSearchCard />
        <MemberSearchCard />
        <MemberSearchCard />
        <MemberSearchCard />
      </div>
    </div>
  </div>
</template>
