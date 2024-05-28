<script setup>
import { useDemo } from '~/composables/demoFolder/demo'

const { data } = await useFetch('/api/pageview')

const timeAgo = useTimeAgo(() => data.value?.startAt || 0)
const demoData = useDemo()
</script>

<template>
  <div class="text-yellow-400 dark:text-gray-200 ">
    <h1 class="text-xl">
      {{ demoData }}
    </h1>
    <span>{{ data?.pageview }}</span>
    page view since
    <span>{{ timeAgo }}</span>
  </div>
</template>

<style scope></style>
