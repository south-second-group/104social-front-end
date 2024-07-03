<script setup>
const searchCriteriaStore = useSearchCriteriaStore()
const { searchForm, genderOption } = storeToRefs(searchCriteriaStore)

const router = useRouter()
const isDataLoading = ref(true)
const isOneGifLoading = ref(true)
const isTwoGifLoading = ref(true)

function submit() {
  router.push('/search-date')
}

onMounted(async () => {
  isDataLoading.value = false

  setTimeout(() => {
    isOneGifLoading.value = false
  }, 2000)
  setTimeout(() => {
    isTwoGifLoading.value = false
  }, 4000)
})
</script>

<template>
  <main>
    <!-- SEO搜尋結果大圖 -->
    <NuxtImg
      src="https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2F104%E7%B7%A3%E4%BE%86%E5%A6%82%E6%AD%A4-%E5%B0%81%E9%9D%A2.png?alt=media&token=3f17c7e4-a691-46f5-9943-5b953ccef2af"
      alt="104social index"
      class=" absolute left-0 top-0 w-[300px] -translate-x-full"
    />
    <img
      src="https://firebasestorage.googleapis.com/v0/b/my-first-project-1110913.appspot.com/o/104social%2F104%E7%B7%A3%E4%BE%86%E5%A6%82%E6%AD%A4-%E5%B0%81%E9%9D%A2.png?alt=media&token=3f17c7e4-a691-46f5-9943-5b953ccef2af"
      alt="104social index"
      class=" absolute left-0 top-0 w-[300px] -translate-x-full"
    >
    <!-- 手機版 -->
    <div class="IndexBanner w-full overflow-hidden lg:hidden">
      <!-- 手機版背景圖片 -->
      <div class="container relative -z-10 flex items-center justify-center">
        <NuxtImg
          src="/banner/bg-sm.png"
          alt="裝飾"
          class="size-full max-w-[300px]"
        />
      </div>
      <!-- 手機版搜尋元件 -->
      <div class="relative mt-[-52px] h-[486px] bg-white/40 backdrop-blur-sm">
        <!-- 背景球 -->
        <div class="absolute left-14 top-[-72px] -z-10 size-full">
          <NuxtImg
            src="/banner/bg-ball-sm.png"
            alt="裝飾"
            class="size-full"
          />
        </div>
        <!-- 上方漸層線條 -->
        <div
          class="h-[2px] w-full bg-gradient-to-r from-[#FF91A466] to-[#6788FF66]"
        ></div>
        <!-- 搜尋元件 -->
        <div class="p-9">
          <div class="h-full space-y-9">
            <!-- 我想尋找 -->
            <div class="">
              <p class="text-left text-xl font-bold">
                我想尋找
              </p>
              <!-- 搜尋欄位 -->
              <div class="mt-2 h-12 w-full rounded-lg border bg-white">
                <USelectMenu
                  v-if="!isDataLoading"
                  v-model="searchForm.gender"
                  :options="genderOption"
                  placeholder="請選擇性別"
                  class="text-gray-400"
                  size="xl"
                  variant="none"
                  value-attribute="value"
                  option-attribute="label"
                />
              </div>
            </div>
            <!-- 尋找對象的關鍵字 -->
            <div class="">
              <p class="text-left text-xl font-bold">
                尋找對象的關鍵字
              </p>
              <!-- 搜尋欄位 -->
              <div class="mt-2 h-12 w-full rounded-lg border bg-white">
                <UInput
                  v-if="!isDataLoading"
                  v-model="searchForm.keyWord"
                  color="primary"
                  variant="none"
                  size="xl"
                  placeholder="職業、興趣..."
                />
              </div>
            </div>
            <!-- 搜尋按鈕 -->
            <GradientButton
              class="m-[2px] w-full"
              @click="submit"
            >
              <GradientButtonText text="搜尋" />
            </GradientButton>
          </div>
        </div>
        <!-- 上方漸層線條 -->
        <div
          class="h-[2px] w-full bg-gradient-to-r from-[#FF91A466] to-[#6788FF66]"
        ></div>
      </div>
      <!-- 空位格 -->
      <div class="h-[48px]"></div>
    </div>
    <!-- 電腦版 -->
    <div class="IndexBanner hidden w-full overflow-hidden lg:block">
      <div class="container relative my-[171px]">
        <!-- 裝飾球_Large -->
        <div
          class="animate-scale-up-loop decoration-ball-1 absolute left-[-155px] top-[-145px] w-[684px]"
        >
          <NuxtImg
            src="/banner/bg-ball-large-lg.png"
            alt="裝飾"
            class="size-full"
          />
        </div>
        <!-- 裝飾球_Medium -->
        <div
          class="animate-scale-up-loop decoration-ball-2 absolute left-[381px] top-[-130px] w-[305px]"
        >
          <NuxtImg
            src="/banner/bg-ball-medium-lg.png"
            alt="裝飾"
            class="size-full"
          />
        </div>
        <!-- 裝飾球_Medium -->
        <div
          class="animate-scale-up-loop decoration-ball-3 absolute right-[-406px] top-[-155px] w-[305px]"
        >
          <NuxtImg
            src="/banner/bg-ball-medium-lg.png"
            alt="裝飾"
            class="size-full"
          />
        </div>
        <div
          class="box relative max-w-[634px] rounded-3xl bg-white/40 backdrop-blur-lg"
        >
          <!-- 定位圖片 1 -->
          <div
            class="absolute left-[-120px] top-1/2 w-[300px] -translate-x-full -translate-y-1/2"
          >
            <NuxtImg
              src="/banner/bg-1-lg.png"
              alt="交友軟體 104緣來如此 代表圖 首頁圖 示意圖 Banner_sm"
              class="size-full"
            />
          </div>
          <!-- 定位圖片 2 -->
          <div
            v-if="isOneGifLoading"
            class="absolute right-[-70px] top-1/2 w-[300px] -translate-y-1/2 translate-x-full xl:right-[-122px]"
          >
            <NuxtImg
              src="/banner/bg-2-lg.png"
              alt="裝飾"
              class="size-full"
            />
          </div>
          <div
            v-show="!isOneGifLoading"
            class="absolute right-[-70px] top-1/2 h-[500px] w-[300px] -translate-y-1/2 translate-x-full overflow-hidden rounded-full border-[3px] border-[#f4d6e4] xl:right-[-122px]"
          >
            <NuxtImg
              src="/banner/bg-2-lg-animate.gif"
              alt="裝飾"
              class="size-full"
            />
          </div>
          <!-- 定位圖片 3 -->
          <div
            v-if="isTwoGifLoading"
            class="absolute right-[-502px] top-1/2 w-[300px] -translate-y-1/2 translate-x-full"
          >
            <NuxtImg
              src="/banner/bg-3-lg.png"
              alt="裝飾"
              class="size-full"
            />
          </div>
          <div
            v-show="!isTwoGifLoading"
            class="absolute right-[-502px] top-1/2 h-[500px] w-[300px] -translate-y-1/2 translate-x-full overflow-hidden rounded-full border-[3px] border-[#f4d6e4]"
          >
            <NuxtImg
              src="/banner/bg-3-lg-animate.gif"
              alt="Banner_bg_1"
              class="size-full"
            />
          </div>
          <!-- 定位圖片 4 -->
          <div
            class="absolute right-[-882px] top-1/2 w-[300px] -translate-y-1/2 translate-x-full"
          >
            <NuxtImg
              src="/banner/bg-4-lg.png"
              alt="裝飾"
              class="size-full"
            />
          </div>
          <div class="p-[60px]">
            <div class="h-full space-y-[60px]">
              <!-- 我想尋找 -->
              <div class="">
                <p class="text-left text-xl font-bold">
                  我想尋找
                </p>
                <!-- 搜尋欄位 -->
                <div class="mt-2 h-12 w-full rounded-lg border bg-white">
                  <USelectMenu
                    v-if="!isDataLoading"
                    v-model="searchForm.gender"
                    :options="genderOption"
                    placeholder="請選擇性別"
                    class="text-gray-400"
                    size="xl"
                    variant="none"
                    value-attribute="value"
                    option-attribute="label"
                  />
                </div>
              </div>
              <!-- 尋找對象的關鍵字 -->
              <div class="">
                <p class="text-left text-xl font-bold">
                  尋找對象的關鍵字
                </p>
                <!-- 搜尋欄位 -->
                <div class="mt-2 h-12 w-full rounded-lg border bg-white">
                  <UInput
                    v-if="!isDataLoading"
                    v-model="searchForm.keyWord"
                    color="primary"
                    variant="none"
                    size="xl"
                    placeholder="職業、興趣..."
                  />
                </div>
              </div>
              <!-- 搜尋按鈕 -->
              <GradientButton
                class="m-[2px] w-full"
                @click="submit"
              >
                <GradientButtonText text="搜尋" />
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.box {
  position: relative;
}

.box::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 2px;
  opacity: 0.4;
  background: linear-gradient(90deg, #fe839a, #4a72ff);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

@keyframes scaleUp {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scaleUpLoop {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
    filter: blur(5px);
  }
}

.animate-scale-up-loop {
  animation: scaleUp 1s ease-out forwards,
    scaleUpLoop 5s ease-in-out infinite 3s;
}

.animate-scale-up {
  animation: scaleUp 0.4s ease-in-out forwards;
}

.decoration-ball-1 {
  animation-delay: 0ms;
}

.decoration-ball-2 {
  animation-delay: 1300ms;
}

.decoration-ball-3 {
  animation-delay: 2100ms;
}
</style>
