<script setup>
const props = defineProps({
  options: Array,
  size: String,
  disabled: Boolean,
})
const selectedOption = defineModel()

const isOptionsExpanded = ref(false)
</script>

<template>
  <div
    class="relative cursor-pointer "
    :class="{
      'w-[514px]': props.size === 'lg',
      'w-[303px]': props.size === 'sm',
      'pointer-events-none opacity-90': props.disabled,
    }"
  >
    <button
      class="flex w-full items-center justify-between rounded-lg border bg-white px-[10px] py-[6px] text-[14px] text-[#A1A1AA] hover:border-primary-dark"
      :class="{ 'border-primary-dark': isOptionsExpanded }"
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="isOptionsExpanded = false"
    >
      <span>{{ selectedOption }}</span>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="size-4 transition-transform duration-200 ease-in-out"
        :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul
        v-show="isOptionsExpanded"
        class="absolute inset-x-0 z-10 mb-4 overflow-hidden rounded-lg bg-white shadow-lg"
      >
        <li
          v-for="(option, index) in props.options"
          :key="index"
          class="m-1 rounded-lg px-3 py-2 text-start text-[16px] transition-colors duration-300 hover:bg-[#F5F5F5]"
          @mousedown.prevent="
            isOptionsExpanded = false;
            selectedOption = option;
          "
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
