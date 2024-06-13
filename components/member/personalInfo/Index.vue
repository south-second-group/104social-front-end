<script setup>
const memberStore = useMemberStore()

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

async function submit() {
  try {
    const res = await memberStore.changeInfo()
    toast(res.message, 'success')
  }
  catch (error) {
    console.error(error)
    toast('用戶資訊修改失敗', 'error')
  }
}
</script>

<template>
  <section class="container mt-12 space-y-4">
    <h2 class="text-left text-xl font-bold text-primary-dark lg:text-2xl">
      個人資料
    </h2>

    <!-- 編輯頭貼 -->
    <div class="!mt-6 space-y-4 lg:flex lg:h-[348px] lg:space-x-4 lg:space-y-0">
      <MemberPersonalInfoAvatar />

      <MemberPersonalInfoIntro />
    </div>

    <!-- 編輯詳細個資 -->
    <MemberPersonalInfoDetails />

    <!-- 我的標籤 -->
    <MemberPersonalInfoTags />

    <!-- 個人狀態 -->
    <MemberPersonalInfoStatusSettings />

    <!-- 儲存按鈕 -->
    <div class="flex justify-end space-x-3">
      <button class="rounded-full px-5 py-2 ring-1 lg:px-[118px] lg:py-3">
        取消編輯
      </button>
      <button
        class="rounded-full px-5 py-2 ring-1 lg:px-[118px] lg:py-3"
        @click="submit"
      >
        完成編輯
      </button>
    </div>
  </section>

  <!-- Alert 通知 -->
  <Toast
    :toast-message="toastMessage"
    :toast-type="toastType"
  />
</template>
