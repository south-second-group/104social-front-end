<script setup>
const props = defineProps({
  items: Array,
})
const page = defineModel()
</script>

<template>
  <UPagination
    v-model="page"
    :page-count="6"
    :max="8"
    :total="props.items.length"
    :ui="{
      wrapper: 'flex items-center  justify-center ',
      base: 'border-none ring-0 shadow-none bg-white font-normal md:px-4 py-3  text-neutral-600 hover:bg-white',
      rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md',
      default: {
        size: 'sm',
        activeButton: {
          size: 'xl',
          active: true,
          activeClass: '!text-primary-dark',
        },
      },
    }"
  >
    <template #prev="{ onClick }">
      <UTooltip text="Previous page">
        <UButton
          icon="i-heroicons-chevron-left"
          :ui="{ rounded: 'rounded-full' }"
          :disabled="page === 1"
          class="me-2 bg-primary-light  text-primary-dark hover:bg-primary-light rtl:[&_span:first-child]:rotate-180"
          :class="{ 'cursor-not-allowed !bg-primary-light text-neutral-400': page === 1 }"
          @click="onClick"
        />
      </UTooltip>
    </template>
    <template #next="{ onClick }">
      <UTooltip text="Next page">
        <UButton
          icon="i-heroicons-chevron-right"
          color="primary"
          :ui="{ rounded: 'rounded-full' }"
          :disabled="page === Math.ceil(props.items.length / 6)"
          :class="{ 'cursor-not-allowed': page === Math.ceil(props.items.length / 6) }"
          class="ms-2 bg-primary-light text-primary-dark hover:bg-primary-light disabled:bg-primary-light disabled:text-neutral-400 rtl:[&_span:last-child]:rotate-180"
          @click="onClick"
        />
      </UTooltip>
    </template>
  </UPagination>
</template>

<style scoped></style>
