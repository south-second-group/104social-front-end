<script setup>
import { auth } from '../apis/repositories/auth'

const router = useRouter()
const toastMessage = ref('')
const toastType = ref('')

const userDataStore = useUserDataStore()
const { userData } = storeToRefs(userDataStore)
const { setUserData } = userDataStore

onMounted(async () => {
  try {
    const response = await auth.userData()
    if (response.status)
      setUserData(response.data)
  }
  catch (error) {
    // toast('請先登入，頁面跳轉中..', 'error')
    // setTimeout(() => {
    //   router.push('/login')
    // }, 1500)
  }
})

function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<template>
  <indexBanner />
  <indexSelectedMembers />
  <indexArticles />
  <indexStory />
  <indexSubmitStory />
  <indexCallToAction />
</template>
