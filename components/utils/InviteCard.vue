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
      <img
        src="~/assets/img/member/Image01.png"
        alt="s3-alpha-sig"
        class="mx-auto size-[150px] flex-none rounded-full object-cover"
      >

      <div class="w-full space-y-3 text-start">
        <div class="space-y-1">
          <p class="text-B2 text-neutral-400">
            營養師
          </p>
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc('張詠晴'),
            }"
          >
            張詠晴
          </h2>
        </div>

        <p class="text-B2 line-clamp-2 text-neutral-600">
          Hello，你好我是詠晴，看到你對園藝和美食有著濃厚的興趣,感覺我們有很多共同點。不知道你是否願意和我一起分享這些美好時光呢?
        </p>

        <div class="flex flex-col items-start gap-3 md:flex-row">
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
