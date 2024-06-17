<script setup>
import { blackListApi } from '~/apis/repositories/blackList'

const props = defineProps({
  status: String,
  createRenderResult: Set,
  cardUserName: String,
  userId: String,
})

const matchResult = useMatchResultStore()

const toastMessage = ref('')
const toastType = ref('')
const isLoading = ref(false)

// 彈窗邏輯
const isOpenModal = defineModel()
const modalText = computed(() => {
  switch (props.status) {
    case 'status1':
      return '確認已解鎖評價'
    case 'status2':
      return '確認解鎖評價'
    case 'status3':
      return '確認完成約會'
    case 'status4':
      return '傳送邀約訊息，並確認邀約？'
    case 'status5':
      return '確認收回邀約'
    case 'status6':
      return '確認拒絕往來'
    case 'status7':
      return '確認恢復往來'
    case 'status8':
      return '確認未給評價'
    case 'status9':
      return '確認已給評價'
    case 'status10':
      return '確認刪除評價'
    default:
      return ''
  }
})

const modalClick = computed(() => {
  switch (props.status) {
    case 'status1':
      return tempfunc
    case 'status2':
      return tempfunc
    case 'status3':
      return tempfunc
    case 'status4':
      return tempfunc
    case 'status5':
      return tempfunc
    case 'status6':
      return postBlackList
    case 'status7':
      return deleteBlackListById
    case 'status8':
      return tempfunc
    case 'status9':
      return tempfunc
    case 'status10':
      return tempfunc
    default:
      return ''
  }
})

function tempfunc() {
  console.warn('tempfunc')
  isOpenModal.value = false
}

async function deleteBlackListById() {
  isLoading.value = true
  try {
    await blackListApi.deleteBlackListById(props.userId)

    toastMessage.value = '恢復往來成功'
    toastType.value = 'success'

    matchResult.result = matchResult.result.map((item) => {
      if (item.userInfo._id === props.userId)
        return { ...item, isLocked: false }

      return item
    })
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '恢復往來失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false

    await new Promise(resolve => setTimeout(resolve, 3000))
    toastMessage.value = ''
  }
}

async function postBlackList() {
  isLoading.value = true
  try {
    await blackListApi.postBlackList({ lockedUserId: props.userId })

    toastMessage.value = '拒絕往來成功'
    toastType.value = 'success'

    matchResult.result = matchResult.result.map((item) => {
      if (item.userInfo._id === props.userId)
        return { ...item, isLocked: true }

      return item
    })
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '拒絕往來失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false

    await new Promise(resolve => setTimeout(resolve, 3000))
    toastMessage.value = ''
  }
}

// 邀約訊息
const selectedOption = ref('請選擇訊息範本')
const options = ['訊息01', '訊息02', '訊息03']
const selectedToggle = ref(false)

const message = ref('')
const MAX_CHARACTERS = 1000
const remainingCharacters = computed(
  () => MAX_CHARACTERS - message.value.length,
)

const addedValue = ref(props.createRenderResult)
addedValue.value.add(props.cardUserName)
const theme = Array.from(addedValue.value)

async function fetchAnswer() {
  isLoading.value = true
  message.value = ''

  try {
    message.value = await useGetGenerativeModelGP(JSON.stringify(theme))

    //     await new Promise((resolve) => setTimeout(resolve, 3000));
    //     message.value = `詠晴，您好！

    // 不知道您最近是否有空？我最近想找家餐廳好好吃一頓，剛好聽說 [餐廳名] 的 [菜色類型] 很不錯，想邀請您一起去品嚐。

    // 您是營養師，肯定很懂吃，也希望可以從您身上學習一些健康飲食的知識。如果方便的話，您看這個週末有空嗎？可以先聊聊，順便一起吃飯？

    // 希望您能接受我的邀請，期待您的回覆！ 😊
    //     `;
  }
  catch (error) {
    console.error({ error })
    toastMessage.value = 'AI 提示發生錯誤，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false

    await new Promise(resolve => setTimeout(resolve, 3000))
    toastMessage.value = ''
  }
}
</script>

<template>
  <div>
    <UModal
      v-model="isOpenModal"
      :overlay="true"
      :ui="{ width: 'max-w-[350px] md:max-w-[666px]' }"
    >
      <UCard
        v-if="props.status !== 'status4'"
        :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex items-center justify-center">
            <h3
              class="text-B1 text-base font-bold leading-6 text-gray-900 dark:text-white"
            >
              {{ modalText }}
            </h3>

            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="absolute right-3 top-5 -my-1"
              @click="isOpenModal = false"
            />
          </div>
        </template>

        <section class="-mt-4 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            :disabled="isLoading"
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
            :disabled="isLoading"
            @click="modalClick"
          >
            <p>確定</p>
          </button>
        </section>
      </UCard>

      <!-- 邀約彈窗 -->
      <UCard
        v-else
        :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex items-center justify-center">
            <h3
              class="text-B1 text-base font-bold leading-6 text-gray-900 dark:text-white"
            >
              {{ modalText }}
            </h3>

            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="absolute right-3 top-5 -my-1"
              @click="isOpenModal = false"
            />
          </div>
        </template>

        <section class="space-y-3">
          <utilsDropdownComp
            v-model="selectedOption"
            :options="options"
            size="sm"
            :disabled="isLoading"
          />
          <div class="relative">
            <UTextarea
              v-model="message"
              :ui="{ base: ' focus:!ring-primary-dark focus:!ring-1' }"
              :rows="10"
              :placeholder="
                isLoading
                  ? ''
                  : '請填寫邀約訊息，推薦主題：電影、音樂會、餐廳、運動、旅行等...'
              "
              :disabled="isLoading || message.length === 1000"
            />

            <div
              v-show="isLoading"
              class="absolute left-2 top-2 space-y-3"
            >
              <USkeleton
                class="h-4 w-[250px] bg-social-gradient-default md:w-[550px]"
              />
              <USkeleton
                class="h-4 w-[240px] bg-social-gradient-default md:w-[450px]"
              />
              <USkeleton
                class="h-4 w-[220px] bg-social-gradient-default md:w-[200px]"
              />
              <USkeleton
                class="h-4 w-[240px] bg-social-gradient-default md:w-[450px]"
              />
              <USkeleton
                class="h-4 w-[220px] bg-social-gradient-default md:w-[200px]"
              />
            </div>

            <button
              type="button"
              class="btn-linear-sm absolute bottom-2 right-2 !p-0"
              :disabled="isLoading"
              @click.prevent="fetchAnswer"
            >
              <p>AI 提示</p>
            </button>
          </div>

          <p class="text-B4 text-end text-neutral-400">
            上限 {{ MAX_CHARACTERS }} 字（剩餘 {{ remainingCharacters }} 字）
          </p>
          <div class="flex justify-end">
            <UToggle
              v-model="selectedToggle"
              :ui="{ active: 'bg-primary-dark' }"
            />
            <span class="text-B4">儲存此次範本</span>
          </div>
        </section>

        <section class="mt-4 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            :disabled="isLoading"
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
            :disabled="isLoading"
          >
            <p>發送邀約</p>
          </button>
        </section>
      </UCard>
    </UModal>

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>

<style scoped></style>
