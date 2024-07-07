<template>
  <div class="container mx-auto my-12 w-full lg:my-[100px]">
    <h1 class="text-H4 mb-6 text-primary-dark md:hidden">
      幸福案例
    </h1>
    <p class="text-H2 mb-[60px] hidden text-primary-dark md:block">
      幸福案例
    </p>
    <div class="grid gap-6 md:grid-cols-12">
      <div class="md:col-span-10 md:col-start-2">
        <div class="mb-6 rounded-xl bg-neutral-50 shadow-neutral-L2">
          <div
            class="flex flex-col items-center gap-4 p-4 md:flex-row md:gap-10 md:p-10"
          >
            <div class="shrink-0">
              <div class="mb-4">
                <NuxtImg
                  src="/story/story01.png"
                  alt=""
                  class="mx-auto w-[100px] md:w-[180px]"
                />
              </div>
              <p
                class="md:text-B1 bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text font-bold text-transparent"
              >
                Justin & Sophia
              </p>
            </div>
            <div class="">
              <div class="">
                <p class="text-H4 line-clamp-1 md:text-start">
                  這個姐姐讓我不想努力了
                </p>
                <p class="mt-2 line-clamp-5 text-start text-xl md:mt-4">
                  作為一名初創企業家,我的生活幾乎完全被工作所佔據,愛情對我來說,似乎是一件遙遠的事。但是,通過一個相親交友網站,我遇見了
                  Sophia——一位既成功又富有的商業女強人...我被 Sophia
                  的自信和優雅深深吸引。她對我的創業計劃表現出了極大的興趣,並且願意提供資金支持,這讓我感到既驚訝又感激。從那一刻起,我們的關係就不再僅僅是業務上的合作,而是逐漸發展成為了一段深刻的情感聯繫。
                </p>
              </div>
              <!-- <button class="btn-textOrIcon-sm mx-auto mt-4 md:mx-0 md:ms-auto">
                <p>閱讀全文</p>
              </button> -->
            </div>
          </div>
        </div>
        <div class="mb-6 rounded-xl bg-neutral-50 shadow-neutral-L2">
          <div
            class="flex flex-col items-center gap-4 p-4 md:flex-row md:gap-10 md:p-10"
          >
            <div class="shrink-0">
              <div class="mb-4">
                <NuxtImg
                  src="/story/story02.png"
                  alt=""
                  class="mx-auto w-[100px] md:w-[180px]"
                />
              </div>
              <p
                class="md:text-B1 bg-gradient-to-r from-[#FE839A] to-[#4A72FF] bg-clip-text font-bold text-transparent"
              >
                Luna & Robert
              </p>
            </div>
            <div class="">
              <div class="">
                <p class="text-H4 line-clamp-1 md:text-start">
                  我的幸福來得稍晚，但永遠不會太遲
                </p>
                <p class="mt-2 line-clamp-5 text-start text-xl md:mt-4">
                  當我的兒子提出要在相親交友網站為我尋找伴侶的時候,我既感動又有些擔心。作為一名多年來一直專注於兒子成長的單親媽媽,重新踏入尋找愛情的旅程讓我感到既興奮又不安。不久後,我收到了
                  Robert
                  的留言。他的話語中充滿了溫暖與理解,讓我感受到了前所未有的親切。經過幾次線上交流後,我們決定見面。見面那天,我們彷彿已是老朋友,談話中充滿了笑聲和共鳴。Robert是一位體貼、成熟的男士,他對我的生...
                </p>
              </div>
              <!-- <button class="btn-textOrIcon-sm mx-auto mt-4 md:mx-0 md:ms-auto">
                <p>閱讀全文</p>
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink to="/stores">
      <div class="lg:hidden">
        <button class="btn-textOrIcon-sm mx-auto mt-6">
          <p>查看更多</p>
          <icon-heroicons:arrow-right />
        </button>
      </div>
      <div class="hidden lg:block">
        <button class="btn-textOrIcon-lg mx-auto mt-6">
          <p>查看更多</p>
          <icon-heroicons:arrow-right />
        </button>
      </div>
    </NuxtLink>
  </div>
</template>
