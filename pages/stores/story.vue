<script setup>
const visibleRef = ref(false)
const indexRef = ref(0)

const imgs = [
  'https://i.imgur.com/LNQKK3V.jpg',
  'https://i.imgur.com/GTcHsEL.jpg',
  'https://i.imgur.com/KOhD3GW.jpg',
]

function showImg(index) {
  indexRef.value = index
  visibleRef.value = true
}
const onHide = () => (visibleRef.value = false)
</script>

<template>
  <div class="container mt-12 md:mt-20">
    <div class="block gap-x-6 md:grid md:grid-cols-6">
      <article class="col-span-4 col-start-2 mb-6 text-start">
        <p
          class="mb-1 bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-center text-xl font-bold text-transparent md:mb-2 md:text-2xl"
        >
          Justin & Sophia
        </p>
        <NuxtImg
          src="https://i.imgur.com/vtLN2t8.jpg"
          alt=""
          class="my-5 h-[160px] w-full rounded-xl object-cover md:h-[450px]"
        />
        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="(src, index) in imgs"
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
            :imgs="imgs"
            :index="indexRef"
            @hide="onHide"
          />
        </div>
        <p
          class="mb-1 mt-5 line-clamp-2 text-xl font-bold text-zinc-950 md:mb-2 md:text-2xl"
        >
          這個姐姐讓我不想努力了
        </p>
        <p class="mt-2 text-justify text-xl text-zinc-600">
          作為一名初創企業家,我的生活幾乎完全被工作所佔據,愛情對我來說,似乎是一件遙遠的事。但是,通過一個相親交友網站,我遇見了
          Sophia——一位既成功又富有的商業女強人...我被 Sophia
          的自信和優雅深深吸引。她對我的創業計劃表現出了極大的興趣,並且願意提供資金支持,這讓我感到既驚訝又感激。從那一刻起,我們的關係就不再僅僅是業務上的合作,而是逐漸發展成為了一段深刻的情感聯繫。
        </p>
      </article>
      <div class="col-span-4 col-start-2 mb-6 mt-20 text-start">
        <p class="mb-1 text-lg font-bold text-zinc-950 md:mb-2 md:text-xl">
          更多幸福案例
        </p>
        <ul class=" grid-cols-3 gap-3 md:grid">
          <li class="">
            <NuxtImg
              src="https://i.imgur.com/DWF7Neo.jpg"
              alt=""
              class="mb-2 mt-3 w-full rounded-xl object-cover"
            />
            <p
              class="bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-center font-bold text-transparent"
            >
              Luna & Robert
            </p>
          </li>
          <li class="">
            <NuxtImg
              src="https://i.imgur.com/cnRfcfN.jpg"
              alt=""
              class="mb-2 mt-3 w-full rounded-xl object-cover"
            />
            <p
              class="bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-center font-bold text-transparent"
            >
              Matt & Raphael
            </p>
          </li>
          <li class="">
            <NuxtImg
              src="https://i.imgur.com/EYQDtbX.jpg"
              alt=""
              class="mb-2 mt-3 w-full rounded-xl object-cover"
            />
            <p
              class="bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text text-center font-bold text-transparent"
            >
              Cristina & Owen
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
