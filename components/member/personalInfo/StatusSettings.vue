<script setup>
const memberStore = useMemberStore()
</script>

<template>
  <div class="w-full rounded-[10px] bg-neutral-100 p-4 lg:p-6">
    <h2 class="text-start text-xl font-bold">
      個人狀態
    </h2>

    <ul class="mt-4 space-y-4">
      <!-- <li class="flex space-x-2">
        <h4 class="text-B2 text-neutral-400">
          會員評價｜
        </h4>
        <b class="text-neutral-600">{{ memberStore.personalStatus.rating }}</b>
      </li> -->

      <li class="flex space-x-2">
        <h4 class="text-B2 text-neutral-400">
          是否刊登｜
        </h4>
        <div class="flex items-center space-x-1">
          <UToggle
            v-model="memberStore.personalStatus.isShow"
            color="primary"
            :disabled="!memberStore.editStatus"
          />
          <span>是</span>
        </div>
      </li>

      <li class="flex space-x-2">
        <h4 class="text-B2 text-neutral-400">
          是否持續配對｜
        </h4>
        <div class="flex items-center space-x-1">
          <UToggle
            v-model="memberStore.personalStatus.isMatch"
            color="primary"
            :disabled="!memberStore.editStatus"
          />
          <span>揭露</span>
        </div>
      </li>
    </ul>
  </div>
</template>
