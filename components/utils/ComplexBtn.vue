<script setup>
const props = defineProps({
  status: String,
  click: Function,
})

const btnText = computed(() => {
  switch (props.status) {
    case 'status1':
      return '已解鎖評價'
    case 'status2':
      return '解鎖評價'
    case 'status3':
      return '完成約會'
    case 'status4':
      return '邀約'
    case 'status5':
      return '收回邀約'
    case 'status6':
      return '拒絕往來'
    case 'status7':
      return '恢復往來'
    case 'status8':
      return '未給評價'
    case 'status9':
      return '已給評價'
    case 'status10':
      return '刪除評價'
    default:
      return ''
  }
})
</script>

<template>
  <div>
    <button
      v-if="status === 'status1'"
      class="flex scale-90 gap-3 rounded-full border-2 border-neutral-400 px-[20px] py-[6px] text-[16px] leading-[24px] text-neutral-400 md:scale-100"
      disabled
      @click="props.click"
    >
      <icon-heroicons:lock-open v-if="status === 'status1'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status2'"
      class=" btn-withIcon-outline scale-90 md:scale-100 "
      @click="props.click"
    >
      <icon-heroicons:lock-closed v-if="status === 'status2'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status3'"
      class=" scale-90 rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white md:scale-100 "
      @click="props.click"
    >
      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status4'"
      class=" btn-withIcon-fill scale-90 md:scale-100 "
      @click="props.click"
    >
      <icon-heroicons:heart v-if="status === 'status4'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status5'"
      class=" btn-withIcon-outline scale-90 md:scale-100 "
      @click="props.click"
    >
      <icon-heroicons:heart v-if="status === 'status5'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status6'"
      class=" btn-withIcon-outline scale-90 md:scale-100 "
      @click="props.click"
    >
      <icon-heroicons:x-mark v-if="status === 'status6'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status7'"
      class=" btn-withIcon-fill scale-90 md:scale-100 "
      @click="props.click"
    >
      <icon-heroicons:check v-if="status === 'status7'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status8'"
      class=" btn-withIcon-fill scale-90 md:scale-100 "
      @click="props.click"
    >
      <icon-heroicons:pencil v-if="status === 'status8'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status9'"
      class="flex scale-90 gap-3 rounded-full border-2 border-neutral-400 px-[20px] py-[6px] text-[16px] leading-[24px] text-neutral-400 md:scale-100"
      @click="props.click"
    >
      <icon-heroicons:pencil v-if="status === 'status9'" />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="status === 'status10'"
      class=" btn-withIcon-outline scale-90 md:scale-100 "
      @click="props.click"
    >
      <icon-heroicons:trash v-if="status === 'status10'" />

      <p>{{ btnText }}</p>
    </button>
  </div>
</template>

<style scoped></style>
