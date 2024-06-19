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
  // 每次點擊按鈕都會切換編輯狀態
  memberStore.toggleEditStatus(memberStore.editStatus)

  // 如果點擊立即編輯，不需要執行修改資料的 API
  if (memberStore.editStatus)
    return
  try {
    const res = await memberStore.changeInfo()
    toast(res.message, 'success')
  }
  catch (error) {
    console.error(error)
    toast(error.message, 'error')
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
    <div class="w-full justify-end space-y-4 lg:flex lg:space-x-3 lg:space-y-0">
      <GradientButtonRevert
        v-if="memberStore.editStatus"
        class="m-[2px] w-full px-[118px] lg:py-3"
        @click="memberStore.toggleEditStatus(true, true)"
      >
        <GradientButtonTextRevert
          text="取消編輯"
          class="text-base"
        />
      </GradientButtonRevert>

      <GradientButton
        class="m-[2px] w-full px-[118px] lg:py-3"
        @click="submit"
      >
        <GradientButtonText
          :text="memberStore.editStatus ? '完成編輯' : '立即編輯'"
          class="text-base"
        />
      </GradientButton>
    </div>
  </section>

  <!-- Alert 通知 -->
  <Toast
    :toast-message="toastMessage"
    :toast-type="toastType"
  />
</template>
