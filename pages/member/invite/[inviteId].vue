<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { inviteListApi } from '~/apis/repositories/inviteList'

const route = useRoute()
const router = useRouter()
const inviteId = route.params.inviteId
const type = route.query.type // 获取查询参数
const invitationDetails = ref(null)

// 取得 API 會員詳細資料
async function fetchInviteDetail() {
  try {
    let response
    if (type === 'who') {
      response = await inviteListApi.getInviteWho(inviteId)
      invitationDetails.value = response.data
    }
    else if (type === 'me') {
      response = await inviteListApi.getInviteMe(inviteId)
      invitationDetails.value = response.data
    }
  }
  catch (error) {
    console.error('會員詳細資料錯誤訊息:', error)
  }
}

onMounted(() => {
  fetchInviteDetail()
})

function goBack() {
  router.push('/member/invite')
}
</script>

<template>
  <div class="container border p-3 text-start md:p-12">
    <div class="mx-auto max-w-[700px]">
      <div class="shrink-0">
        <img
          :src="type === 'who'
            ? invitationDetails?.profileByInvitedUser?.[0]?.photoDetails?.photo
            : invitationDetails?.profileByUser?.[0]?.photoDetails?.photo"
          alt="Profile Photo"
          class="mx-auto size-[150px] rounded-full object-cover object-top"
        >
      </div>
      <h1 class="text-H4 mt-24">
        {{ type === 'who' ? '邀請人資訊' : '被邀請人資訊' }}
      </h1>

      <div class="mt-6">
        <div class="mb-4 grid w-full  grid-cols-2 gap-6 ">
          <div>
            <label for="">姓名：</label>
            <ClientOnly>
              <span
                :class="{
                  'font-montserrat': !useIsChineseFunc(
                    type === 'who'
                      ? invitationDetails?.profileByInvitedUser?.[0]?.nickNameDetails?.nickName
                      : invitationDetails?.profileByUser?.[0]?.nickNameDetails?.nickName,
                  ),
                }"
              >
                {{
                  type === 'who'
                    ? invitationDetails?.profileByInvitedUser?.[0]?.nickNameDetails?.nickName
                    : invitationDetails?.profileByUser?.[0]?.nickNameDetails?.nickName
                }}
              </span>
            </ClientOnly>
          </div>
          <div>
            <label for="">年收入：</label>
            <span class="">{{
              type === 'who'
                ? invitationDetails?.profileByInvitedUser?.[0]?.incomeDetails?.income
                : invitationDetails?.profileByUser?.[0]?.incomeDetails?.income
            }}</span>
          </div>
          <div>
            <label for="">工作：</label>
            <span class="">{{
              type === 'who'
                ? invitationDetails?.profileByInvitedUser?.[0]?.jobDetails?.job
                : invitationDetails?.profileByUser?.[0]?.jobDetails?.job
            }}</span>
          </div>
          <div class="font-montserrat">
            <label for="">Line ID：</label>
            <span>{{
              type === 'who'
                ? invitationDetails?.profileByInvitedUser?.[0]?.lineDetails?.id
                : invitationDetails?.profileByUser?.[0]?.lineDetails?.id
            }}</span>
          </div>

          <div class="col-span-2 font-montserrat">
            <label for="">
              {{
                type === 'who'
                  ? invitationDetails?.profileByInvitedUser?.[0]?.nickNameDetails?.nickName
                  : invitationDetails?.profileByUser?.[0]?.nickNameDetails?.nickName
              }}的標籤：
            </label>
            <div class="block space-x-2 space-y-2 rounded-md px-3 py-1">
              <UBadge
                v-for="(tag, index) in (
                  type === 'who'
                    ? invitationDetails?.profileByInvitedUser?.[0]?.tags
                    : invitationDetails?.profileByUser?.[0]?.tags
                )"
                :key="index"
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

        <div class="mt-12 w-full space-y-3">
          <label
            class="text-H4"
            for=""
          > {{ type === 'who' ? '邀請人資訊' : '被邀請人資訊' }}
          </label>
          <p class="rounded-md border-2 p-3">
            {{ invitationDetails?.message.content }}
          </p>
        </div>

        <div class="mt-12 w-full space-y-3">
          <label
            class="text-H4"
            for=""
          >整體評價</label>
          <div class="flex">
            <icon-heroicons:heart-solid
              v-for="i in (
                type === 'who'
                  ? invitationDetails?.profileByInvitedUser?.[0]?.userStatus?.commentCount
                  : invitationDetails?.profileByUser?.[0]?.userStatus?.commentCount
              )"
              :key="i"
              class="size-10 text-primary-dark"
            />
          </div>
        </div>

        <section class="mt-12 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            @click="goBack"
          >
            <p>返回我的邀約</p>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
