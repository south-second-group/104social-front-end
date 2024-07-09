<script setup>
import { useRoute } from 'vue-router'
import { auth } from '../apis/repositories/auth'
import { notificationsAPI } from '../apis/repositories/notifications'
import { initializeSocket, newNotification } from '../apis/socket-io'

const userNotificationsStore = useNotificationsStore()
const { notifications } = storeToRefs(userNotificationsStore)
const { setNotifications, deleteNotifications, readAllNotificationStore }
  = userNotificationsStore

watch(
  newNotification,
  (newValue) => {
    const now = new Date()
    // console.log("notifications", notifications.value);
    // console.log("newValue", newValue);
    const newNote = {
      createdAt: now,
      id: newValue.id,
      isRead: false,
      message: {
        content: newValue.content,
        title: newValue.title,
      },
      type: 1,
      updatedAt: now,
      user: [{
        id: newValue.userId,
        personalInfo: {
          username: newValue.nickNameDetails.nickName,
        },
      }],
    }
    setNotifications([
      ...notifications.value,
      newNote,
    ])
    toast(`收到來自 ${newValue.nickNameDetails.nickName} 的訊息`, 'success')
    // console.log('newNote', newNote)
  },
  { deep: true },
)

const memberStore = useMemberStore()
const userDataStore = useUserDataStore()
const { userData } = storeToRefs(userDataStore)
const { setUserData, deleteUserData } = userDataStore

async function readAll() {
  const res = await notificationsAPI.readAllNotifications()
  if (res.status)
    readAllNotificationStore()
}

const newNotificationsCount = ref(0)
watch(
  notifications,
  (newValue) => {
    newNotificationsCount.value = newValue.filter(e => !e.isRead).length
  },
  { immediate: true, deep: true },
)

const router = useRouter()
const route = useRoute()
const isOpenSlide = ref(false)
const isOpenModal = ref(false)
const isLoggedIn = ref(false) // 判斷是否登入

const toastMessage = ref('')
const toastType = ref('')

// 使用 verify 函數檢查登入狀態
async function verify() {
  try {
    const response = await auth.verifys()
    if (response.status === true) {
      setUserData(response.data)
      isLoggedIn.value = true
      if (isLoggedIn.value) {
        memberStore.getMemberData()
        initializeSocket(response.data.userId)
        getNotifications()
      }
    }
    else {
      isLoggedIn.value = false
    }
  }
  catch (error) {
    const errorMessage = error.response
    isLoggedIn.value = false
  }
}

// 檢查登入狀態
async function checkLoginStatus() {
  await verify()
}

function isActive(path) {
  return computed(() => route.path === path)
}

function buttonClass(path) {
  return isActive(path).value ? 'active-class' : 'inactive-class'
}

function closeModalAndPushRouter() {
  isOpenModal.value = false
  router.push('/notifications')
}

async function getNotifications() {
  try {
    const response = await notificationsAPI.getUserNotifications()
    if (response.status) {
      deleteNotifications()
      setNotifications(response.data)
    }
  }
  catch (error) {
    if (notifications.value !== null)
      deleteNotifications()

    const errorMessage = error.response
  }
}

onMounted(async () => {
  checkLoginStatus()
})

