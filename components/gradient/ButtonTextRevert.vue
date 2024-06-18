<script lang="ts" setup>
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  isDisabled?: boolean
  text: string
}>()

const checkDisabled = computed(() => props.isDisabled)
</script>

<template>
  <!-- Icon 插入點 -->
  <slot name="icon"></slot>

  <p
    :class="cn(
      'text-xl font-bold text-white hidden',
      props.class,
      {
        'group-hover:inline-block': !checkDisabled,
      },
    )"
  >
    {{ props.text }}
  </p>

  <p
    :class="cn(
      'text-gradient inline-block bg-gradient-to-r from-[#FE839A] to-[#4A72FF] text-xl font-bold !text-transparent',
      props.class,
      { 'group-hover:hidden': !checkDisabled },
    )"
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
