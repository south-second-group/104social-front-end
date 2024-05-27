<script setup>
</script>

<template>
  <div class=" container border p-3 text-start md:p-12">
    <div class="mx-auto max-w-[700px]">
      <utilsPhotoCaroucel />
      <h1 class="text-H4 mt-24">
        {{ true ? '邀請人資訊' : '被邀請人資訊' }}
      </h1>

      <div class="mt-6">
        <div class="mb-4 grid w-full  grid-cols-2 gap-6 ">
          <div>
            <label for="">姓名：</label>
            <ClientOnly>
              <span
                class=""
                :class="{
                  'font-montserrat': !isChinese(
                    'aaa',
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
            <div class="block  space-x-2 space-y-2 rounded-md px-3 py-1">
              <UBadge
                v-for="i in 10"
                :key="i"
                class="btn-withIcon-outline-rwd  pointer-events-none  !rounded-lg  !px-1 !py-[2px] "
              >
                <p
                  class="!text-[10px]"
                  :class="{
                    'font-montserrat': !isChinese(
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
                    'font-montserrat': !isChinese(
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
          > {{ true ? '邀請人資訊' : '被邀請人資訊' }}
          </label>
          <p class=" rounded-md border-2 p-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A commodi
            molestiae tenetur
            ipsa
            temporibus quis distinctio tempore, minus amet voluptates deserunt tempora culpa veniam eveniet facere ea
            optio sapiente libero!
          </p>
        </div>

        <div class="mt-12 w-full space-y-3">
          <label
            class=" text-H4"
            for=""
          >整體評價</label>
          <div class="flex  ">
            <icon-heroicons:heart-solid
              v-for=" i in 4"
              :key="i"
              class="size-10  text-primary-dark"
            />
          </div>
        </div>

        <section class="mt-12 flex justify-center">
          <button class="  px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark ">
            <p>返回我的邀約</p>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
