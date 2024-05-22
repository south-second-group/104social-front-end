<script lang="ts" setup>
const tabItems = [{
  label: '我邀約誰',
}, {
  label: '誰邀約我',
}]
const selectedItem = ref(null)

function onChange(index) {
  selectedItem.value = tabItems[index].label
}

const status = ref('status2') // 這裡可以是 'status1', 'status2', 'status3', 或 'status4'
const buttonClass = computed(() => {
  switch (status.value) {
    case 'status1':
      return 'bg-special-dark'
    case 'status2':
      return 'bg-special-info'
    case 'status3':
      return 'bg-special-warning'
    case 'status4':
      return 'bg-special-success'
    default:
      return 'bg-special-danger'
  }
})

const buttonList = ref([
  { status: 'status1', click: () => { console.warn('status1') } },
  { status: 'status2', click: () => { console.warn('status2') } },
])
</script>

<template>
  <main class="container h-screen border">
    <div class="m-auto max-w-[856px]">
      <h1 class="text-H3 mb-[40px] mt-[80px] text-start">
        我的邀約
      </h1>

      <UTabs
        :ui="{
          wrapper: 'flex justify-start mb-[24px]',
          container: 'relative w-52',
          list: {
            width: 'w-52',
            background: 'bg-white',
            marker: {
              shadow: 'shadow-none',
            },
            tab: {
              base: 'text-B2 text-neutral-400 box-border',
              active: '!text-primary-dark border-b-2 border-primary-dark fw-[700]',
              rounded: 'rounded-none',
              height: 'h-10',
            },
          },
        }"
        :items="tabItems"
        @change="onChange"
      />

      <section class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 p-6">
        <div class="flex items-center justify-between">
          <button
            :class="buttonClass"
            class="text-B3 rounded-full bg-primary-dark px-3 py-1 text-white"
          >
            邀約狀態
          </button>
          <div class="rounded-full bg-neutral-100 p-[10px]">
            <CollectionBtn />
          </div>
        </div>

        <div class="flex flex-col gap-6 rounded-xl bg-neutral-100  p-6 lg:flex-row">
          <img
            src="https://s3-alpha-sig.figma.com/img/9e32/e3b7/c81f156a2b93e3a421109aa51f7c3a74?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K1hk3rYu9v09zzjBWk-ZBToe5nlGuRWZpvA7ejGU6YNQOsHmdv6wlI55cEcnnvy5Ogs3abBp4F-PekueoJIa-Qri49ChzxaAS-sCmun7KjUDmODoM~pxYX8Jxg~dEet4e2U4TziDQRpkDV4kZi1scs6pb0-sV6~-e0HXCGTTPqrmR7iGrn3Rg-fIQql6e-MgJqkCcVMIRkENdVjc45kpG2fU52J5V570pB0HnQcqn--y-4mi0i925AX3S0XV6buVjfgfMphRVk6L~Ar0xqxAOMxtDMDByv5iE6O8rWgfD8Ab1EM-dLre2lEyj2Z4eoB7awN~4IZdMpKOGtKuNTYq2Q__"
            alt="s3-alpha-sig"
            class="size-[150px] flex-none rounded-full object-cover"
          >
          <div class="w-full space-y-6 text-start">
            <div>
              <h2 class=" text-H4 text-neutral-600">
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

            <div class="flex justify-between">
              <div>
                <a
                  href
                  class=" text-special-info"
                >團膳業</a>
              </div>
              <div class=" flex justify-end space-x-2">
                <icon-heroicons:star-solid class=" text-special-warning" />
                <span class=" text-B3 text-neutral-400 ">
                  評分 4.2 (13)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class=" flex justify-end gap-3">
          <div
            v-for="(btn, index) in buttonList"
            :key="index"
          >
            <utilsBtnComp
              :status="btn.status"
              @click="btn.click"
            />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
