<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  click?: () => void
}>()
</script>

<template>
  <GradientBase class="group">
    <button
      :class="cn('relative z-10 block w-full rounded-full bg-gradient-to-r from-[#FE839A] to-[#4A72FF] lg:py-4 py-3 lg:group-hover:bg-white lg:group-hover:bg-none ', props.class)"
      @click="props.click"
    >
      <slot></slot>
    </button>
  </GradientBase>
</template>
