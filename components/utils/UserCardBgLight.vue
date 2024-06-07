<script lang="ts" setup>
defineProps(['i'])

const buttonList = ref([
  { status: 'status1' },
  { status: 'status2' },
  { status: 'status3' },
  { status: 'status4' },
  { status: 'status5' },
  { status: 'status6' },
  { status: 'status7' },
  { status: 'status8' },
  { status: 'status9' },
  { status: 'status10' },
])
</script>

<template>
  <section
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 p-4 md:p-6"
  >
    <div class="flex items-center justify-between">
      <utilsInviteStatusBtn :status="i" />

      <div class="flex gap-3">
        <!-- vif 判斷顯示聊天或移除 -->
        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsChatBtn />
        </div>
        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsTrashBtn />
        </div>

        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsCollectionBtn />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row">
      <div class="shrink-0">
        <img
          src="~/assets/img/member/Image01.png"
          alt="s3-alpha-sig"
          class="mx-auto size-[150px] rounded-full object-cover"
        >
      </div>
      <div class="w-full shrink-0 space-y-6 text-start md:w-[586px]">
        <div class="space-y-1">
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc('張詠晴'),
            }"
          >
            張詠晴
          </h2>
          <p class="text-B2 text-neutral-600">
            生理女、身高 165cm、體重 50kg、健身、未婚
          </p>
        </div>
        <div class="space-y-3 border-l-2 border-x-neutral-300 pl-3">
          <p class="text-B2 text-neutral-500">
            營養師
          </p>
          <p class="text-B2 text-neutral-300">
            台南白河國小
          </p>
        </div>
        <div
          class="flex flex-col items-start justify-between gap-3 md:flex-row"
        >
          <div>
            <a
              href=""
              class="text-special-info"
            >團膳業</a>
          </div>
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span class="text-B3 text-neutral-400"> 評分 4.2 (13) </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-end md:gap-3">
      <utilsComplexBtn
        v-for="(btn, index) in buttonList"
        :key="index"
        :status="btn.status"
      />
    </div>
  </section>
</template>

<style scoped></style>
