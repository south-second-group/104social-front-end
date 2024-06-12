<script setup>
const stores = [
  {
    cover: 'story01',
    title: 'Justin & Sophia',
    sub: '作為一名初創企業家,我的生活幾乎完全被工作所佔據,愛情對我來說,似乎是一件遙遠的事。但是,通過一個相親交友網站,我遇見了 Sophia——一位既成功又富有...',
  },
  {
    cover: 'story02',
    title: 'Luna & Robert',
    sub: '當我的兒子提出要在相親交友網站為我尋找伴侶的時候,我既感動又有些擔心。作為一名多年來一直專注於兒子成長的單親媽媽,重新踏入...',
  },
  {
    cover: 'story03',
    title: 'Tracy & Peter',
    sub: '其實也沒什麼曲折的故事，就我覺得她是耐看型的美，而她也不嫌我胖，我們兩個的生活習慣還挺同步的，最重要的是有人可以一起 share Netflix 的費用啦',
  },
  {
    cover: 'story04',
    title: 'Mark & Victoria',
    sub: '橫刀奪愛才是愛!在旅館的那晚我鼓起勇氣敲了他的房門，而他真的應門了，如果時光倒轉要我再做一次選擇，我會直接把門拆了',
  },
  {
    cover: 'story05',
    title: 'June & Isaac',
    sub: '沒想到會再遇見國中同學，在 104 緣來如此 上發現 Isaac 時我簡直不敢相信我的眼睛，而他也選擇在我們國中時最常翹課後待整天的麥當勞向我求婚!!',
  },
  {
    cover: 'story06',
    title: 'Lucy & Mason',
    sub: '今天是 Lucy 做滿月子出關的第一天，我們也公證結婚了! 至於想不想生第二胎? 我才不會承認月子中心的月子餐真的很好吃!!',
  },
]
</script>

<template>
  <div class="container my-20 md:my-12">
    <!-- <p class="text-H3 mb-[40px] text-start md:mb-10">
      幸福案例
    </p> -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <storesStory
        v-for="story in stores"
        :key="story.title"
        :cover="story.cover"
        :title="story.title"
        :sub="story.sub"
      />
    </div>
  </div>
</template>
