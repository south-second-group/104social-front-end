<script setup>
import { auth } from '../apis/repositories/auth'

const renderObj = reactive({
  message: '',
  errorMessage: '',
})

async function verify() {
  try {
    const { message } = await auth.verify()
    renderObj.message = message
  }
  catch (error) {
    if (error)
      renderObj.errorMessage = '驗證失敗'
  }
}

onMounted(() => {
  verify()
})
</script>

<template>
  <div>
    <Logos class="mb-4" />

    <div class="ring-1">
      <h2>帳號驗證狀態</h2>

      <div>
        <div>{{ renderObj.message }}</div>
        <div>{{ renderObj.errorMessage }}</div>
      </div>
    </div>
    <RouterLink
      to="/login"
      class="mt-5 inline-block px-3 py-4 ring-1"
    >
      登入
    </RouterLink>

    <FigmaDemo />
  </div>
</template>
