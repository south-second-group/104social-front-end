<script setup>
useHead({
  title: '拒絕往來',
})

const page = ref(1)
const items = ref(Array(75))
</script>

<template>
  <main class="useIsChineseFunc max-w-custom-container">
    <div class="m-auto max-w-[856px] px-3 md:px-0">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        拒絕往來
      </h1>

      <!-- 卡片 -->
      <section class="space-y-3">
        <utilsUserCardBgLight
          v-for="i in 6"
          :key="i"
          :i="i"
        />
      </section>

      <!-- 分頁 -->
      <section class="py-12 font-montserrat">
        <utilsPaginationComp
          v-model="page"
          :items="items"
        />
      </section>
    </div>
  </main>
</template>

<style scoped></style>
