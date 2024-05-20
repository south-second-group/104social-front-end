<script setup>
const route = useRoute();
const isOpen = ref(false);
const isOpenModal = ref(false);

const isActive = (path) => {
  return computed(() => route.path === path);
};

const buttonClass = (path) => {
  return isActive(path).value ? "active-class" : "inactive-class";
};
</script>

<style>
.no-border-no-shadow {
  border: none;
  box-shadow: none;
}
</style>

<template>
  <div class="sticky lg:z-[1000] h-[60px] lg:h-[120px] w-full">
    <div class="container mx-auto mt-0 lg:mt-5 rounded-full lg:bg-zinc-50/80">
      <div
        class="flex w-full px-3 py-3 lg:px-10 lg:py-4 justify-between items-center"
      >
        <NuxtLink to="/">
          <h1 class="shrink-0">
            <NuxtImg
              src="/logo.png"
              alt="104 緣來如此"
              class="w-[144px] lg:w-[192px]"
            />
          </h1>
        </NuxtLink>

        <!-- 手機板 -->
        <div class="flex items-center lg:hidden">
          <div class="p-3">
            

            <div>
              <UButton @click="isOpenModal = true" color="white" class="no-border-no-shadow">
                <icon-heroicons:bell-alert class="size-6" />
            </UButton>
              <UModal v-model="isOpenModal" prevent-close>
                <UCard
                  :ui="{
                    ring: '',
                    divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                  }"
                  class="linear-border rounded-md"
                >
                <Notification />
                <div class="flex py-4 px-2 justify-between font-bold text-primary-dark">
                  <div class="">
                    <NuxtLink to="/notifications">
                          <p class="text-base">通知列表</p>
                        </NuxtLink>
                  </div>
                  <div class="flex gap-[22px]">
                    <p>全部已讀</p>
                    <UButton
                      color="gray"
                      variant="ghost"
                      class="p-0"
                      @click="isOpenModal = false"
                    >
                    <p class="text-primary-dark text-base font-bold">
                      關閉
                    </p>
                    </UButton>
                  </div>

                </div>
                  
                </UCard>
              </UModal>
            </div>
          </div>
          <div class="">
            <UButton
              @click="isOpen = true"
              color="white"
              class="no-border-no-shadow"
            >
              <icon-heroicons:bars-3-bottom-right class="size-6 text-black" />
            </UButton>
            <USlideover v-model="isOpen" class="h-screen">
              <div
                class="p-4 w-full flex-1 bg-[url('~/public/nav/phone-bg.png')] bg-cover"
              >
                <div class="flex justify-end">
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="size-6"
                    @click="isOpen = false"
                  />
                </div>
                <div class="flex flex-col justify-between h-[95%] items-center">
                  <div class="mt-6 mb-4">
                    <NuxtImg src="/nav/couple .png" alt="" class="w-[150px]" />
                    <ul class="flex-col gap-4">
                      <li class="py-4 text-center text-B2">
                        <NuxtLink
                          to="/articles"
                          class="nav-items"
                          @click="isOpen = false"
                        >
                          <p>精選文章</p>
                        </NuxtLink>
                      </li>
                      <li class="py-4 text-center text-B2">
                        <NuxtLink
                          to="/searching_for_dating"
                          class="nav-items"
                          @click="isOpen = false"
                        >
                          <p>尋找對象</p>
                        </NuxtLink>
                      </li>
                      <li class="py-4 text-center text-B2">
                        <NuxtLink
                          to="/stroy"
                          class="nav-items"
                          @click="isOpen = false"
                        >
                          <p>找案例</p>
                        </NuxtLink>
                      </li>
                      <li class="py-4 text-center text-B2">
                        <NuxtLink
                          to="/about"
                          class="nav-items"
                          @click="isOpen = false"
                        >
                          <p>關於我們</p>
                        </NuxtLink>
                      </li>
                      <li class="py-4 text-center text-B2">
                        <NuxtLink
                          to="/account"
                          class="nav-items"
                          @click="isOpen = false"
                        >
                          <p>會員資料</p>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                  <div class="px-9 w-full">
                    <button
                      class="btn-linear-nav block w-full"
                      @click="isOpen = false"
                    >
                      <p>登入 / 註冊</p>
                    </button>
                  </div>
                </div>
              </div>
            </USlideover>
          </div>
        </div>

        <!-- 電腦版 -->
        <div class="hidden lg:flex w-full grow items-center justify-between">
          <ul class="ml-auto flex gap-6 items-center">
            <li class="p-2">
              <NuxtLink
                to="/articles"
                class="nav-items"
                :class="[
                  buttonClass('/articles'),
                  { active: isActive('/articles') },
                ]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>精選文章</p>
                </div>
              </NuxtLink>
            </li>
            <li class="p-2">
              <NuxtLink
                to="/searching_for_dating"
                class="nav-items"
                :class="[
                  buttonClass('/searching_for_dating'),
                  { active: isActive('/searching_for_dating') },
                ]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>尋找對象</p>
                </div>
              </NuxtLink>
            </li>
            <li class="p-2">
              <NuxtLink
                to="/stroy"
                class="nav-items"
                :class="[buttonClass('/stroy'), { active: isActive('/stroy') }]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>找案例</p>
                </div>
              </NuxtLink>
            </li>
            <li class="p-2">
              <NuxtLink
                to="/about"
                class="nav-items"
                :class="[buttonClass('/about'), { active: isActive('/about') }]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>關於我們</p>
                </div>
              </NuxtLink>
            </li>
            <li class="nav-items p-2">
              <NuxtLink
                to="/account"
                :class="[
                  buttonClass('/account'),
                  { active: isActive('/account') },
                ]"
              >
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>會員資料</p>
                </div>
              </NuxtLink>
            </li>
            <!-- <li class="p-2" @click="toggleNotification($event)">
              站內通知
            </li> -->
            <li class="nav-items p-2">
              <UPopover :popper="{ placement: 'bottom-end' }">
                <UButton color="white" class="no-border-no-shadow text-B2 p-0">
                  <p class="font-bold">站內通知</p>
                </UButton>

                <template #panel="{ close }">
                  <div class="p-4 linear-border rounded-md">
                    <Notification />
                    <div class="flex justify-between mt-2">
                      <div class="p-2">
                        <NuxtLink to="/notifications">
                          <p class="text-base">通知列表</p>
                        </NuxtLink>
                      </div>
                      <div class="flex gap-2">
                        <div class="p-2">
                          <p class="text-base">全部已讀</p>
                        </div>
                        <div class="p-2">
                          <UButton
                            label="Close"
                            @click="close"
                            class="no-border-no-shadow text-B2 p-0 bg-inherit"
                          >
                            <p class="font-bold">關閉</p>
                          </UButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </UPopover>
            </li>
          </ul>
          <div class="ml-4">
            <button class="btn-linear-nav block">
              <p>登入 / 註冊</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
