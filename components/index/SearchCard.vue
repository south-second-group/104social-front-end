<template>
  <div class="mx-auto flex h-full max-w-custom-container items-center">
    <div class="linear-border w-[634px] rounded-3xl p-[60px] ">
      <div class="flex-col gap-60 ">
        <div class="relative mb-[60px]">
          <p class="mb-2 text-start text-2xl font-bold text-zinc-950">
            我是
          </p>
          <div class="flex flex-col">
            <select
              id=""
              name=""
              class="rounded-lg border-zinc-200 p-3 text-zinc-950 focus:border-red-400"
            >
              <option
                value=""
                disabled
                selected
                hidden
              >
                請選擇性別
              </option>
              <option value="">
                男生
              </option>
              <option value="">
                女生
              </option>
            </select>
            <div class="absolute bottom-4 right-3 text-primary-dark">
              <icon-heroicons-chevron-down />
            </div>
          </div>
        </div>
        <div class="relative  mb-[60px]">
          <p class="mb-2 text-start text-2xl font-bold text-zinc-950">
            我想尋找
          </p>
          <div class="flex flex-col">
            <select
              id=""
              name=""
              class="rounded-lg border-zinc-200 p-3 text-zinc-950 focus:border-red-400"
            >
              <option
                value=""
                disabled
                selected
                hidden
              >
                請選擇性別
              </option>
              <option value="">
                男生
              </option>
              <option value="">
                女生
              </option>
            </select>
            <div class="absolute bottom-4 right-3 text-primary-dark">
              <icon-heroicons-chevron-down />
            </div>
          </div>
        </div>
        <div class="mb-[60px]">
          <p class="mb-2 text-start text-2xl font-bold text-zinc-950">
            尋找對象的關鍵字
          </p>
          <div class="flex flex-col">
            <input
              id=""
              type="text"
              name=""
              placeholder="職業、興趣、星座..."
              class="rounded-lg border-zinc-200 p-3 text-zinc-950 focus:border-red-400"
            >
          </div>
        </div>
      </div>
      <button
        type="button"
        class="btn-linear-lg block"
      >
        <p>搜尋</p>
      </button>
    </div>
  </div>
</template>
