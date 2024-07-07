<script setup>
import DOMPurify from 'isomorphic-dompurify'
import { happyStoryAPI } from '@/apis/repositories/happyStory'

const { data } = await happyStoryAPI.getHappyStory()
const allStories = data.value.data

function cleanContent(content, maxLength = 100) {
  if (!content)
    return ''

  // 使用 DOMPurify 移除 HTML 標籤
  const cleanHtml = DOMPurify.sanitize(content, { ALLOWED_TAGS: [] })

  // 移除多餘的空白字符和換行，並在單詞間插入逗號
  const cleanText = cleanHtml
    .replace(/\s+/g, ',')
    .replace(/,+/g, ',')
    .replace(/^,|,$/g, '')
    .trim()

  // 限制文本長度
  if (cleanText.length <= maxLength)
    return cleanText

  const truncated = cleanText.slice(0, maxLength - 3).replace(/,+$/, '')
  return truncated.length ? `${truncated}...` : ''
}

function generateTitle(story) {
  return `${story.myName} & ${story.partnerName}`
}
</script>

<template>
  <div class="container my-20 md:my-12">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <storesStory
        v-for="story in allStories"
        :key="story._id"
        :cover="story.coverImage"
        :title="generateTitle(story)"
        :sub="cleanContent(story.content, 100)"
        :example-id="story._id"
      />
    </div>
  </div>
</template>
