<script setup>
import CKEditor from '@ckeditor/ckeditor5-vue'
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font'
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { Link } from '@ckeditor/ckeditor5-link'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Essentials } from '@ckeditor/ckeditor5-essentials'

const storyContent = defineModel()

const ckeditor = defineComponent(CKEditor.component)
const editorConfig = {
  placeholder: '請輸入您要分享的內容...',
  plugins: [
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Link,
    Paragraph,
    Essentials,
  ],
  toolbar: {
    items: [
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'link',
      '|',
      'undo',
      'redo',
      '|',
    ],
    shouldNotGroupWhenFull: true, // RWD 自動換行
  },
  fontSize: { // 自訂義字級選項
    options: [12, 14, 16, 18, 20, 24, 28, 30, 32],
  },
  link: { // 點擊連結另起新分頁
    addTargetToExternalLinks: true,
  },
}
</script>

<template>
  <div>
    <ckeditor
      v-model="storyContent"
      :editor="ClassicEditor"
      :config="editorConfig"
    />
  </div>
</template>

<style scoped>
:deep(.ck-content) {
  min-height: 300px;
}
</style>
