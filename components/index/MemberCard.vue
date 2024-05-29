<script setup>
const props = defineProps(['member'])
const { member } = props
const isCheck = ref(false)
</script>

<template>
  <div class="me-6 text-center md:me-0">
    <div
      class="shadow-primary-light-800/10 border-real-transparent card-border mx-auto w-[300px] rounded-lg border-2 bg-white shadow transition duration-150 ease-in-out lg:flex lg:w-full"
    >
      <div class="shrink-0">
        <NuxtImg
          :src="member.avatar.src"
          alt="member_image"
          class="h-[200px] w-[300px] rounded-t-lg object-cover object-top lg:h-[265px] lg:w-[200px] lg:rounded-l-lg lg:rounded-tr-none"
        />
      </div>
      <div class="flex w-full flex-col justify-between p-5">
        <div class="mb-3">
          <div class="mb-2 flex justify-between">
            <p class="text-start text-xl font-bold  leading-7 text-zinc-950 md:text-2xl">
              {{ member.name }}
            </p>
            <div class="">
              <span class="text-xl">
                <utilsCollectionBtn v-model="isCheck" />
              </span>
            </div>
          </div>
          <div class="">
            <div class="mb-1 flex gap-3 text-zinc-600">
              <p
                v-for="(desc, index) in member.describe_1"
                :key="index"
              >
                {{ desc }}
              </p>
            </div>
            <div class="flex gap-3 text-zinc-600">
              <p
                v-for="(desc, index) in member.describe_2"
                :key="index"
              >
                {{ desc }}
              </p>
            </div>
            <div class="my-3 flex items-center">
              <span class="text-xl text-amber-400">
                <icon-heroicons-star-solid />
              </span>
              <p class="ms-2 text-sm text-zinc-400">
                評分 {{ member.rating }} ({{ member.ratingCount }})
              </p>
            </div>
            <ul class="flex gap-3 text-primary-dark">
              <li
                v-for="(desc, index) in member.hashtag"
                :key="index"
              >
                #{{ desc }}
              </li>
            </ul>
          </div>
        </div>
        <div class="flex justify-center gap-3 lg:justify-end">
          <button class="btn-withIcon-outline">
            <icon-heroicons:lock-open />
            <p>解鎖評價</p>
          </button>
          <button class="btn-withIcon-fill">
            <icon-heroicons:heart />
            <p>邀約</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
