<script setup>
import img01 from '@/public/article/cover01-lg.png'
import img02 from '@/public/article/cover02-lg.png'
import img03 from '@/public/article/cover03-lg.png'

const coverImages = [img01, img02, img03]
const currentCover = ref(coverImages[0])

function handleMouseEnter(index) {
  currentCover.value = coverImages[index]
}
</script>

<template>
  <div class="relative">
    <div class="absolute left-1/3 top-0">
      <NuxtImg
        src="/article/bg01-lg.png"
        alt=""
        class="w-[363px]"
      />
    </div>
    <div class="absolute bottom-0 right-[150px]">
      <NuxtImg
        src="/article/bg02-lg.png"
        alt=""
        class="w-[303px]"
      />
    </div>
    <div class="relative z-50 flex w-full items-center justify-center py-12 lg:py-[100px]">
      <div class="me-6 hidden xxl:block xxl:shrink-0">
        <img
          :src="currentCover"
          alt=""
        >
      </div>
      <div class="xll:max-w-[746px]">
        <div class="flex-col rounded-[24px] bg-white/60 p-4 md:p-10">
          <ul class="flex flex-col gap-4 md:block">
            <li
              class="linear-border-bottom p-4 md:px-9 md:py-5"
              @mouseenter="handleMouseEnter(0)"
            >
              <NuxtLink to="/articles/art01">
                <div class="mb-3 md:mb-6 xxl:hidden">
                  <NuxtImg
                    src="/article/cover01-sm.png"
                    alt="交友軟體 文章 104緣來如此 "
                    class="mx-auto w-full md:w-[60%]"
                  />
                </div>
                <div class="">
                  <div class="relative">
                    <div class="absolute -left-7 top-1 hidden md:block">
                      <NuxtImg
                        src="/article/title_dot.png"
                        alt=""
                        class="w-4"
                      />
                    </div>
                    <h3 class="text-H4 mb-4 text-start tracking-wide text-zinc-950">
                      大齡焦慮! 年過 40 錯了嗎?
                    </h3>
                    <p class="line-clamp-3 text-start text-xl leading-[30px] tracking-wide text-zinc-600">
                      進入 40
                      歲的門檻,社會與內心的雙重壓力使許多人感到焦慮。探討這個年齡階段的真實挑戰與成長機會
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </li>
            <li
              class="linear-border-bottom p-4 md:px-9 md:py-5"
              @mouseenter="handleMouseEnter(1)"
            >
              <NuxtLink to="/articles/art05">
                <div class="mb-3 md:mb-6 xxl:hidden">
                  <NuxtImg
                    src="/article/cover02-sm.png"
                    alt="交友軟體 文章 104緣來如此 "
                    class="mx-auto w-full md:w-[60%]"
                  />
                </div>
                <div class="">
                  <div class="relative">
                    <div class="absolute -left-7 top-1 hidden md:block">
                      <NuxtImg
                        src="/article/title_dot.png"
                        alt=""
                        class="w-4"
                      />
                    </div>
                    <h3 class="text-H4 mb-4 text-start tracking-wide text-zinc-950">
                      整天抱怨岳母難相處,父母雙亡在哪裡?
                    </h3>
                    <p class="line-clamp-3 text-start text-xl leading-[30px] tracking-wide text-zinc-600">
                      岳母難搞?試試無父母可搞的輕鬆生活,一段探討無需承擔家庭責任,享受完全自由生活的幽默思考
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </li>
            <li
              class="linear-border-bottom border-r-0 border-t-0  p-4 md:px-9 md:py-5"
              @mouseenter="handleMouseEnter(2)"
            >
              <NuxtLink to="/articles/art06">
                <div class="mb-3 md:mb-6 xxl:hidden">
                  <NuxtImg
                    src="/article/cover03-sm.png"
                    alt="交友軟體 文章 104緣來如此 "
                    class="mx-auto w-full md:w-[60%]"
                  />
                </div>
                <div class="">
                  <div class="relative">
                    <div class="absolute -left-7 top-1 hidden md:block">
                      <NuxtImg
                        src="/article/title_dot.png"
                        alt=""
                        class="w-4"
                      />
                    </div>
                    <h3 class="text-H4 mb-4 text-start tracking-wide text-zinc-950">
                      無經驗可, Sugar daddy / mommy 在找你
                    </h3>
                    <p class="line-clamp-3 text-start text-xl leading-[30px] tracking-wide text-zinc-600">
                      在這個快節奏的世界中,尋找一位經濟上能給予支持的伴侶似乎成了一種趨勢。揭開
                      Sugar daddy/mommy 內心世界的渴望與激情
                    </p>
                  </div>
                </div>
              </NuxtLink>
            </li>
          </ul>
          <NuxtLink
            class="lg:hidden"
            to="/articles"
          >
            <button class="btn-textOrIcon-sm mx-auto mt-6">
              <p>查看更多</p>
              <icon-heroicons:arrow-right />
            </button>
          </NuxtLink>
          <NuxtLink
            class="hidden lg:block"
            to="/articles"
          >
            <button class="btn-textOrIcon-lg me-[67px] ms-auto mt-6">
              <p>查看更多</p>
              <icon-heroicons:arrow-right />
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden w-[312px] xxl:block"></div>
    </div>
  </div>
</template>