// 登出
async function logout() {
  try {
    const response = await auth.logout()
    if (response.status === true) {
      isLoggedIn.value = false
      isOpenSlide.value = false // 手機版收起漢堡選單
      deleteNotifications() // 清空通知訊息
      deleteUserData() // 清空 userData
      toast('登出成功！', 'success')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }
  }
  catch (error) {
    const errorMessage = error.response
    toast(errorMessage, 'error')
  }
}
// toast
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<template>
  <div class="h-[60px] w-full lg:h-[120px]">
    <div class="container mx-auto mt-0 rounded-full lg:mt-5 lg:bg-zinc-50/80">
      <div
        class="flex w-full items-center justify-between p-3 lg:px-10 lg:py-4"
      >
        <NuxtLink to="/">
          <h2 class="shrink-0">
            104緣來如此
          </h2>
        </NuxtLink>

        <!-- 手機板 -->
        <div class="flex items-center lg:hidden">
          <div class="p-3">
            <div v-if="isLoggedIn">
              <UButton
                color="white"
                class="no-border-no-shadow"
                @click="isOpenModal = true"
              >
                <icon-heroicons:bell-alert class="size-6" />
                <UChip
                  :text="newNotificationsCount"
                  :show="newNotificationsCount > 0"
                  class="mb-auto"
                  size="2xl"
                />
              </UButton>
              <UModal
                v-model="isOpenModal"
                :ui="{
                  inner:
                    'fixed inset-0 overflow-y-visible w-full custom-modal-top',
                }"
                prevent-close
              >
                <UCard
                  :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                  }"
                  class="linear-border rounded-md"
                >
                  <NotificationCard />
                  <div
                    class="flex justify-between px-2 py-4 font-bold text-primary-dark"
                  >
                    <div class="">
                      <NuxtLink
                        to="/notifications"
                        @click.prevent="closeModalAndPushRouter"
                      >
                        <p class="text-base">
                          通知列表
                        </p>
                      </NuxtLink>
                    </div>
                    <div class="flex gap-[22px]">
                      <p v-if="notifications.length > 0">
                        全部已讀
                      </p>
                      <UButton
                        color="gray"
                        variant="ghost"
                        class="p-0"
                        @click="isOpenModal = false"
                      >
                        <p class="text-base font-bold text-primary-dark">
                          關閉
                        </p>
                      </UButton>
                    </div>
                  </div>
                </UCard>
              </UModal>
            </div>
          </div>
          <div class="">
            <UButton
              color="white"
              class="no-border-no-shadow"
              @click="isOpenSlide = true"
            >
              <icon-heroicons:bars-3-bottom-right class="size-6 text-black" />
            </UButton>
            <USlideover
              v-model="isOpenSlide"
              class="z-[4000] h-screen"
            >
              <div
                class="w-full flex-1 bg-[url('~/public/nav/phone-bg.png')] bg-cover p-4"
              >
                <div class="flex justify-end">
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="size-6"
                    @click="isOpenSlide = false"
                  />
                </div>
                <div class="flex h-[95%] flex-col items-center justify-between">
                  <div class="mb-4 mt-6">
                    <NuxtImg
                      src="/nav/couple .png"
                      alt=""
                      class="w-[150px]"
                    />
                    <ul class="flex-col gap-4">
                      <li class="text-B2 py-4 text-center">
                        <NuxtLink
                          to="/articles"
                          class="nav-items"
                          @click="isOpenSlide = false"
                        >
                          <p>精選文章</p>
                        </NuxtLink>
                      </li>
                      <li class="text-B2 py-4 text-center">
                        <NuxtLink
                          to="/search-date"
                          class="nav-items"
                          @click="isOpenSlide = false"
                        >
                          <p>尋找對象</p>
                        </NuxtLink>
                      </li>
                      <li class="text-B2 py-4 text-center">
                        <NuxtLink
                          to="/stores"
                          class="nav-items"
                          @click="isOpenSlide = false"
                        >
                          <p>找案例</p>
                        </NuxtLink>
                      </li>
                      <li class="text-B2 py-4 text-center">
                        <NuxtLink
                          to="/about/"
                          class="nav-items"
                          @click="isOpenSlide = false"
                        >
                          <p>關於我們</p>
                        </NuxtLink>
                      </li>
                      <li
                        v-if="isLoggedIn"
                        class="text-B2 py-4 text-center"
                      >
                        <NuxtLink
                          to="/member"
                          class="nav-items"
                          @click="isOpenSlide = false"
                        >
                          <p>會員資料</p>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                  <div class="w-full px-9">
                    <button
                      class="btn-linear-nav block w-full"
                      @click="isLoggedIn ? logout() : $router.push('/login')"
                    >
                      <p v-if="isLoggedIn">
                        登出
                      </p>
                      <p v-else>
                        登入 / 註冊
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </USlideover>
          </div>
        </div>

        <!-- 電腦版 -->
        <div class="hidden w-full grow items-center justify-between lg:flex">
          <ul class="me-6 ml-auto flex items-center gap-6">
            <li class="p-2">
              <NuxtLink
                to="/articles"
                class="nav-items"
                :class="[
                  buttonClass('/articles'),
                  { active: isActive('/articles') },
                ]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>精選文章</p>
                </div>
              </NuxtLink>
            </li>
            <li class="p-2">
              <NuxtLink
                to="/search-date"
                class="nav-items"
                :class="[
                  buttonClass('/search-date'),
                  { active: isActive('/search-date') },
                ]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>尋找對象</p>
                </div>
              </NuxtLink>
            </li>
            <li class="p-2">
              <NuxtLink
                to="/stores"
                class="nav-items"
                :class="[
                  buttonClass('/stores'),
                  { active: isActive('/stores') },
                ]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>找案例</p>
                </div>
              </NuxtLink>
            </li>
            <li class="p-2">
              <NuxtLink
                to="/about"
                class="nav-items"
                :class="[buttonClass('/about'), { active: isActive('/about') }]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>關於我們</p>
                </div>
              </NuxtLink>
            </li>
            <li
              v-if="isLoggedIn"
              class="nav-items p-2"
            >
              <NuxtLink
                to="/member"
                :class="[
                  buttonClass('/member'),
                  { active: isActive('/member') },
                ]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>會員資料</p>
                </div>
              </NuxtLink>
            </li>
            <li
              v-if="isLoggedIn"
              class="nav-items p-2"
            >
              <UPopover :popper="{ placement: 'bottom-end' }">
                <UButton
                  :class="[
                    buttonClass('/notifications'),
                    { active: isActive('/notifications') },
                  ]"
                  color="white"
                  class="no-border-no-shadow text-B2 p-0"
                >
                  <icon-heroicons:sparkles-solid />
                  <p class="font-bold">
                    站內通知
                  </p>
                </UButton>
                <UChip
                  :text="newNotificationsCount"
                  :show="newNotificationsCount > 0"
                  size="2xl"
                />
                <template #panel="{ close }">
                  <div class="linear-border rounded-md p-4">
                    <NotificationCard />
                    <div class="mt-2 flex justify-between">
                      <div class="p-2">
                        <NuxtLink to="/notifications">
                          <p
                            class="text-base"
                            @click="close"
                          >
                            通知列表
                          </p>
                        </NuxtLink>
                      </div>
                      <div class="flex gap-2">
                        <div class="p-2">
                          <p
                            class="cursor-pointer text-base"
                            @click="readAll"
                          >
                            全部已讀
                          </p>
                        </div>
                        <div class="p-2">
                          <UButton
                            label="Close"
                            class="no-border-no-shadow text-B2 bg-white p-0 hover:bg-white"
                            @click="close"
                          >
                            <p class="font-bold">
                              關閉
                            </p>
                          </UButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </UPopover>
            </li>
          </ul>
          <button
            class="btn-linear-nav"
            :class="isLoggedIn ? 'w-[72px]' : 'w-[123px]'"
            @click="isLoggedIn ? logout() : $router.push('/login')"
          >
            <p v-if="isLoggedIn">
              登出
            </p>
            <p v-else>
              登入 / 註冊
            </p>
          </button>
        </div>
      </div>
    </div>
    <!-- Alert 通知 -->
    <div
      v-if="toastMessage"
      class="toast"
      :class="[toastType === 'success' ? 'success' : 'error']"
    >
      {{ toastMessage }}
    </div>
  </div>
  <ChatRoomButton v-show="isLoggedIn" />
</template>

<style lang="scss" scoped>
.no-border-no-shadow {
  border: none;
  box-shadow: none;
}

.toast.show {
  display: block;
}

.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  display: block;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}

h2 {
  background-image: url("../assets/img/logo.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 101%;
  display: block;
  width: 192px;
  height: 48px;
}
</style>
