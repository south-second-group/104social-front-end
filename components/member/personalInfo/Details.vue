<script setup>
const memberStore = useMemberStore()
</script>

<template>
  <ul class="w-full space-y-4 rounded-[10px] bg-neutral-100 p-4 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6 lg:space-y-0 lg:p-6">
    <li
      v-for="(personalItem) in memberStore.personalDetails"
      :key="personalItem.label"
      class="grid grid-cols-5 gap-x-2"
    >
      <UFormGroup
        :label="personalItem.label"
        class="col-span-3 lg:col-span-4"
      >
        <UInput
          :placeholder="personalItem.placeholder"
          size="xl"
          :value="personalItem.value"
          :disabled="!memberStore.editStatus"
          @input="personalItem.value = $event.target.value"
        />
      </UFormGroup>

      <div class="col-span-2 flex items-end space-x-1 pb-2 lg:col-span-1">
        <UToggle
          v-model="personalItem.isShow"
          color="primary"
          :disabled="!memberStore.editStatus"
        />
        <span>揭露</span>
      </div>
    </li>
  </ul>

  <!-- 詳細配對設定 -->
  <memberUserSelfSetting />
</template>
