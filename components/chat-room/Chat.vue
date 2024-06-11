<script setup>
const props = defineProps(['chatId'])
const keyWord = ref(null)
const { chatId } = props
</script>

<template>
  <div class="mt-5 size-full rounded-xl bg-white p-3 md:px-5 md:py-4">
    <div class="flex h-full flex-col justify-between">
      <!-- 對話內容 -->
      <div class="h-[85vh] overflow-y-auto">
        <p class="mb-5 text-center">
          這是對話 {{ chatId }}
        </p>
        <p class="mb-5 text-center">
          2024 / 3 / 20
        </p>
        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2 sm:max-w-[85%]">
            <p class="mb-text-base text-start text-sm text-zinc-950">
              Hi~
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm ">
            下午06 :03
          </p>
        </div>
        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[60%]  rounded-lg bg-neutral-200 px-3 py-2 sm:max-w-[60%]">
            <p class="mb-text-base text-start text-sm text-zinc-950">
              我住台北，你是哪裡人?我住台北，你是哪裡人?我住台北，你是哪裡人?我住台北，你是哪裡人?
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm ">
            下午06 :04
          </p>
        </div>

        <div class="mb-6 flex items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2">
            <p class="mb-text-base text-start text-sm text-zinc-950">
              在嗎?
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm ">
            下午08 :10
          </p>
        </div>

        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2">
            <p class="mb-text-base text-start text-sm text-zinc-950">
              我也住台北
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm ">
            下午06 :03
          </p>
        </div>

        <div class="mb-6 flex items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2">
            <p class="mb-text-base text-start text-sm text-zinc-950">
              喔喔!
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm ">
            下午08 :10
          </p>
        </div>
        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2">
            <p class="mb-text-base text-start text-sm text-zinc-950">
              我要去洗澡了
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm ">
            下午08 :12
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 ">
        <UInput
          v-model="keyWord"
          class="box w-full"
          variant="none"
          size="xl"
          placeholder="請輸入訊息"
        />
        <button class="btn-linear-sm block min-w-[73px] ">
          <p class="font-bold">
            送出
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
}

.box::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  opacity: 0.6;
  background: linear-gradient(90deg, #FE839A, #4A72FF);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
</style>
