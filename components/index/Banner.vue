<script setup>
const gender = ['男性', '女性', '其他']
const genderSelected = ref(null)

const searchType = ['男性', '女性', '其他']
const searchTypeSelected = ref(null)

const keyWord = ref(null)

const userDataStore = useUserDataStore()
const { userData } = storeToRefs(userDataStore)

/* Submit */
function submit() {
  // console.log('gender', genderSelected.value)
  // console.log('searchType', searchTypeSelected.value)
  // console.log('keyWord', keyWord.value)
}
</script>

<template>
  <!-- 手機版 -->
  <div class="IndexBanner w-full overflow-hidden lg:hidden">
    <!-- 手機版背景圖片 -->
    <div class="container relative -z-10 flex items-center justify-center">
      <NuxtImg
        src="/banner/bg-sm.png"
        alt="Banner_sm"
        class="size-full max-w-[300px]"
      />
    </div>

    <!-- 手機版搜尋元件 -->
    <div class="relative mt-[-52px] h-[486px]  bg-white/40 backdrop-blur-sm ">
      <!-- 背景球 -->
      <div class="absolute left-14 top-[-72px] -z-10 size-full">
        <NuxtImg
          src="/banner/bg-ball-sm.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>

      <!-- 上方漸層線條 -->
      <div class="h-[2px] w-full bg-gradient-to-r from-[#FF91A466] to-[#6788FF66]"></div>

      <!-- 搜尋元件 -->
      <div class="p-9">
        <div class="h-full space-y-9">
          <!-- 我是 -->
          <div
            v-if="!userData"
            class=""
          >
            <p class="text-left text-xl font-bold">
              我是
            </p>

            <!-- 搜尋欄位 -->
            <div class="mt-2 h-12 w-full rounded-lg border bg-white">
              <USelectMenu
                v-model="genderSelected"
                :options="gender"
                placeholder="請選擇性別"
                class="text-gray-400"
                size="xl"
                variant="none"
              />
            </div>
          </div>

          <!-- 我想尋找 -->
          <div class="">
            <p class="text-left text-xl font-bold">
              我想尋找
            </p>

            <!-- 搜尋欄位 -->
            <div class="mt-2 h-12 w-full rounded-lg border bg-white">
              <USelectMenu
                v-model="searchTypeSelected"
                :options="searchType"
                placeholder="請選擇性別"
                class="text-gray-400"
                size="xl"
                variant="none"
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
                v-model="keyWord"
                color="primary"
                variant="none"
                size="xl"
                placeholder="職業、興趣、星座..."
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
      <div class="h-[2px] w-full bg-gradient-to-r from-[#FF91A466] to-[#6788FF66]"></div>
    </div>

    <!-- 空位格 -->
    <div class="h-[48px]"></div>
  </div>

  <!-- 電腦版 -->
  <div class="IndexBanner hidden w-full overflow-hidden lg:block">
    <div class="container relative my-[171px]">
      <!-- 裝飾球_Large -->
      <div class="absolute left-[-155px] top-[-155px] w-[684px]">
        <NuxtImg
          src="/banner/bg-ball-large-lg.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>

      <!-- 裝飾球_Medium -->
      <div class="absolute left-[381px] top-[-179px] w-[305px]">
        <NuxtImg
          src="/banner/bg-ball-medium-lg.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>

      <!-- 裝飾球_Medium -->
      <div class="absolute right-[-406px] top-[-155px] w-[305px]">
        <NuxtImg
          src="/banner/bg-ball-medium-lg.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>

      <div class="box relative max-w-[634px] rounded-3xl bg-white/40 backdrop-blur-lg ">
        <!-- 定位圖片 1 -->
        <div class="absolute left-[-120px] top-1/2 w-[300px] -translate-x-full -translate-y-1/2">
          <NuxtImg
            src="/banner/bg-1-lg.png"
            alt="Banner_bg_1"
            class="size-full"
          />
        </div>

        <!-- 定位圖片 2 -->
        <div class="absolute right-[-70px] top-1/2 w-[300px] -translate-y-1/2 translate-x-full xl:right-[-122px]">
          <NuxtImg
            src="/banner/bg-2-lg.png"
            alt="Banner_bg_1"
            class="size-full"
          />
        </div>

        <!-- 定位圖片 3 -->
        <div class="absolute right-[-502px] top-1/2 w-[300px] -translate-y-1/2 translate-x-full">
          <NuxtImg
            src="/banner/bg-3-lg.png"
            alt="Banner_bg_1"
            class="size-full"
          />
        </div>

        <!-- 定位圖片 4 -->
        <div class="absolute right-[-882px] top-1/2 w-[300px] -translate-y-1/2 translate-x-full">
          <NuxtImg
            src="/banner/bg-4-lg.png"
            alt="Banner_bg_1"
            class="size-full"
          />
        </div>

        <div class="p-[60px]">
          <div class="h-full space-y-[60px]">
            <!-- 我是 -->
            <div
              v-if="!userData"
              class=""
            >
              <p class="text-left text-xl font-bold">
                我是
              </p>

              <!-- 搜尋欄位 -->
              <div class="mt-2 h-12 w-full rounded-lg border bg-white">
                <USelectMenu
                  v-model="genderSelected"
                  :options="gender"
                  placeholder="請選擇性別"
                  class="text-gray-400"
                  size="xl"
                  variant="none"
                />
              </div>
            </div>

            <!-- 我想尋找 -->
            <div class="">
              <p class="text-left text-xl font-bold">
                我想尋找
              </p>

              <!-- 搜尋欄位 -->
              <div class="mt-2 h-12 w-full rounded-lg border bg-white">
                <USelectMenu
                  v-model="searchTypeSelected"
                  :options="searchType"
                  placeholder="請選擇性別"
                  class="text-gray-400"
                  size="xl"
                  variant="none"
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
                  v-model="keyWord"
                  color="primary"
                  variant="none"
                  size="xl"
                  placeholder="職業、興趣、星座..."
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
</template>

<style scoped>
.box {
  position: relative;
}

.box::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 2px;
  opacity: 0.4;
  background: linear-gradient(90deg, #FE839A, #4A72FF);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>
