<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../apis/repositories/auth'

// 儲存會員資料
const state = reactive({
  nickName: '',
  isShow: false,
  userId: '',
})

const router = useRouter()
const toastMessage = ref('')
const toastType = ref('')

// 頁面加載時調用 API 獲取會員資料
onMounted(async () => {
  try {
    const response = await auth.userData()
    if (response.status === true) {
      const userData = response.data
      state.nickName = userData.nickNameDetails.nickName
      state.isShow = userData.nickNameDetails.isShow
      state.userId = response.data.userId
    }
  }
  catch (error) {
    toast('請先登入，頁面跳轉中..', 'error')
    // setTimeout(() => {
    //   router.push('/login')
    // }, 1500)
  }
})

// 處理表單驗證
function validate(state) {
  const errors = []
  if (!state.nickName)
    errors.push({ path: 'nickName', message: '姓名不能為空' })

  return errors
}

// 點擊完成編輯按鈕
async function userDataPatch() {
  try {
    const response = await auth.userDataPatch({
      nickName: state.nickName,
      isShow: state.isShow,
    })
    if (response.status === true)
      toast('儲存成功！', 'success')
  }
  catch (error) {
    const errorMessage = error.response._data.message
    toast(errorMessage, 'error')
  }
}

// 當用戶修改資料時調用 AddUserData 的 post API
async function handleInputChange(event) {
  try {
    const newValue = event.target.value
    // 呼叫 AddUserData 的 post API
    const response = await auth.addUserData({
      userId: state.userId,
      nickName: newValue,
      isShow: state.isShow,
    })
    if (response.status === true)
      toast('資料已更新', 'success')
  }
  catch (error) {
    const errorMessage = error.response._data.message
    toast(errorMessage, 'error')
  }
}

// toast
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

// 功能按鈕
const functionButtonsList = [
  {
    title: '配對設定',
    path: '/account/match-setting',
  },
  {
    title: '我的約會',
    path: '/account/my-date',
  },
  {
    title: '配對結果',
    path: '/account/match-result',
  },
  {
    title: '我留下的評價',
    path: '/account/my-comment',
  },
  {
    title: '我的收藏',
    path: '/account/my-favorite',
  },
  {
    title: '拒絕來信',
    path: '/account/reject-letter',
  },
]

const value = ref('')

// toggle
const selected = ref(false)

// 個人詳細資料
const personalDetails = reactive([
  {
    label: '姓名',
    value: '',
    placeholder: '請輸入姓名',
    isShow: false,
  },
  {
    label: '年收入',
    value: '',
    placeholder: '請輸入年收入',
    isShow: false,
  },
  {
    label: '電話',
    value: '',
    placeholder: '請輸入電話',
    isShow: false,
  },
  {
    label: 'Line ID',
    value: '',
    placeholder: '請輸入Line ID',
    isShow: false,
  },
  {
    label: '公司',
    value: '',
    placeholder: '請輸入公司名稱',
    isShow: false,
  },
  {
    label: '職業',
    value: '',
    placeholder: '請輸入職業',
    isShow: false,
  },
])
</script>

