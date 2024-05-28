<script setup>
const props = defineProps({
  status: String,
})
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

const selectedOption = ref('請選擇訊息範本')
const options = ['訊息01', '訊息02', '訊息03']
const selectedToggle = ref(false)

const message = ref('')
const MAX_CHARACTERS = 1000
const remainingCharacters = computed(
  () => MAX_CHARACTERS - message.value.length,
)

const isLoading = ref(false)
const theme = ref([
  '張詠晴',
  '音樂會',
  '餐廳',
  '運動',
  '旅行',
  '生理女',
  '身高 165cm',
  '體重 50kg',
  '健身',
  '未婚',
  '營養師',
  '台南白河國小',
  '團膳業',
])

async function fetchAnswer() {
  isLoading.value = true

  try {
    // message.value = await useGetGenerativeModelGP(theme.value);

    await new Promise(resolve => setTimeout(resolve, 3000))
    message.value = `
詠晴，您好！

不知道您最近是否有空？我最近想找家餐廳好好吃一頓，剛好聽說 [餐廳名] 的 [菜色類型] 很不錯，想邀請您一起去品嚐。

您是營養師，肯定很懂吃，也希望可以從您身上學習一些健康飲食的知識。如果方便的話，您看這個週末有空嗎？可以先聊聊，順便一起吃飯？

希望您能接受我的邀請，期待您的回覆！ 😊
    `
  }
  catch (error) {
    console.error({ error })
  }
  finally {
    isLoading.value = false
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
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
          >
            <p>確定</p>
          </button>
        </section>
      </UCard>

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
          />
          <div class="relative">
            <UTextarea
              v-model="message"
              :ui="{ base: ' focus:!ring-primary-dark' }"
              :rows="10"
              :placeholder="
                isLoading
                  ? ''
                  : '請填寫邀約訊息，推薦主題：電影、音樂會、餐廳、運動、旅行等...'
              "
            />

            <div
              v-show="isLoading"
              class="absolute left-2 top-2 space-y-3"
            >
              <USkeleton
                class="h-4 w-[550px] max-w-[550px] bg-social-gradient-default"
              />
              <USkeleton
                class="h-4 w-[450px] max-w-[450px] bg-social-gradient-default"
              />
              <USkeleton
                class="h-4 w-[200px] max-w-[200px] bg-social-gradient-default"
              />
              <USkeleton
                class="h-4 w-[450px] max-w-[450px] bg-social-gradient-default"
              />
              <USkeleton
                class="h-4 w-[200px] max-w-[200px] bg-social-gradient-default"
              />
            </div>

            <button
              type="button"
              class="btn-linear-sm absolute bottom-2 right-2 !p-0"
              @click.prevent="fetchAnswer"
            >
              <p class="">
                AI 提示
              </p>
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
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
          >
            <p>發送邀約</p>
          </button>
        </section>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped></style>
