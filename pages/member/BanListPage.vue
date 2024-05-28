<script setup>
useHead({
  title: '拒絕往來',
})

const buttonList = ref([
  { status: 'status7', click: () => { console.warn('status7') } },
])

const page = ref(1)
const items = ref(Array(75))
</script>

<template>
  <main class=" h-screen max-w-custom-container">
    <div class="m-auto max-w-[856px] px-3 md:px-0">
      <h1 class=" text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        拒絕往來
      </h1>

      <!-- 卡片 -->
      <section class=" space-y-3 ">
        <section
          v-for=" i in 6"
          :key="i"
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

          <div class="flex flex-col gap-6 rounded-xl bg-neutral-100  p-6 md:flex-row ">
            <div class="shrink-0">
              <img
                src="https://s3-alpha-sig.figma.com/img/9e32/e3b7/c81f156a2b93e3a421109aa51f7c3a74?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K1hk3rYu9v09zzjBWk-ZBToe5nlGuRWZpvA7ejGU6YNQOsHmdv6wlI55cEcnnvy5Ogs3abBp4F-PekueoJIa-Qri49ChzxaAS-sCmun7KjUDmODoM~pxYX8Jxg~dEet4e2U4TziDQRpkDV4kZi1scs6pb0-sV6~-e0HXCGTTPqrmR7iGrn3Rg-fIQql6e-MgJqkCcVMIRkENdVjc45kpG2fU52J5V570pB0HnQcqn--y-4mi0i925AX3S0XV6buVjfgfMphRVk6L~Ar0xqxAOMxtDMDByv5iE6O8rWgfD8Ab1EM-dLre2lEyj2Z4eoB7awN~4IZdMpKOGtKuNTYq2Q__"
                alt="s3-alpha-sig"
                class="mx-auto size-[150px]  rounded-full object-cover"
              >
            </div>
            <div class="w-full shrink-0 space-y-6 text-start md:w-[586px]">
              <div class=" space-y-1 ">
                <h2
                  class=" text-H4 text-neutral-600"
                  :class="{
                    'font-montserrat': !useIsChineseFunc(
                      '張詠晴',
                    ),
                  }"
                >
                  張詠晴
                </h2>
                <p class=" text-B2 text-neutral-600 ">
                  生理女、身高 165cm、體重 50kg、健身、未婚
                </p>
              </div>
              <div class=" space-y-3 border-l-2 border-x-neutral-300 pl-3">
                <p class=" text-B2 text-neutral-500">
                  營養師
                </p>
                <p class=" text-B2 text-neutral-300">
                  台南白河國小
                </p>
              </div>
              <div class="flex flex-col items-start justify-between gap-3 md:flex-row">
                <div>
                  <a
                    href=""
                    class=" text-special-info"
                  >團膳業</a>
                </div>
                <div class=" flex justify-end space-x-2 ">
                  <icon-heroicons:star-solid class=" text-special-warning" />
                  <span class=" text-B3 text-neutral-400 ">
                    評分 4.2 (13)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class=" flex flex-wrap justify-end md:gap-3">
            <utilsComplexBtn
              v-for="(btn, index) in buttonList"
              :key="index"
              :status="btn.status"
            />
          </div>
        </section>
      </section>

      <!-- 分頁 -->
      <section class=" py-12 font-montserrat">
        <utilsPaginationComp
          v-model="page"
          :items="items"
        />
      </section>
    </div>
  </main>
</template>

<style scoped></style>
