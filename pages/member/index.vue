<script setup>
definePageMeta({
  middleware: 'auth',
})

useHead({
  title: '會員資料',
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

const memberStore = useMemberStore()

// const { data, error } = await useAsyncData('userBasicInfo', () => {
//   return memberStore.getMemberData()
// })

onMounted(() => {
  memberStore.getMemberData()
})
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
