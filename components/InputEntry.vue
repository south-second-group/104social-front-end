<script setup lang="ts">
const router = useRouter()
const name = ref<string>('')

function go() {
  if (!name.value)
    return
  router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div class="my-6">
    <input
      v-model="name"
      type="text"
      class="w-64 rounded border  border-gray-300 bg-transparent px-4 py-2  text-center text-gray-600 outline-none focus:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:focus:border-gray-600"
      placeholder="What's your name?"
      autocomplete="off"
      @keydown.enter="go"
    >
  </div>

  <div>
    <Button
      type="button"
      class="my-btn"
      :disabled="!name"
      icon="pi pi-check"
      label="go"
      @click="go"
    />
  </div>

  <div class="mt-6 flex space-x-5">
    <Button
      label="Check"
      icon="pi pi-check"
      class="my-btn"
    />
    <Button label="Primary" />
    <Button
      label="Secondary"
      severity="secondary"
    />
    <Button
      label="Success"
      severity="success"
    />
    <Button
      label="Info"
      severity="info"
    />
    <Button
      label="Warning"
      severity="warning"
    />
    <Button
      label="Help"
      severity="help"
    />
    <Button
      label="Danger"
      severity="danger"
    />
    <Button
      label="Contrast"
      severity="contrast"
    />
  </div>
</template>

<style>
</style>
