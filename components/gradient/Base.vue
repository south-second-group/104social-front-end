<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div
    :class="cn('GradientButton flex active:scale-75 duration-300 ease-in-out items-center justify-center rounded-full bg-black bg-gradient-to-r from-[#FE839A] to-[#4A72FF]', props.class)"
  >
    <slot></slot>
  </div>
</template>
