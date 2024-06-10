<script setup>
const props = defineProps(['item'])
const emit = defineEmits(['pushSelectedHashtag', 'pushExcludedHashtag'])
const { item } = props
const open = ref(false)
function addToSelectedHashtag(tag) {
  emit('pushSelectedHashtag', tag)
  open.value = !open.value
}
function addToExcludedHashtag(tag) {
  emit('pushExcludedHashtag', tag)
  open.value = !open.value
}
</script>

<template>
  <UPopover
    v-model:open="open"
    :popper="{ offsetDistance: 0 }"
  >
    <UButton
      color="white"
      :label="item"
      class="no-border-no-shadow rounded-full bg-neutral-200 px-5 py-2 text-base text-zinc-600 transition duration-300 ease-in-out hover:bg-[#FFF5F5]"
      trailing-icon="i-heroicons-plus"
    />

    <template #panel>
      <div class="p-1">
        <div class="flex">
          <UButton
            color="white"
            class="no-border-no-shadow"
            @click="addToSelectedHashtag(item)"
          >
            加入條件
          </UButton>
          <UDivider orientation="vertical" />
          <UButton
            color="white"
            class="no-border-no-shadow"
            @click="addToExcludedHashtag(item)"
          >
            排除
          </UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style scoped>
.no-border-no-shadow {
  border: none;
  box-shadow: none;
}
</style>
