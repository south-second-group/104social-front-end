<script setup>
const keyWord = ref(null)
</script>

<template>
  <div class="mt-5 size-full rounded-xl bg-white px-5 py-4">
    <div class="flex h-full flex-col justify-between">
      <!-- 對話內容 -->
      <div class="">
        <p class="mb-5">
          2024 / 3 / 20
        </p>
        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="rounded-lg bg-neutral-200 px-3 py-2">
            <p class="text-zinc-950">
              Hi~
            </p>
          </div>
          <p class="text-B3 self-end text-zinc-400 ">
            下午06 :03
          </p>
        </div>
        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="rounded-lg bg-neutral-200 px-3 py-2">
            <p class="text-zinc-950">
              我住台北，你是哪裡人?
            </p>
          </div>
          <p class="text-B3 self-end text-zinc-400 ">
            下午06 :04
          </p>
        </div>

        <div class="mb-6 flex items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="rounded-lg bg-neutral-200 px-3 py-2">
            <p class="text-zinc-950">
              在嗎?
            </p>
          </div>
          <p class="text-B3 self-end text-zinc-400 ">
            下午08 :10
          </p>
        </div>

        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="rounded-lg bg-neutral-200 px-3 py-2">
            <p class="text-zinc-950">
              我也住台北
            </p>
          </div>
          <p class="text-B3 self-end text-zinc-400 ">
            下午06 :03
          </p>
        </div>

        <div class="mb-6 flex items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="rounded-lg bg-neutral-200 px-3 py-2">
            <p class="text-zinc-950">
              喔喔!
            </p>
          </div>
          <p class="text-B3 self-end text-zinc-400 ">
            下午08 :10
          </p>
        </div>

        <div class="mb-6 flex flex-row-reverse items-center gap-2">
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="rounded-lg bg-neutral-200 px-3 py-2">
            <p class="text-zinc-950">
              我要去洗澡了
            </p>
          </div>
          <p class="text-B3 self-end text-zinc-400 ">
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
