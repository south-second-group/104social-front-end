<script setup>
const isCheck = ref(false)
</script>

<template>
  <div class="relative mb-3 me-6 max-w-[312px] rounded-[10px] bg-[#FAFAFA] p-4 lg:me-0 lg:max-w-full lg:p-6">
    <div class="absolute end-[16px] lg:end-[24px]">
      <span class="text-xl">
        <utilsCollectionBtn v-model="isCheck" />
      </span>
    </div>
    <div class="flex w-full flex-col lg:flex-row">
      <div class="mb-4 shrink-0 self-center lg:mb-0 lg:me-6">
        <NuxtImg
          src="/notifications/member01.png"
          alt=""
          class="w-[150px]"
        />
      </div>
      <div class="w-full text-start">
        <p class="text-H4 mb-1 text-zinc-900">
          設備工程師
        </p>
        <p class="text-B2 mb-3 text-zinc-400">
          日月光半導體公司
        </p>
        <p class="text-B2 mb-3 text-zinc-900">
          生理女、身高172cm、體重87kg、有車有房、基督教、籃球、未婚、育有一女 ...
        </p>
        <ul class="text-B2 flex gap-3 text-special-info">
          <li>科技業</li>
          <li>主管</li>
          <li>年薪 100K</li>
        </ul>
      </div>
    </div>
    <div class="mt-6 flex gap-3 lg:justify-end">
      <button class="btn-withIcon-outline">
        <icon-heroicons:lock-open />
        <p>解鎖評價</p>
      </button>
      <button class="btn-withIcon-outline">
        <icon-heroicons:heart />
        <p>收回邀約</p>
      </button>
    </div>
  </div>
</template>
