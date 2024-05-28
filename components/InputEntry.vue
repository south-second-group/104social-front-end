<script setup>
const router = useRouter()
const name = ref('')

function go() {
  if (!name.value)
    return
  router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <main class=" space-y-10">
    <div class=" space-y-5">
      <input
        v-model="name"
        type="text"
        class="w-64 rounded border border-gray-300 bg-transparent px-4 py-2 text-center text-gray-600 outline-none focus:border-gray-300 dark:border-gray-600 dark:text-gray-300 dark:focus:border-gray-600"
        placeholder="What's your name?"
        autocomplete="off"
        @keydown.enter="go"
      >

      <button
        type="button"
        class="my-btn"
        :disabled="!name"
        @click="go"
      >
        <Icon
          name="uil:check"
          color="white"
          size="18"
        /> Go
      </button>
    </div>

    <div>
      <h3>
        nuxt ui:
      </h3>
      <UAccordion
        color="green"
        variant="outline"
        size="sm"
        :items="[{ label: '1. What is Nuxt UI?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '2. Getting Started', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '3. Theming', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: '4. Components', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }]"
      />
    </div>

    <IconsExample />
  </main>
</template>
