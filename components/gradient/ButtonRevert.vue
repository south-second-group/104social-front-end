<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  click?: () => void
}>()
</script>

<template>
  <GradientBaseRevert class="group">
    <button
      :class="cn('relative z-10 block w-full rounded-full lg:group-hover:bg-gradient-to-r from-[#FE839A] to-[#4A72FF] lg:py-4 py-3 duration-300 ease-in-out bg-white bg-none disabled:cursor-not-allowed', props.class)"
      @click="props.click"
    >
      <slot></slot>
    </button>
  </GradientBaseRevert>
</template>
