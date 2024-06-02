<script setup>
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

const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <div class="col-span-3">
    <div class="mb-4 rounded-xl bg-primary-light p-6 lg:mb-6">
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
    <div class="mb-4 rounded-xl border border-zinc-200 p-6 lg:mb-6">
      <div class="mb-10">
        <p class="text-B2 mb-4 text-start text-zinc-400">
          我是
        </p>
        <URadioGroup
          v-model="selectedUserGender"
          :options="userGenderOptions"
          :ui="{ fieldset: isDesktop ? '' : 'flex gap-4' }"
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
          :options="lookingForGenderOptions"
          :ui="{ fieldset: isDesktop ? '' : 'flex gap-4' }"
        >
          <template #label="{ option }">
            <p class="text-B2 mb-2 text-zinc-900">
              {{ option.label }}
            </p>
          </template>
        </URadioGroup>
      </div>
    </div>
    <div class="mb-4 rounded-xl border border-zinc-200 p-4 lg:mb-6 lg:p-6">
      <div class="mb-6 flex items-center justify-center text-zinc-600">
        <icon-heroicons-fire-solid class="size-6" />
        <p class="ms-2 text-[20px] font-bold">
          熱門關鍵字
        </p>
      </div>
      <div class="flex gap-3 overflow-x-auto text-start lg:flex-wrap">
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          class="shrink-0 bg-neutral-200 px-3 py-2 text-base text-zinc-600"
        >
          水瓶座
        </UBadge>
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          class="shrink-0 bg-neutral-200 px-3 py-2 text-base text-zinc-600"
        >
          年薪百萬
        </UBadge>
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          class="shrink-0 bg-neutral-200 px-3 py-2 text-base text-zinc-600"
        >
          性格外向
        </UBadge>
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          class="shrink-0 bg-neutral-200 px-3 py-2 text-base text-zinc-600"
        >
          父母雙亡
        </UBadge>
      </div>
    </div>
  </div>
</template>
