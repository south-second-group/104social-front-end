<script setup lang="ts">
import { Icon } from '#components'

const router = useRouter()
const name = ref<string>('')

function go() {
  if (!name.value)
    return
  router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const MyIcon = h(Icon, { name: 'uil:twitter', size: '32', color: 'cornflowerblue' })
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

    <div class=" flex justify-center space-x-10">
      <h3>nuxt icon:</h3>
      <Icon
        name="uil:facebook"
        color="blue"
        size="32"
      />

      <Icon
        name="uil:instagram"
        color="red"
        size="32"
      />

      <Icon
        name="uil:google"
        color="green"
        size="32"
      />

      <Icon
        name="uil:github"
        color="black"
        size="32"
      />

      <!-- <Icon name="NuxtIcon" size="48" /> -->
      <!-- <span class="iconify" data-icon="grommet-icons:amazon" size="48" data-inline="false"></span> -->

      <!-- <IconCSS name="uil:nuxt-icon" /> -->
      <p><MyIcon /></p>

      <svg
        width="32"
        height="32"
        viewBox="0 0 324 324"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M181.767 270H302.211C306.037 270 309.795 269.003 313.108 267.107C316.421 265.211 319.172 262.484 321.084 259.2C322.996 255.915 324.002 252.19 324 248.399C323.998 244.607 322.989 240.883 321.074 237.601L240.187 98.7439C238.275 95.4607 235.525 92.7342 232.213 90.8385C228.901 88.9429 225.143 87.9449 221.318 87.9449C217.494 87.9449 213.736 88.9429 210.424 90.8385C207.112 92.7342 204.361 95.4607 202.449 98.7439L181.767 134.272L141.329 64.7975C139.416 61.5145 136.664 58.7884 133.351 56.8931C130.038 54.9978 126.28 54 122.454 54C118.629 54 114.871 54.9978 111.558 56.8931C108.245 58.7884 105.493 61.5145 103.58 64.7975L2.92554 237.601C1.01067 240.883 0.00166657 244.607 2.06272e-06 248.399C-0.00166244 252.19 1.00407 255.915 2.91605 259.2C4.82803 262.484 7.57884 265.211 10.8918 267.107C14.2047 269.003 17.963 270 21.7886 270H97.3936C127.349 270 149.44 256.959 164.641 231.517L201.546 168.172L221.313 134.272L280.637 236.1H201.546L181.767 270ZM96.1611 236.065L43.3984 236.054L122.49 100.291L161.953 168.172L135.531 213.543C125.436 230.051 113.968 236.065 96.1611 236.065Z"
          fill="#00DC82"
        />
      </svg>
    </div>
  </main>
</template>
