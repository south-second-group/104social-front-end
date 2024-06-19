<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  text: string
}>()
</script>

<template>
  <!-- Icon 插入點 -->
  <slot name="icon"></slot>

  <p :class="cn('inline-block text-xl font-bold text-white lg:group-hover:hidden', props.class)">
    {{ props.text }}
  </p>

  <p
    :class="cn('text-gradient hidden bg-gradient-to-r from-[#FE839A] to-[#4A72FF] text-xl font-bold !text-transparent lg:group-hover:inline-block', props.class)"
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
