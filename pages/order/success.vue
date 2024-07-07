<script setup>
import { memberAPI } from '@/apis/repositories/member'

const router = useRouter()
const userDataStore = useUserDataStore()

function goSearchDate() {
  router.push('/search-date')
}
onMounted(async () => {
  const { data } = await memberAPI.getUserData()
  userDataStore.setIsSubscribe(data.userInfo.isSubscribe)
})
</script>

<template>
  <div class="success ">
    <div class="container flex flex-col items-center justify-center">
      <h2 class="mb-10 mt-20 text-4xl font-bold text-primary-dark lg:mt-32 lg:text-6xl">
        購買成功
      </h2>

      <GradientButton
        class="m-[2px] w-full px-4 lg:px-6"
        @click="goSearchDate"
      >
        <GradientButtonText
          text="立即解鎖評論"
          class="text-base lg:text-lg"
        />
      </GradientButton>

      <NuxtImg
        src="/order/success.svg"
        alt="訂購成功"
        class="w-full max-w-[800px]"
      />
    </div>
  </div>
</template>
