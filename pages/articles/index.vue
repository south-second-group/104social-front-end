<script setup>
useHead({
  title: '精選文章',
})

const articles = [
  {
    cover: 'cover01-lg',
    title: '大齡焦慮! 年過 40 錯了嗎?',
    sub: '進入40歲的門檻,社會與內心的雙重壓力使許多人感到焦慮。探討這個年齡階段的真實挑戰與成長機會。',
  },
  {
    cover: 'cover06-lg',
    title: '愛情世界裡永遠的在野黨',
    sub: '這個男人怎麼這麼愛唱反調，女兒喜歡藍色又怎樣?說好尊重兒子依自己的興趣選填志願，總是在決定前一刻化身情勒版馬景濤...',
  },
  {
    cover: 'cover04-lg',
    title: '沒想過他真的是魔法師',
    sub: '原本以為他只是有點害羞，但說到兩人之間的共同興趣時又被他的熱情感染，沒想到那一晚...',
  },
  {
    cover: 'cover05-lg',
    title: '換個角度，你也可以扭轉戰局',
    sub: '兩人交往難免有所爭吵，但切記有爭執時不要一意孤行，唯有溝通才是通往進步的鑰匙，謹記以下要點，你也是情商大師',
  },
  {
    cover: 'cover02-lg',
    title: '整天抱怨岳母難相處,父母雙亡在哪裡?',
    sub: '岳母難搞?試試無父母可搞的輕鬆生活,一段探討無需承擔家庭責任,享受完全自由生活的幽默思考',
  },
  {
    cover: 'cover03-lg',
    title: '無經驗可, Sugar daddy / mommy 在找你',
    sub: '在這個快節奏的世界中,尋找一位經濟上能給予支持的伴侶似乎成了一種趨勢。揭開Sugar daddy/mommy 內心世界的渴望與激情',
  },
]
</script>

<template>
  <div class="container my-[80px] md:my-12">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <articlesArticle
        v-for="article in articles"
        :key="article.title"
        :cover="article.cover"
        :title="article.title"
        :sub="article.sub"
      />
    </div>
  </div>
</template>
