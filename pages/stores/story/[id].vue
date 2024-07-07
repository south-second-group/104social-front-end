<script setup>
import DOMPurify from 'isomorphic-dompurify'
import { happyStoryAPI } from '@/apis/repositories/happyStory'

const visibleRef = ref(false)
const indexRef = ref(0)

function showImg(index) {
  indexRef.value = index
  visibleRef.value = true
}
const onHide = () => (visibleRef.value = false)

const route = useRoute()

const { data: story } = await happyStoryAPI.getHappyStoryById(route.params.id)

const { mainExample, relatedExample } = story.value.data

const cleanContent = DOMPurify.sanitize(mainExample.content)
</script>

<template>
  <div class="container mt-12 md:mt-20">
    <div class="block gap-x-6 md:grid md:grid-cols-6">
      <article class="col-span-4 col-start-2 mb-6 text-start">
        <p
          class="mb-1 bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-center text-xl font-bold text-transparent md:mb-2 md:text-2xl"
        >
          {{ mainExample.myName }} & {{ mainExample.partnerName }}
        </p>
        <NuxtImg
          :src="mainExample.coverImage"
          :alt="mainExample.title"
          class="my-5 h-[160px] w-full rounded-xl object-cover md:h-[450px]"
        />

        <!-- 生活照片 -->
        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="(src, index) in mainExample.imgList"
            :key="index"
            class="pic cursor-pointer"
            @click="() => showImg(index)"
          >
            <img
              :src="src"
              class="size-full rounded-xl object-cover"
            >
          </div>
          <VueEasyLightbox
            :visible="visibleRef"
            :imgs="mainExample.imgList"
            :index="indexRef"
            @hide="onHide"
          />
        </div>

        <!-- 文章標題 -->
        <p
          class="mb-1 mt-5 line-clamp-2 text-xl font-bold text-zinc-950 md:mb-2 md:text-2xl"
        >
          {{ mainExample.title }}
        </p>

        <!-- 文章內容 -->
        <div
          class="story-content mt-2 text-justify text-xl text-zinc-600"
          v-html="cleanContent"
        ></div>
      </article>

      <!-- 相關案例 -->
      <div class="col-span-4 col-start-2 mb-6 mt-20 text-start">
        <p class="mb-1 text-lg font-bold text-zinc-950 md:mb-2 md:text-xl">
          更多幸福案例
        </p>
        <ul class=" grid-cols-3 gap-3 md:grid">
          <li
            v-for="(example) in relatedExample"
            :key="example._id"
            class=""
          >
            <NuxtLink :to="`/stores/story/${example._id}`">
              <NuxtImg
                :src="example.coverImage"
                :alt="example.title"
                class="mb-2 mt-3 h-[200px] w-full rounded-xl object-cover"
              />
              <p
                class="bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-center font-bold text-transparent"
              >
                {{ example.myName }} & {{ example.partnerName }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
