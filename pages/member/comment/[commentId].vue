<script setup>
const route = useRoute()
const router = useRouter()
const rating = ref(3)
const tempRating = ref(0)

const apiData = reactive({
  isComment: null,
})

watch(() => route.params, (newParams, oldParams) => {
  // console.warn('route.params changed from:', oldParams, 'to:', newParams)
  apiData.isComment = newParams.commentId
}, { flush: 'post', immediate: true })
</script>

<template>
  <div class=" container p-3 text-start md:px-12">
    <div class="mx-auto max-w-[700px]">
      <utilsPhotoCaroucel />
      <h1 class="text-H4 mt-24">
        被被評價人資訊
      </h1>
      <div class="mt-6">
        <div class="mb-4 grid w-full  grid-cols-2 gap-6 ">
          <div>
            <label for="">姓名：</label>
            <ClientOnly>
              <span
                class=""
                :class="{
                  'font-montserrat': !useIsChineseFunc(
                    '蔡佩芬',
                  ),
                }"
              >蔡佩芬</span>
            </ClientOnly>
          </div>
          <div>
            <label for="">年收入：</label>
            <span class="">60萬-90萬</span>
          </div>
          <div>
            <label for="">工作：</label>
            <span class="">營養師</span>
          </div>
          <div class="font-montserrat">
            <label for="">Line ID：</label>
            <span>bb0909123</span>
          </div>

          <div class="col-span-2  font-montserrat">
            <label for="">蔡佩芬的標籤：</label>
            <div class=" mt-3  flex flex-wrap items-center justify-center gap-2 rounded-md">
              <UBadge
                v-for="i in 10"
                :key="i"
                class="btn-withIcon-outline-rwd  pointer-events-none  !rounded-lg  !px-1 !py-[2px] "
              >
                <p
                  class="!text-[10px]"
                  :class="{
                    'font-montserrat': !useIsChineseFunc(
                      'Badge',
                    ),
                  }"
                >
                  Badge
                </p>
              </UBadge>
              <UBadge
                v-for="i in 10"
                :key="i"
                class="btn-withIcon-outline-rwd pointer-events-none !rounded-lg  !px-1 !py-[2px] "
              >
                <p
                  class="!text-[10px]"
                  :class="{
                    'font-montserrat': !useIsChineseFunc(
                      '中文字',
                    ),
                  }"
                >
                  中文字
                </p>
              </UBadge>
            </div>
          </div>
        </div>

        <div class="mt-12 w-full space-y-3">
          <label
            class=" text-H4"
            for=""
          >見面心得</label>
          <p
            v-if="apiData.isComment === 'true'"
            class=" rounded-md border-2 p-3"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A commodi
            molestiae tenetur
            ipsa
            temporibus quis distinctio tempore, minus amet voluptates deserunt tempora culpa veniam eveniet facere ea
            optio sapiente libero!
          </p>
          <UTextarea
            v-else
            :ui="{ base: ' focus:!ring-primary-dark' }"
            :rows="10"
            placeholder="請填寫心得"
          />
        </div>

        <div class="mt-12 w-full space-y-3">
          <label
            class=" text-H4"
            for=""
          >整體評價</label>
          <div
            v-if="apiData.isComment === 'true'"
            class="flex"
          >
            <icon-heroicons:heart-solid
              v-for="heart in [1, 2, 3, 4, 5]"
              :key="heart"
              class="size-10"
              :class="{ 'text-primary-dark': heart <= rating, 'text-gray-300': heart > rating }"
            />
          </div>
          <div
            v-else
            class="flex"
          >
            <span
              v-for="heart in [1, 2, 3, 4, 5]"
              :key="heart"
              @click="rating = heart"
            >
              <icon-heroicons:heart-solid
                class="size-10 hover:cursor-pointer"
                :class="{ 'text-primary-dark': heart <= tempRating, 'text-gray-300': heart > tempRating }"
                @mouseenter="tempRating = heart"
                @mouseleave="tempRating = rating"
              />
            </span>
          </div>
        </div>

        <section class="mt-12 flex justify-center">
          <button
            v-if="apiData.isComment === 'true'"
            class="  px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark "
            @click="router.push('/member/comment/CommentPage')"
          >
            <p>回到我留下的評價</p>
          </button>
          <button
            v-else
            class=" rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px]  leading-[24px] text-white "
            @click="router.push('/member/comment/CommentPage')"
          >
            <p>完成評價</p>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
