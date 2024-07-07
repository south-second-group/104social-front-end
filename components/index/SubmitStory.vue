<script setup>
const userDataStore = useUserDataStore()
const { userData } = storeToRefs(userDataStore)

const isGifLoading = ref(true)

const router = useRouter()
function goToCreateStory() {
  router.push('/stores/create-story')
}

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 5000))
  isGifLoading.value = false
})
</script>

<template>
  <div class="w-full">
    <div
      class="relative size-full overflow-hidden rounded-t-[40px] bg-white py-12 md:rounded-t-[80px] md:py-[100px]"
    >
      <div class="absolute start-[-80px] top-[-80px]">
        <img
          src="../../assets/img/SubmitStory/blur/blur01.png"
          alt=""
        >
      </div>
      <div class="absolute end-0 top-0">
        <img
          src="../../assets/img/SubmitStory/blur/blur02.png"
          alt=""
        >
      </div>
      <div class="relative z-50 w-full">
        <div class="flex flex-col justify-end lg:flex-row">
          <div class="hidden w-full max-w-[312px] xl:block"></div>
          <div
            class="mb-10 me-3 ms-3 grow-0 rounded-3xl bg-zinc-50/40 p-4 md:p-10 lg:w-[746px] lg:shrink-0 xl:me-0 xl:ms-0"
          >
            <div class="text-start">
              <p class="mb-4 text-2xl font-bold text-zinc-950 md:text-[40px]">
                晒出你的幸福
              </p>
              <p class="text-xl text-zinc-600">
                不論你是在 104 緣來是你找到志同道合的另一半、穩交、結婚、Soul
                mate 或是 Mr./Ms. Right
                ，只要你現在很幸福，歡迎與我們分享，晒出你的幸福
              </p>
              <p class="mt-4 text-xl text-[#4A72FF]">
                成功刊登您的幸福故事，即可獲得你們的專屬紀念贈品。
              </p>
            </div>
            <div class="mt-5 w-full">
              <img
                v-show="userData"
                src="../../assets/img/SubmitStory/img03.png"
                alt=""
                class="w-[200px]"
              >
              <img
                v-show="!userData"
                src="../../assets/img/SubmitStory/img03.png"
                alt=""
                class="mx-auto w-[200px] md:mx-0 md:w-[400px]"
              >
            </div>
            <div v-show="userData">
              <!-- <button class="btn-linear-lg mt-6 hidden md:mt-5 md:block">
                <p>分享幸福案例1</p>
              </button>
              <button
                class="btn-linear-nav mx-auto mt-4 block h-[40px] min-w-[303px] md:mt-5 md:hidden"
              >
                <p>分享幸福案例</p>
              </button> -->
              <GradientButton
                class="m-[2px] w-full"
                @click="goToCreateStory"
              >
                <GradientButtonText text="分享幸福案例" />
              </GradientButton>
            </div>
          </div>
          <div class="ms-3 flex lg:h-[550px] lg:w-full xl:ms-6">
            <img
              v-if="isGifLoading"
              class="submit_story-inner-shadow-white size-full w-[50%] rounded-l-3xl object-cover lg:w-full"
              src="../../assets/img/SubmitStory/img01.png"
              alt=""
            >
            <img
              v-else
              class="submit_story-inner-shadow-white size-full w-[50%] rounded-l-3xl object-cover lg:w-full "
              src="../../assets/img/SubmitStory/img01-animate.gif"
              alt=""
            >

            <img
              v-if="isGifLoading"
              class="submit_story-inner-shadow-primary size-full w-[50%] object-cover lg:hidden lg:w-full xl:block"
              src="../../assets/img/SubmitStory/img02.png"
              alt=""
            >
            <img
              v-else
              class="submit_story-inner-shadow-primary size-full w-[50%] object-cover lg:hidden lg:w-full  xl:block"
              src="../../assets/img/SubmitStory/img02-animate.gif"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
