<script setup>
defineProps({
  close: Function,
})

const memberStore = useMemberStore()

const keyToChinese = {
  value: '性格',
  personal: '個性',
  zodiac: '星座',
  hobby: '愛好',
  news: '新聞',
}

// 所有標籤
const allTags = reactive([
  // {
  //   key: 'value',
  //   tags: [
  //     '誠實',
  //     '公正',
  //     '正直',
  //     '尊重',
  //     '慷慨',
  //     '勇敢',
  //     '責任感',
  //     '寬容',
  //     '助人',
  //     '合作',
  //     '謙虛',
  //     '堅韌',
  //   ],
  // },
  {
    key: 'personal',
    tags: [
      '樂觀',
      '幽默',
      '積極',
      '溫柔',
      '細心',
      '冷靜',
      '活潑',
      '耐心',
      '自信',
      '謙虛',
      '大方',
      '溫和',
    ],
  },
  {
    key: 'zodiac',
    tags: [
      '牡羊座',
      '金牛座',
      '雙子座',
      '巨蟹座',
      '獅子座',
      '處女座',
      '天秤座',
      '天蠍座',
      '射手座',
      '摩羯座',
      '水瓶座',
      '雙魚座',
    ],
  },
  {
    key: 'hobby',
    tags: [
      '讀書',
      '旅行',
      '攝影',
      '烹飪',
      '電影',
      '音樂',
      '登山',
      '游泳',
      '花藝',
      '健身',
      '瑜伽',
      '釣魚',
    ],
  },
  {
    key: 'news',
    tags: [
      '政治',
      '經濟',
      '科技',
      '環境',
      '社會',
      '醫療',
      '教育',
      '文化',
      '運動',
      '娛樂',
      '國際',
      '國內',
    ],
  },
])

const selectedTag = ref('personal')
const searchTerm = ref('') // 新增用於存儲搜尋關鍵字的狀態

const filteredTags = computed(() => {
  if (!searchTerm.value)
    return []

  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return allTags.flatMap(tagGroup =>
    tagGroup.tags.filter(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)),
  )
})

const selectedTagList = computed(() => {
  if (searchTerm.value)
    return filteredTags.value
  const selected = allTags.find(tag => tag.key === selectedTag.value)
  return selected ? selected.tags : []
})

function handleClick(key) {
  selectedTag.value = key
}

// onMounted(() => {
//   console.log(allTags)
// })
</script>

<template>
  <div class="box w-[95dvw] p-4 md:w-[666px]">
    <h3 class="py-2 font-bold lg:text-xl">
      標籤選單
    </h3>

    <ul class="flex items-center justify-between py-3 lg:justify-center lg:space-x-4">
      <li
        v-for="(item, index) in allTags"
        :key="index"
        class="shrink-0"
      >
        <button
          class="rounded-full px-5 py-2 font-bold duration-300 ease-in-out lg:hover:bg-primary-dark lg:hover:text-white"
          :class="selectedTag === item.key ? 'bg-primary-dark text-white' : 'bg-neutral-300'"
          @click="handleClick(item.key)"
        >
          {{ keyToChinese[item.key] }}
        </button>
      </li>
    </ul>

    <div class="w-full bg-neutral-100 p-3">
      <!-- 輸入關鍵字 -->
      <input
        v-model="searchTerm"
        class="mb-3 h-12 w-full rounded-lg border border-neutral-300 bg-white placeholder:text-neutral-400"
        placeholder="請輸入標籤關鍵字"
      >

      <!-- 標籤按鈕 -->
      <div class="grid min-h-[320px] grid-cols-2 gap-4 md:grid-cols-4 lg:min-h-[152px]">
        <button
          v-for="(tag, index) in selectedTagList"
          :key="index"
          class="h-10 rounded-full bg-neutral-300 px-5 py-2 duration-300 ease-in-out lg:hover:bg-primary-dark lg:hover:text-white"
          @click="memberStore.addToPersonalMyTags(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <button
      label="Close"
      class="mt-3 rounded-full px-20 py-2 font-bold text-primary-dark duration-300 ease-in-out lg:hover:bg-primary-dark lg:hover:text-white"
      @click="close"
    >
      關閉
    </button>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  z-index: 5000;
}

.box::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 6px;
  padding: 2px;
  opacity: 0.6;
  background: linear-gradient(90deg, #fe839a, #4a72ff);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.active-tab {
  color: #52525b;
  transition-duration: 0.5s;
}

.inactive-tab {
  color: #a1a1aa;
  transition-duration: 0.5s;
}

.active-tab :hover,
.inactive-tab :hover {
  color: #f47277;
  transition-duration: 0.5s;
}

.no-border-no-shadow {
  border: none;
  box-shadow: none;
}
</style>
