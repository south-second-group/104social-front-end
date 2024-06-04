<script setup>
import { ref } from 'vue'
import { auth } from '../apis/repositories/auth'

definePageMeta({
  middleware: 'auth',
})

const toastMessage = ref('')
const toastType = ref('')

// 儲存會員資料

const { data: userBasicInfo } = await useAsyncData('userBasicInfo', () => {
  return auth.getUserData()
  // return $fetch('https://104-dev.zeabur.app/api/v1/user-data', {
  //   credentials: 'include',
  // })
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
      nickName: userBasicInfo.nickName,
      isShow: userBasicInfo.isShow,
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
      userId: userBasicInfo.userId,
      nickName: newValue,
      isShow: userBasicInfo.isShow,
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
</script>

<template>
  <div class="w-full">
    <!-- 基本資料 -->
    <MemberBasicInfo
      :user-nick-name="userBasicInfo?.data.nickNameDetails.nickName"
      :user-id="userBasicInfo?.data.userId"
      :rating="userBasicInfo?.data.userStatus.rating"
      :is-match="userBasicInfo?.data.userStatus.isMatch"
      :point="userBasicInfo?.data.userStatus.point"
    />

    <!-- 填寫個人資料 -->
    <MemberPersonalInfo :point="userBasicInfo?.data.userStatus.point" />
  </div>

  <!-- Alert 通知 -->
  <Toast
    :toast-message="toastMessage"
    :toast-type="toastType"
  />
</template>
