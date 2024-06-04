<script setup>
// toggle
const selected = ref(false)

// 個人詳細資料
const personalDetails = reactive([
  {
    label: '姓名',
    value: '',
    placeholder: '請輸入姓名',
    isShow: false,
  },
  {
    label: '年收入',
    value: '',
    placeholder: '請輸入年收入',
    isShow: false,
  },
  {
    label: '電話',
    value: '',
    placeholder: '請輸入電話',
    isShow: false,
  },
  {
    label: 'Line ID',
    value: '',
    placeholder: '請輸入Line ID',
    isShow: false,
  },
  {
    label: '公司',
    value: '',
    placeholder: '請輸入公司名稱',
    isShow: false,
  },
  {
    label: '職業',
    value: '',
    placeholder: '請輸入職業',
    isShow: false,
  },
])
</script>

<template>
  <ul class="w-full space-y-4 rounded-[10px] bg-neutral-100 p-4 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6 lg:space-y-0 lg:p-6">
    <li
      v-for="(personalItem) in personalDetails"
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
        />
      </UFormGroup>

      <div class="col-span-2 flex items-end space-x-1 pb-2 lg:col-span-1">
        <UToggle
          v-model="personalItem.isShow"
          color="primary"
        />
        <span>揭露</span>
      </div>
    </li>
  </ul>
</template>
