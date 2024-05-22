<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <!-- Icon 插入點 -->
  <slot name="icon"></slot>

  <p class="inline-block text-xl font-bold text-white group-hover:hidden">
    {{ props.text }}
  </p>

  <p
    class="text-gradient hidden bg-gradient-to-r from-[#FE839A] to-[#4A72FF] text-xl font-bold !text-transparent group-hover:inline-block"
  >
    {{ props.text }}
  </p>
</template>

<style scoped>
.text-gradient {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
