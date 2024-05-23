<script lang="ts" setup>
const tabItems = [{
  label: '我邀約誰',
}, {
  label: '誰邀約我',
}]
const selectedItem = ref(null)

function onChange (index) {
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
  { status: 'status2', click: () => { console.warn('status2') } },
])

const isChinese = char => /[\u4E00-\u9FA5]/.test(char)

const page = ref(1)
const items = ref(Array(75))
</script>

<template>
  <main class=" max-w-custom-container h-screen">
    <div class="m-auto max-w-[856px] px-3 md:px-0">
      <h1 class="text-H3 mb-[40px] mt-[80px] text-start">
        我的邀約
      </h1>

      <UTabs :ui="{
        wrapper: 'mb-[24px] text-start',
        container: 'relative w-full',
        list: {
          width: 'w-[200px]',
          background: 'bg-white',
          marker: {
            shadow: 'shadow-none',
          },
          tab: {
            base: 'text-B2 text-neutral-400 border-b-2 border-white box-border px-4 py-2',
            active: '!text-primary-dark border-b-2 !border-primary-dark fw-[700]',
            rounded: 'rounded-none',
            height: 'h-10',
          },
        },
      }" :items="tabItems" @change="onChange" />

      <div class=" space-y-3">
        <section v-for=" i in 6" :key="i" class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 p-6">
          <div class="flex items-center justify-between">
            <button :class="buttonClass" class="text-B3 rounded-full bg-primary-dark px-3 py-1 text-white">
              邀約狀態
            </button>
            <div class="rounded-full bg-neutral-100 p-[10px]">
              <CollectionBtn />
            </div>
          </div>
          <div class="flex flex-col gap-6 rounded-xl bg-neutral-100  p-6 md:flex-row">
            <img
              src="https://s3-alpha-sig.figma.com/img/9e32/e3b7/c81f156a2b93e3a421109aa51f7c3a74?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=K1hk3rYu9v09zzjBWk-ZBToe5nlGuRWZpvA7ejGU6YNQOsHmdv6wlI55cEcnnvy5Ogs3abBp4F-PekueoJIa-Qri49ChzxaAS-sCmun7KjUDmODoM~pxYX8Jxg~dEet4e2U4TziDQRpkDV4kZi1scs6pb0-sV6~-e0HXCGTTPqrmR7iGrn3Rg-fIQql6e-MgJqkCcVMIRkENdVjc45kpG2fU52J5V570pB0HnQcqn--y-4mi0i925AX3S0XV6buVjfgfMphRVk6L~Ar0xqxAOMxtDMDByv5iE6O8rWgfD8Ab1EM-dLre2lEyj2Z4eoB7awN~4IZdMpKOGtKuNTYq2Q__"
              alt="s3-alpha-sig" class="size-[150px] flex-none rounded-full object-cover mx-auto">
            <div class="w-full space-y-6 text-start">
              <div class=" space-y-1">
                <h2 class=" text-H4 text-neutral-600" :class="{
                  'font-montserrat': !isChinese(
                    '張詠晴',
                  ),
                }">
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
              <div class="flex justify-between md:flex-row flex-col items-start gap-3">
                <div>
                  <a href="" class=" text-special-info">團膳業</a>
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
          <div class=" flex justify-end md:space-x-3 flex-wrap">
            <div v-for="(btn, index) in buttonList" :key="index">
              <utilsBtnWithIconComp :status="btn.status" @click="btn.click" />
            </div>
          </div>
        </section>
      </div>

      <div class=" py-12 font-montserrat">
        <UPagination :pageCount="6" :max="8" v-model="page" :total="items.length" :ui="{
          wrapper: 'flex items-center  justify-center ', base: 'border-none ring-0 shadow-none bg-white font-normal md:px-4 py-3  text-neutral-600 hover:bg-white',
          rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md', default: {
            size: 'sm',
            activeButton: {
              size: 'xl',
              active: true,
              activeClass: '!text-primary-dark',
            },
          }
        }">
          <template #prev="{ onClick }">
            <UTooltip text="Previous page">
              <UButton icon="i-heroicons-chevron-left" color="" :ui="{ rounded: 'rounded-full' }" :disabled="page === 1"
                class="rtl:[&_span:first-child]:rotate-180 me-2 bg-primary-light hover:bg-primary-light text-primary-dark disabled:text-neutral-400"
                :class="{ 'disabled:cursor-not-allowed': page === 1 }" @click="onClick" />
            </UTooltip>
          </template>
          <template #next="{ onClick }">
            <UTooltip text="Next page">
              <UButton icon="i-heroicons-chevron-right" color="primary" :ui="{ rounded: 'rounded-full' }"
                :disabled="page === Math.ceil(items.length / 6)"
                :class="{ 'cursor-not-allowed': page === Math.ceil(items.length / 6) }"
                class="rtl:[&_span:last-child]:rotate-180 ms-2 bg-primary-light hover:bg-primary-light text-primary-dark disabled:text-neutral-400 disabled:bg-primary-light"
                @click="onClick" />
            </UTooltip>
          </template>
        </UPagination>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