<template>
  <div class="w-full">
    <!-- 基本資料 -->
    <section class="container mt-12 space-y-4 lg:flex lg:space-x-6 lg:space-y-0">
      <!-- 基本資料 -->
      <div class="flex w-full space-x-6 rounded-[10px] bg-[#FFF5F5] p-4 lg:p-6">
        <div class="w-[100px] lg:w-[120px]">
          <img
            src="~assets/img/member/memberCentre/UserSticker.png"
            alt="UserSticker Image"
            class="size-full object-cover"
          >
        </div>

        <div class="flex flex-col justify-center text-left">
          <h6
            class="lg:text-H4 text-xl font-bold text-primary-dark"
          >
            {{ state.nickName }}
          </h6>
          <p
            class="mt-1 block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
          >
            {{ state.userId }}
          </p>
        </div>
      </div>

      <!-- 會員狀態 -->
      <div class=" flex w-full items-end justify-between rounded-[10px] bg-neutral-100 p-4 text-left lg:p-6">
        <ul class="">
          <li class="flex">
            <h4 class="text-B2 mb-4 text-[#52525B]">
              會員評價｜
            </h4>
            <b>4.3</b>
          </li>

          <li class="flex">
            <h4 class="text-B2 mb-4 text-[#52525B]">
              配對狀態｜
            </h4>
            <b>配對中</b>
          </li>

          <li class="flex">
            <h4 class="text-B2 mb-4 text-[#52525B]">
              剩餘點數｜
            </h4>
            <b>120 點</b>
          </li>
        </ul>

        <button class="btn-linear-nav block">
          儲值
        </button>
      </div>

      <!-- 功能按鈕 -->
      <div class="grid w-full grid-flow-col grid-rows-3 gap-x-6 gap-y-2">
        <button
          v-for="(button) in functionButtonsList"
          :key="button.title"
          class="w1/2 rounded-full bg-gray-200 py-3 font-bold"
        >
          {{ button.title }}
        </button>
      </div>
    </section>

    <!-- 填寫個人資料 -->
    <section class="container mt-12 space-y-4">
      <h2 class="text-left text-xl font-bold text-primary-dark lg:text-2xl">
        個人資料
      </h2>

      <!-- 編輯頭貼 -->
      <div class="!mt-6 space-y-4 lg:flex lg:h-[348px] lg:space-x-4 lg:space-y-0">
        <div class=" w-full rounded-xl bg-neutral-100 p-4 lg:flex lg:space-x-6 lg:p-6">
          <div class="h-[240px] overflow-hidden rounded-xl lg:h-full lg:w-[400px]">
            <NuxtImg
              src="/member/member-sm-02.png"
              alt="UserSticker Image"
              class="size-full object-cover"
            />
          </div>

          <div class="mt-4 flex items-center justify-between lg:mt-0 lg:flex-col">
            <button class="h-10 w-[138px] rounded-full ring-1">
              上傳照片
            </button>

            <div class="flex items-center space-x-1">
              <UToggle
                v-model="selected"
                color="primary"
              />
              <span>揭露</span>
            </div>
          </div>
        </div>

        <!-- 編輯自我介紹 -->
        <div class=" w-full rounded-[10px] bg-neutral-100 p-4 lg:flex lg:space-x-6 lg:p-6">
          <UTextarea
            v-model="value"
            placeholder="請輸入自我介紹..."
            :rows="14"
            class="size-full lg:w-2/3"
          />

          <div class="mt-4 flex items-center justify-end lg:mt-0 lg:flex-col">
            <div class="flex items-center space-x-1">
              <UToggle
                v-model="selected"
                color="primary"
              />
              <span>揭露</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 編輯詳細個資 -->
      <ul class="w-full space-y-4 rounded-[10px] bg-neutral-100 p-4 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6 lg:space-y-0 lg:p-6">
        <li
          v-for="(personalItem) in personalDetails"
          :key="personalItem.label"
          class="grid grid-cols-5 gap-x-2"
        >
          <UFormGroup
            :label="personalItem.label"
            class="col-span-3 lg:col-span-4"
          >
            <UInput
              :placeholder="personalItem.placeholder"
              size="xl"
              :value="personalItem.value"
            />
          </UFormGroup>

          <div class="col-span-2 flex items-end space-x-1 pb-2 lg:col-span-1">
            <UToggle
              v-model="personalItem.isShow"
              color="primary"
            />
            <span>揭露</span>
          </div>
        </li>
      </ul>

      <!-- 我的標籤 -->
      <div class="h-[291px] w-full rounded-[10px] bg-neutral-100 p-4 lg:h-[214px]">
        <h2 class="text-start text-xl font-bold">
          我的標籤
        </h2>
        <p class="text-start text-sm text-neutral-400">
          在 # 後面輸入您的性格特徵或您感興趣的話題
        </p>
      </div>

      <!-- 個人狀態 -->
      <div class="h-[182px] w-full rounded-[10px] bg-slate-400 lg:h-[222px]"></div>

      <!-- 儲存按鈕 -->
      <div class="flex justify-end space-x-3">
        <button class="rounded-full px-5 py-2 ring-1 lg:px-[118px] lg:py-3">
          取消編輯
        </button>
        <button class="rounded-full px-5 py-2 ring-1 lg:px-[118px] lg:py-3">
          完成編輯
        </button>
      </div>
    </section>
  </div>

  <div class="hidden w-full">
    <!-- 會員資料 -->
    <div
      class="mx-auto flex max-w-custom-container justify-between"
    >
      <!-- 個人資料 -->
      <div
        class="relative flex w-96 flex-col rounded-xl bg-clip-border text-gray-700"
        style="background-color: #FFF5F5;border: 0px;"
      >
        <div class="p-6">
          <div
            class="divide-y"
          >
            <div class="flex items-center justify-between py-3 last:pb-0">
              <div class="flex  gap-x-3">
                <img
                  src="~assets/img/member/memberCentre/UserSticker.png"
                  alt="UserSticker Image"
                  class="size-full"
                >
                <div class="text-left">
                  <h6
                    class="text-H4"
                  >
                    {{ state.nickName }}
                  </h6>
                  <p
                    class="block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
                  >
                    {{ state.userId }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 會員狀態 -->
      <div
        class="relative flex w-96 flex-col rounded-xl bg-clip-border text-gray-700"
        style="background-color:#FAFAFA;border: 0px;"
      >
        <div class="p-6">
          <div class="flex items-end justify-between text-left last:pb-0">
            <div>
              <h4
                class="text-B2"
                style="margin-bottom: 16px"
              >
                會員評價｜<b>4.3</b>
              </h4>
              <h4
                class="text-B2"
                style="margin-bottom: 16px"
              >
                配對狀態｜<b>配對中</b>
              </h4>
              <h4
                class="text-B2 mb-0"
                style="margin-bottom: 16px"
              >
                剩餘點數｜<b>120 點</b>
              </h4>
            </div>
            <button class="btn-linear-nav block">
              <p>儲值</p>
            </button>
          </div>
        </div>
      </div>

      <!-- 功能按鈕 -->
      <div class="grid grid-flow-col grid-rows-3 gap-3">
        <button
          class="gray-btn px-12 py-2"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>配對設定</b>
        </button>
        <button
          class="rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>我的約會</b>
        </button>
        <button
          class="rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>配對結果</b>
        </button>
        <button
          class="rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>我留下的評價</b>
        </button>
        <button
          class="rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>我的收藏</b>
        </button>
        <button
          class="rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>拒絕來信</b>
        </button>
      </div>
    </div>

    <!-- 填寫個人資料 -->
    <div
      class="mx-auto max-w-custom-container"
      style="margin-top: 76px;margin-bottom: 76px;"
    >
      <h2 class="text-H4 mb-[24px] text-start text-primary-dark">
        個人資料
      </h2>
      <div
        class="rounded-3xl p-[24px]"
        style="background-color: #FAFAFA;"
      >
        <UForm
          :validate="validate"
          :state="state"
          @submit="userDataPatch"
        >
          <div class="px-3 md:w-1/2">
            <UFormGroup
              label="姓名"
              name="nickName"
            >
              <UInput
                v-model="state.nickName"
                placeholder="請輸入姓名"
                @input="handleInputChange"
              />
            </UFormGroup>
            <UFormGroup
              name="isShow"
              class="mt-2 flex"
            >
              <UToggle v-model="state.isShow" /> 揭露
            </UFormGroup>
          </div>
        </UForm>
      </div>
      <!-- 儲存按鈕 -->
      <div class="mt-2 w-full text-center">
        <button
          type="submit"
          class="btn-linear-md float-end"
          style="margin-top: 24px;"
          @click="userDataPatch"
        >
          <p>完成編輯</p>
        </button>
      </div>
    </div>
  </div>

  <!-- Alert 通知 -->
  <Toast
    :toast-message="toastMessage"
    :toast-type="toastType"
  />
</template>
