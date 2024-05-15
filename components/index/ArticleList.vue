<template>
  <div class="relative bg-white h-screen w-full">
    <div class="absolute top-0 left-1/3">
      <img src="../../assets/img/article/blur/article - bg1 - lg.png" alt="">
    </div>
    <div class="absolute bottom-0 right-0">
      <img src="../../assets/img/article/blur/article - bg2 - lg.png" alt="">
    </div>
    <div class="absolute">
      <div class="my-[100px]  flex gap-6">
        <div class="shrink-0">
          <img :src='currentCover' alt="">
        </div>
        <div class="me-[312px]">
          <div class="flex-col rounded-[24px] bg-white/60 p-10">
            <ul class="">
              <li class="flex border-b border-primary-dark px-9 py-5" @mouseenter="handleMouseEnter(0)">
                <div class="relative">
                  <div class="absolute -left-8 top-2 ">
                    <img src="../../assets/img/article/title_dot.png" alt="">
                  </div>
                  <h3 class="mb-4 text-start text-2xl font-bold tracking-wider text-zinc-950">
                    大齡焦慮! 年過 40 錯了嗎?
                  </h3>
                  <p class="text-start text-xl leading-[30px] tracking-wide text-zinc-600">
                    進入 40
                    歲的門檻,社會與內心的雙重壓力使許多人感到焦慮。探討這個年齡階段的真實挑戰與成長機會
                  </p>
                </div>
              </li>
              <li class="flex border-b border-primary-dark px-9 py-5" @mouseenter="handleMouseEnter(1)">
                <div class="relative">
                  <div class="absolute -left-8 top-2 ">
                    <img src="../../assets/img/article/title_dot.png" alt="">
                  </div>
                  <h3 class="mb-4 text-start text-2xl font-bold tracking-wider text-zinc-950">
                    整天抱怨岳母難相處,父母雙亡在哪裡?
                  </h3>
                  <p class="text-start text-xl leading-[30px] tracking-wide text-zinc-600">
                    岳母難搞?試試無父母可搞的輕鬆生活,一段探討無需承擔家庭責任,享受完全自由生活的幽默思考
                  </p>
                </div>
              </li>
              <li class="flex border-b border-primary-dark px-9 py-5" @mouseenter="handleMouseEnter(2)">
                <div class="relative">
                  <div class="absolute -left-8 top-2 ">
                    <img src="../../assets/img/article/title_dot.png" alt="">
                  </div>
                  <h3 class="mb-4 text-start text-2xl font-bold tracking-wider text-zinc-950">
                    無經驗可, Sugar daddy / mommy 在找你
                  </h3>
                  <p class="text-start text-xl leading-[30px] tracking-wide text-zinc-600">
                    在這個快節奏的世界中,尋找一位經濟上能給予支持的伴侶似乎成了一種趨勢。揭開 Sugar daddy/mommy 內心世界的渴望與激情
                  </p>
                </div>
              </li>
            </ul>
            <button class="btn-textOrIcon-lg mt-6 ms-auto me-[47px]">
              <p>查看更多</p>
              <icon-heroicons:arrow-right />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img01 from '@/assets/img/article/cover/img01.png';
import img02 from '@/assets/img/article/cover/img02.png';
import img03 from '@/assets/img/article/cover/img03.png';
const coverImages = [
  img01,
  img02,
  img03
];
const currentCover = ref(coverImages[0]);

function handleMouseEnter(index) {
  currentCover.value = coverImages[index];
}
</script>