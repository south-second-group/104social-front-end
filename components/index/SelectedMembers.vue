<script setup lang="ts">
const items = [{
  name: 'Lisa',
  describe_1: ['28 歲', '167 cm'],
  describe_2: ['房仲業'],
  rating: 4.6,
  ratingCount: 12,
  collect: false,
  hashtag: ['婚後自住', '不生小孩'],
  avatar: { src: '/member/member-lg-01.png' },
}, {
  name: 'Mike',
  describe_1: ['31 歲'],
  describe_2: ['台南', '工程師'],
  rating: 4.3,
  ratingCount: 12,
  collect: false,
  hashtag: ['年薪百萬'],
  avatar: { src: '/member/member-lg-02.png' },
}, {
  name: 'Joshua',
  describe_1: ['30 歲', '185 cm'],
  describe_2: ['桃園機場地勤'],
  rating: 4.1,
  ratingCount: 15,
  collect: false,
  hashtag: ['開放關係', '水瓶座'],
  avatar: { src: '/member/member-lg-03.png' },
}, {
  name: 'Liam',
  describe_1: ['45 歲', '173 cm'],
  describe_2: ['台中'],
  rating: 4.6,
  ratingCount: 30,
  collect: false,
  hashtag: ['BDSM', '主'],
  avatar: { src: '/member/member-lg-04.png' },
}, {
  name: 'Linda',
  describe_1: ['38 歲', '160 cm'],
  describe_2: ['業務員'],
  rating: 4.6,
  ratingCount: 12,
  collect: false,
  hashtag: ['無孝親壓力', '台北有房'],
  avatar: { src: '/member/member-lg-05.png' },
}, {
  name: 'Emily',
  describe_1: ['19 歲', '155 cm'],
  describe_2: ['新竹'],
  rating: 4.6,
  ratingCount: 12,
  collect: false,
  hashtag: ['Sugar baby', '射手座'],
  avatar: { src: '/member/member-lg-06.png' },
}]
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-t-[40px] bg-[#fff5f5] py-12 lg:rounded-t-[80px] lg:py-[100px]"
  >
    <div class="absolute -left-20 -top-20 opacity-80">
      <NuxtImg
        src="/member/blur/lg.png"
        alt="banner_image"
        class="w-[242px]"
      />
    </div>
    <div class="container relative z-50 m-auto">
      <p class="text-H4 mb-6 font-bold text-primary-dark md:hidden lg:mb-0">
        精選會員
      </p>
      <p
        class="text-H2 mb-6 hidden font-bold text-primary-dark md:block lg:mb-0"
      >
        精選會員
      </p>
      <!-- 手機版 -->
      <UCarousel
        v-slot="{ item }"
        :items="items"
        class="block md:hidden"
      >
        <div class="mx-auto text-center">
          <indexMemberCard :member="item" />
        </div>
      </UCarousel>

      <!-- 電腦版 -->
      <div class="my-[60px] hidden grid-cols-2 gap-6 md:grid">
        <div
          v-for="(item, index) in items"
          :key="index"
        >
          <indexMemberCard :member="item" />
        </div>
      </div>
    </div>
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
  </div>
</template>
