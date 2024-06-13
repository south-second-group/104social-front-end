<script setup></script>

<template>
  <section
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 bg-white p-4 md:p-6"
  >
    <div class="flex items-center justify-between">
      <USkeleton class="h-8 w-20 rounded-full bg-neutral-300" />
      <div>
        <USkeleton
          v-for="item in 3"
          :key="item.id"
          class="me-3 inline-block size-8 rounded-full bg-neutral-300"
        />
      </div>
    </div>

    <div class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row">
      <div class="shrink-0">
        <USkeleton class="size-[150px] rounded-full bg-neutral-300" />
      </div>

      <div class="w-full shrink-0 space-y-3 text-start md:w-[586px]">
        <USkeleton
          v-for="item in 3"
          :key="item.id"
          class="h-12 w-[100%] bg-neutral-300"
        />
      </div>
    </div>

    <div class="flex flex-wrap justify-end gap-3">
      <USkeleton
        v-for="item in 5"
        :key="item.id"
        class="h-12 w-[103px] rounded-full bg-neutral-300"
      />
    </div>
  </section>
</template>

<style scoped></style>
