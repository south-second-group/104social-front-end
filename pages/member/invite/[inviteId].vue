<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { inviteListApi } from '~/apis/repositories/inviteList'

const route = useRoute()
const router = useRouter()

// Loading 狀態
const isLoaded = ref(false)

// 取得路由id
const inviteId = route.params.inviteId

// 邀約會員詳細資料
const invitationDetails = ref({})

async function getInviteDetail() {
  isLoaded.value = true
  try {
    const response = await inviteListApi.getInviteWho(inviteId)

    invitationDetails.value = response.data || {}
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoaded.value = false
  }
}

// 取得評價分數
function getRating() {
  return invitationDetails.value.profileByInvitedUser.userStatus.rating || 0
}

watchEffect(() => {
  getInviteDetail()
})
</script>

<template>
  <div class="container p-3 text-start md:p-12">
    <div class="mx-auto max-w-[700px]">
      <!-- 圖片 -->
      <USkeleton
        v-if="isLoaded === true"
        class="mx-auto mt-4 h-[300px] w-[250px]"
      />
      <img
        v-else
        :src="invitationDetails.profileByInvitedUser.photoDetails.photo"
        class="mx-auto size-[150px] rounded-full object-cover object-top"
      >

      <h1 class="text-H4 mt-24">
        個人資訊
      </h1>

      <div
        v-if="!isLoaded"
        class="mt-6"
      >
        <div class="mb-4 grid w-full grid-cols-2 gap-6 gap-y-3">
          <div class="flex h-[35px] items-center">
            <!-- 姓名 -->
            <label class="w-24 align-middle">姓名：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  invitationDetails.profileByInvitedUser.nickNameDetails.nickName,
                ),
              }"
            >
              {{
                invitationDetails.profileByInvitedUser.nickNameDetails.nickName
              }}
            </span>
          </div>

          <!-- 年收入 -->
          <div class="mb-2 flex h-[35px] items-center">
            <label class="w-24 align-middle">年收入：</label>
            <span>{{
              invitationDetails.profileByInvitedUser.incomeDetails.income || 不透露
            }}</span>
          </div>

          <!-- 工作 -->
          <div class="items中心 mb-2 flex h-[35px]">
            <label class="w-24 align-middle">工作：</label>
            <span>{{
              invitationDetails.profileByInvitedUser.jobDetails.job || 不透露
            }}</span>
          </div>

          <!-- Line ID -->
          <div class="items中心 mb-2 flex h-[35px] font-montserrat">
            <label class="w-24 align-middle">Line ID：</label>
            <span>{{
              invitationDetails.profileByInvitedUser.lineDetails.lineId || 不透露
            }}</span>
          </div>

          <!-- 標籤 -->
          <div class="col-span-2">
            <label
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  invitationDetails.profileByInvitedUser.nickNameDetails.nickName,
                ),
              }"
            >
              {{
                invitationDetails.profileByInvitedUser.nickNameDetails.nickName
              }} 的標籤：
            </label>
            <div class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md">
              <UBadge
                v-for="tag in invitationDetails.profileByInvitedUser.tags || []"
                :key="tag"
                class="btn-withIcon-outline-rwd pointer-events-none !rounded-lg !px-1 !py-[2px]"
              >
                <p
                  class="!text-[10px]"
                  :class="{
                    'font-montserrat': !useIsChineseFunc(tag),
                  }"
                >
                  {{ tag }}
                </p>
              </UBadge>
            </div>
          </div>
        </div>

        <!-- 簡介 -->
        <div class="mt-12 w-full space-y-3">
          <label
            class="text-H4"
            for=""
          >邀請人簡介</label>
          <p class="rounded-md border-2 p-3">
            {{
              invitationDetails.profileByInvitedUser.introDetails.intro || 不透露
            }}
          </p>
        </div>

        <!-- 整體評價 -->
        <div class="mt-12 w-full space-y-3">
          <label class="text-H4">整體評價</label>
          <div class="flex">
            <icon-heroicons:heart-solid
              v-for="heart in 5"
              :key="heart"
              class="size-10"
              :class="{
                'text-primary-dark': heart <= getRating(),
                'text-gray-300': heart > getRating(),
              }"
            />
          </div>
        </div>

        <!-- 返回上一頁 -->
        <section class="mt-12 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            @click="router.go(-1)"
          >
            <p>返回我的邀约</p>
          </button>
        </section>
      </div>

      <!-- Loading -->
      <div
        v-else
        class="mt-6 space-y-3"
      >
        <USkeleton
          v-for="item in 4"
          :key="item"
          class="h-8 w-full bg-neutral-300"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
