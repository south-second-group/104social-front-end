<script setup>
import { inviteListApi } from '~/apis/repositories/inviteList'

const route = useRoute()
const router = useRouter()

// loading 狀態
const isLoaded = ref(false)

// 取得路由參數
const inviteId = route.params._id
const type = route.query.type

// 會員詳細資料
const invitationDetails = ref(null)
async function getInviteDetail() {
  isLoaded.value = false
  try {
    let response
    if (type === 'who') {
      response = await inviteListApi.getInviteWho(inviteId)
      invitationDetails.value = response.data || []
    }
    else if (type === 'me') {
      response = await inviteListApi.getInviteMe(inviteId)
      invitationDetails.value = response.data || []
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoaded.value = true
  }
}

// 取得評價分數
// function getRating() {
//   if (type === 'who')
//     return invitationDetails.value.profileByInvitedUser.userStatus.rating || 0
//   else
//     return invitationDetails.value.profileByUser.userStatus.rating || 0
// }

onMounted(() => {
  getInviteDetail()
})
</script>

<template>
  <div class="container p-3 text-start md:p-12">
    <div class="mx-auto max-w-[700px]">
      <!-- 圖片 -->
      <USkeleton
        v-if="!isLoaded"
        class="mx-auto mt-4 h-[300px] w-[250px]"
      />
      <img
        v-else
        :src="type === 'who'
          ? invitationDetails.profileByInvitedUser.photoDetails.photo
          : invitationDetails.profileByUser.photoDetails.photo"
        class="mx-auto size-[150px] rounded-full object-cover object-top"
      >
      <!-- <utilsPhotoCaroucel
        v-else
        :photo-details="type === 'who'
          ? invitationDetails.profileByInvitedUser[0].photoDetails.photo
          : invitationDetails.profileByUser[0].photoDetails.photo"
      /> -->

      <h1 class="text-H4 mt-24">
        {{ type === 'who' ? '邀請人資訊' : '被邀請人資訊' }}
      </h1>

      <div
        v-if="isLoaded"
        class="mt-6"
      >
        <div class="mb-4 grid w-full grid-cols-2 gap-6 gap-y-3">
          <div class="flex h-[35px] items-center">
            <!-- 姓名 -->
            <label class="w-24 align-middle">姓名：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  type === 'who'
                    ? invitationDetails.profileByInvitedUser.nickNameDetails.nickName
                    : invitationDetails.profileByUser.nickNameDetails.nickName,
                ),
              }"
            >
              {{
                type === 'who'
                  ? invitationDetails.profileByInvitedUser.nickNameDetails.nickName
                  : invitationDetails.profileByUser.nickNameDetails.nickName
              }}
            </span>
          </div>

          <!-- 年收入 -->
          <div class="mb-2 flex h-[35px] items-center">
            <label class="w-24 align-middle">年收入：</label>
            <span>{{
              type === 'who'
                ? invitationDetails.profileByInvitedUser.incomeDetails.income
                : invitationDetails.profileByUser.incomeDetails.income
            }}</span>
          </div>

          <!-- 工作 -->
          <div class="mb-2 flex h-[35px] items-center">
            <label class="w-24 align-middle">工作：</label>
            <span>{{
              type === 'who'
                ? invitationDetails.profileByInvitedUser.jobDetails.job
                : invitationDetails.profileByUser.jobDetails.job
            }}</span>
          </div>

          <!-- Line ID -->
          <div class="mb-2 flex h-[35px] items-center font-montserrat">
            <label class="w-24 align-middle">Line ID：</label>
            <span>{{
              type === 'who'
                ? invitationDetails.profileByInvitedUser.lineDetails.id
                : invitationDetails.profileByUser.lineDetails.id
            }}</span>
          </div>

          <!-- 標籤 -->
          <div class="col-span-2">
            <label
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  type === 'who'
                    ? invitationDetails.profileByInvitedUser.nickNameDetails.nickName
                    : invitationDetails.profileByUser.nickNameDetails.nickName,
                ),
              }"
            >
              {{
                type === 'who'
                  ? invitationDetails.profileByInvitedUser.nickNameDetails.nickName
                  : invitationDetails.profileByUser.nickNameDetails.nickName
              }}的標籤：
            </label>
            <div class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md">
              <UBadge
                v-for="i in (
                  type === 'who'
                    ? invitationDetails.profileByInvitedUser.tags
                    : invitationDetails.profileByUser.tags
                )"
                :key="i"
                class="btn-withIcon-outline-rwd pointer-events-none !rounded-lg !px-1 !py-[2px]"
              >
                <p
                  class="!text-[10px]"
                  :class="{
                    'font-montserrat': !useIsChineseFunc(i),
                  }"
                >
                  {{ i }}
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
          > {{ type === 'who' ? '邀請人簡介' : '被邀請人簡介' }}
          </label>
          <p class="rounded-md border-2 p-3">
            {{ invitationDetails.message.content }}
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
            <p>返回我的邀約</p>
          </button>
        </section>
      </div>

      <!-- loading -->
      <div
        v-else
        class="mt-6 space-y-3"
      >
        <USkeleton
          v-for="item in 4"
          :key="item.id"
          class="h-8 w-full bg-neutral-300"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
