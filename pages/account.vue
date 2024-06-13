<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../apis/repositories/auth'

// 儲存會員資料
const state = reactive({
  nickName: '',
  isShow: false,
  // userId: '',
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
      // state.userId = response.data.userId
    }
  }
  catch (error) {
    toast('請先登入，頁面跳轉中..', 'error')
    setTimeout(() => {
      router.push('/login')
    }, 1500)
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
// async function handleInputChange(event) {
//   try {
//     const newValue = event.target.value
//     // 呼叫 AddUserData 的 post API
//     const response = await auth.addUserData({
//       userId: state.userId,
//       nickName: newValue,
//       isShow: state.isShow,
//     })
//     if (response.status === true)
//       toast('資料已更新', 'success')
//   }
//   catch (error) {
//     const errorMessage = error.response._data.message
//     toast(errorMessage, 'error')
//   }
// }

// toast
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<template>
  <div class="w-full">
    <!-- 會員資料 -->
    <div
      class="mx-auto flex max-w-custom-container justify-between"
      style="margin-top: 100px;"
    >
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
                    0909000000
                    <!-- {{ state.userId }} -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <div class="grid grid-flow-col grid-rows-3 gap-3">
        <button
          class=" gray-btn relative px-12 py-2"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>配對設定</b>
          <NuxtLink
            class=" absolute inset-0"
            to="/member/match"
          />
        </button>
        <button
          class=" relative rounded bg-gray-200 px-12 py-2  text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>我的約會</b>
          <NuxtLink
            class=" absolute inset-0"
            to="/member/invite/InvitePage"
          />
        </button>
        <button
          class=" relative rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>配對結果</b>
        </button>
        <button
          class=" relative rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>我留下的評價</b>
          <NuxtLink
            class=" absolute inset-0"
            to="/member/comment/CommentPage"
          />
        </button>
        <button
          class=" relative rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>我的收藏</b>
          <NuxtLink
            class=" absolute inset-0"
            to="/member/CollectionPage"
          />
        </button>
        <button
          class=" relative rounded bg-gray-200 px-12 py-2 text-gray-700"
          style="border-radius: 100px;background-color: #F5F5F5;"
        >
          <b>拒絕來信</b>
          <NuxtLink
            class=" absolute inset-0"
            to="/member/BanListPage"
          />
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
  <div class="flex">
    <div
      v-if="toastMessage"
      class="toast"
      :class="[toastType === 'success' ? 'success' : 'error']"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<style scoped>
.gray-btn {
    border-radius: 100px;
    background-color: #F5F5F5;
  }
  .toast.show {
    display: block;
  }
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
    display: block;
  }
  .toast.success {
    background-color: #4caf50;
  }
  .toast.error {
    background-color: #f44336;
  }
</style>
