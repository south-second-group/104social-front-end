<script setup>
useHead({
  title: '我的邀約',
})

const tabItems = [
  {
    label: '我邀約誰',
  },
  {
    label: '誰邀約我',
  },
]
const selectedItem = ref('我邀約誰')

function onChange(index) {
  selectedItem.value = tabItems[index].label
}

const page = ref(1)
const items = ref(Array(75))
</script>

<template>
  <main class="useIsChineseFunc max-w-custom-container">
    <div class="m-auto max-w-[856px] px-3 md:px-0">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        我的邀約
      </h1>

      <UTabs
        :ui="{
          wrapper: 'mb-[24px] text-start',
          container: 'relative w-full',
          list: {
            width: 'w-[200px]',
            background: 'bg-white',
            marker: {
              shadow: 'shadow-none',
            },
            tab: {
              base: 'text-B2 text-neutral-400 border-b-2 border-white box-border px-4 py-2 hover:text-neutral-700 font-normal',
              active:
                '!text-primary-dark border-b-2 !border-primary-dark font-[700]',
              rounded: 'rounded-none',
              height: 'h-10',
            },
          },
        }"
        :items="tabItems"
        @change="onChange"
      />

      <!-- 卡片 -->
      <section
        v-if="selectedItem === '我邀約誰'"
        class="space-y-3"
      >
        <utilsUserCardBgLight
          v-for="i in 6"
          :key="i"
          :i="i"
        />
      </section>

      <section
        v-else
        class="space-y-3"
      >
        <utilsInviteCard
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
