<script setup>
useHead({
  title: '我留下的評價',
})

const pagination = reactive({ page: 1, totalPage: 10 })
</script>

<template>
  <main class="max-w-custom-container">
    <div class="m-auto max-w-[856px] px-3 md:px-0">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        我留下的評價
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
          v-model="pagination.page"
          :items="Array(pagination.totalPage)"
        />
      </section>
    </div>
  </main>
</template>

<style scoped></style>
