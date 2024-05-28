<script setup>
const open = ref(false)
const temp = ref(false)
const selectedItem = ref(null) // v-model 我測試無法用，只好用 click 事件 ，應該要可以，等勇者來解
const items = [
  [
    {
      label: 'Profile',
    },
    {
      label: 'Profile2',
      click: () => (selectedItem.value = 'Profile2'),
    },
  ],
]

const isCheck = ref(false)
const searchValue = ref('')

const selectedOption = ref('請選擇性別')
const options = ['男', '女', '不透露']
</script>

<template>
  <div class="container flex flex-1 flex-col items-start space-y-5">
    <button class="btn-linear-sm block">
      <p>搜尋</p>
    </button>

    <button class="btn-linear-md block">
      <p>搜尋</p>
    </button>

    <button class="btn-linear-lg block">
      <p>搜尋</p>
    </button>

    <button class="btn-withIcon-fill">
      <icon-heroicons:heart />
      <p>邀約</p>
    </button>

    <button class="btn-withIcon-outline">
      <icon-heroicons:lock-open />
      <p>解鎖評價</p>
    </button>

    <button
      class="btn-textOrIcon-lg"
      disabled
    >
      <p>查看更多</p>
      <icon-heroicons:arrow-right />
    </button>

    <button class="btn-textOrIcon-sm">
      <p>查看更多</p>
      <icon-heroicons:arrow-right />
    </button>

    <button class="btn-textOrIcon-sm">
      <p>閱讀全文</p>
    </button>

    <button class="btn-textOrIcon-lg">
      <icon-heroicons:chat-bubble-left-ellipsis />
    </button>

    <button
      class="btn-textOrIcon-sm pointer-events-none rounded-full"
      disabled
    >
      <icon-heroicons:chat-bubble-left-ellipsis />
    </button>

    <UInput
      v-model="searchValue"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      :trailing="false"
      placeholder="搜尋"
      class="search-lg"
    />
    {{ searchValue }}

    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      :trailing="false"
      placeholder="搜尋"
      class="search-sm"
      disabled
    />

    <UInput
      icon=""
      size="lg"
      color="white"
      :trailing="false"
      placeholder="職業、興趣、星座..."
      class="search-sm"
    />

    <!-- 棄用無法取值 -->
    <section v-show="false">
      <UDropdown
        v-model:open="temp"
        :items="items"
        :popper="{ placement: 'bottom-start' }"
        :ui="{
          width: 'w-[303px]',
          ring: 'ring-1 ring-gray-100',
          shadow: 'shadow-md',
        }"
        class="dropdown-sm pointer-events-none opacity-60"
        :class="{
          border: temp,
        }"
        disabled
      >
        <UButton
          color="white"
          label="請選擇性別"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          class="text-[#A1A1AA]"
        />
      </UDropdown>
      <UDropdown
        v-model:open="open"
        :items="items"
        :popper="{ placement: 'bottom-start' }"
        :ui="{
          width: 'w-[514px]',
          ring: 'ring-1 ring-gray-100',
          shadow: 'shadow-md',
        }"
        class="dropdown-lg"
        :class="{
          border: open,
        }"
      >
        <UButton
          color="white"
          :label="selectedItem || '請選擇性別'"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          class="text-[#A1A1AA]"
        />
        <template #item="{ item }">
          <li
            :key="item"
            class="dropdown-item list-none"
            @click="selectedItem = item.label"
          >
            <p>{{ item.label }}</p>
          </li>
        </template>
      </UDropdown>
      {{ selectedItem || '請選擇性別' }}
    </section>

    <utilsDropdownComp
      v-model="temp"
      :options="options"
      size="sm"
      :disabled="true"
    />
    <utilsDropdownComp
      v-model="selectedOption"
      :options="options"
      size="lg"
      :disabled="false"
    />
    {{ selectedOption || '請選擇性別' }}

    <div>
      <h2 class="text-H3">
        我是中文字體，英文數字示範：
      </h2>
      <h2
        class="text-H3 whitespace-pre-wrap"
        :class="{
          'font-montserrat': !useIsChineseFunc(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
          ),
        }"
      >
        ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 (montserrat)
      </h2>
      <h2 class="text-H3 font-notoSansTraditionalChinese">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 (notoSansTraditionalChinese)
      </h2>
      <h2 class="text-H3 font-sans">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 (NUXT UI預設 ui-sans-serif)
      </h2>
    </div>

    <div class="text-start">
      <p class="text-H1">
        text-H1
      </p>
      <p class="text-H2">
        text-H2
      </p>
      <p class="text-H3">
        text-H3
      </p>
      <p class="text-H4">
        text-H4
      </p>
      <p class="text-B1">
        text-B1
      </p>
      <p class="text-B2">
        text-B2
      </p>
      <p class="text-B3">
        text-B3
      </p>
      <p class="text-B4">
        text-B4
      </p>
    </div>

    <div>
      <p>.card-hover</p>
      <div
        class="card-hover flex h-52 w-96 items-center justify-center gap-5 bg-[url(~/assets/img/figma/blur-background.png)] bg-cover"
      >
        <div class="blur-back-40 size-32 bg-white text-black">
          .blur-back-40
        </div>
        <div class="blur-back-80 size-32 bg-white text-black">
          .blur-back-80
        </div>
      </div>
    </div>

    <div class="flex gap-10">
      <utilsCollectionBtn v-model="isCheck" />
      <p>defineModel() isCheck : {{ isCheck }}</p>
      <!-- https://muki.tw/vmodel-definemodel-props-emit/?fbclid=IwAR3BMyVyKW6AwjtzYeP7rH6Nvnv6xRr615D9X1L2Y6yxVRg-S8xv5kfhO8g -->
      <!-- https://github.com/vuejs/rfcs/discussions/503 -->
    </div>
  </div>
</template>
