<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  isDisabled?: boolean
  click?: () => void
}>()
</script>

<template>
  <GradientBaseRevert class="group">
    <button
      :class="cn(
        'relative z-10 block w-full rounded-full lg:py-4 py-3 duration-300 ease-in-out bg-white disabled:cursor-not-allowed',
        props.class,
        {
          'lg:group-hover:bg-gradient-to-r from-[#FE839A] to-[#4A72FF]': !props.isDisabled,
          'lg:disabled:group-hover:bg-none': props.isDisabled,
        },
      )"
      :disabled="props.isDisabled"
      @click="props.click"
    >
      <slot></slot>
    </button>
  </GradientBaseRevert>
</template>
