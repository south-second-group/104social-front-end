<script setup>
import { memberAPI } from '@/apis/repositories/member'

definePageMeta({
  middleware: 'auth',
})

// toast
const toastMessage = ref('')
const toastType = ref('')
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

// const memberStore = useMemberStore()

// const event = useRequestEvent()

// const { data: result } = await useAsyncData(() => fetchWithCookie(event, '/api/with-cookie'))

// onMounted(() => console.log(document.cookie))

const { data, error } = await useAsyncData('userBasicInfo', () => {
  return memberAPI.getUserData()
})

// console.log('data', data)
// console.log('error', error)

// onMounted(() => {
//   memberStore.getMemberData()
// })
</script>

<template>
  <div class="w-full">
    <!-- 基本資料 -->
    <MemberBasicInfo />

    <!-- 填寫個人資料 -->
    <MemberPersonalInfo />
  </div>

  <Toast
    :toast-message="toastMessage"
    :toast-type="toastType"
  />
</template>
