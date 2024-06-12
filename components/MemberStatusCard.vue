<script setup>
const props = defineProps(['member'])
const { member } = props
const isCheck = ref(false)
</script>

<template>
  <div class="mb-6 text-center text-gray-900">
    <div class="rounded-[10px] border-2 border-primary-light p-4 md:p-6">
      <div class="mb-4 flex items-center justify-between">
        <UBadge
          size="lg"
          :ui="{ rounded: 'rounded-full' }"
          class="bg-primary-dark"
        >
          已發起邀約
        </UBadge>
        <div class="flex gap-3">
          <div class="inline-block rounded-full bg-[#F5F5F5] p-2">
            <span class="cursor-pointer text-xl text-zinc-600">
              <icon-heroicons-trash />
            </span>
          </div>
          <div class="inline-block rounded-full bg-[#F5F5F5] p-2">
            <utilsCollectionBtn
              v-model="isCheck"
              class="size-6"
            />
          </div>
          <div class="inline-block rounded-full bg-[#F5F5F5] p-2">
            <utilsChatBtn class="size-6" />
          </div>
        </div>
      </div>
      <div
        class="flex flex-col justify-between rounded-xl bg-[#F5F5F5] p-4 md:flex-row md:p-6"
      >
        <div class="flex flex-col md:flex-row">
          <div class="mb-4 shrink-0 self-center md:mb-0 md:me-6">
            <NuxtImg
              src="/notifications/member01.png"
              alt=""
              class="w-[150px]"
            />
          </div>
          <div class="me-6 text-start">
            <div class="mb-3">
              <p class="text-H4 mb-1 text-zinc-900">
                {{ member.name }}
              </p>
              <p class="text-B2 text-zinc-900">
                生理女、身高 165cm、體重 50kg、健身、未婚
              </p>
            </div>
            <div
              class="mb-3 border-2 border-transparent border-l-[#E4E4E7] ps-3"
            >
              <p class="text-B2 text-[#52525B]">
                營養師
              </p>
              <p class="text-B2 text-zinc-400">
                台南白河國小
              </p>
            </div>
            <div class="text-B2 flex gap-3 text-[#4A72FF]">
              <p>團膳業</p>
              <p>職員</p>
              <p>年薪 650K</p>
            </div>
          </div>
        </div>
        <div class="flex items-center self-start md:self-end">
          <span class="text-xl text-amber-400">
            <icon-heroicons-star-solid />
          </span>
          <p class="ms-2 text-sm text-zinc-400">
            評分 4.2 (13)
          </p>
        </div>
      </div>
      <div class="mt-4 flex justify-end gap-3">
        <button class="btn-withIcon-outline">
          <icon-heroicons:lock-open />
          <p>解鎖評價</p>
        </button>
        <button class="btn-withIcon-outline">
          <icon-heroicons:heart />
          <p>收回邀約</p>
        </button>
      </div>
    </div>
  </div>
</template>
