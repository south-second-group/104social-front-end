<script setup>
useHead({
  title: '關於我們',
})

const hoveredTab = ref('')
function hoverHandler(tab) {
  hoveredTab.value = tab
}
</script>

<template>
  <main class="!px-3">
    <div class="wrap">
      <div
        class="item"
        data-order="里程碑二 Otis"
        :class="{ 'item-hover': hoveredTab === 'otis' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2FOtis.jpg?alt=media&token=891b0cf1-1707-4ab7-8388-991cebbe8cd6');"
        @mouseenter="hoverHandler('otis')"
      ></div>
      <div
        class="item"
        data-order="里程碑三 群嘉"
        :class="{ 'item-hover': hoveredTab === 'cc' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2F%E7%BE%A4%E5%98%89.jpg?alt=media&token=ce13a5e3-be84-4372-b60a-47dc4cfb8bd9');"
        @mouseenter="hoverHandler('cc')"
      ></div>
      <div
        class="item"
        data-order="里程碑四 Eva"
        :class="{ 'item-hover': hoveredTab === 'eva' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2Feva.jpg?alt=media&token=0b6f178e-046c-4266-a5fd-5cc644fbabeb');"
        @mouseenter="hoverHandler('eva')"
      ></div>
      <div
        class="item"
        data-order="里程碑五 稚庭"
        :class="{ 'item-hover': hoveredTab === 'eric' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2F%E7%A8%9A%E5%BA%AD.jpg?alt=media&token=d9a2f6e5-ab68-42cf-bbc8-1677f406381a');"
        @mouseenter="hoverHandler('eric')"
      ></div>
      <div
        class="item"
        data-order="里程碑六 Frank"
        :class="{ 'item-hover': hoveredTab === 'frank' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2FFrank.jpg?alt=media&token=e7d27f1d-daa7-4f8a-9d96-f207bbf615c5');"
        @mouseenter="hoverHandler('frank')"
      ></div>
      <div
        class="item font-montserrat"
        data-order="里程碑七 William"
        :class="{ 'item-hover': hoveredTab === 'william' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2FIMG_5026.jpg?alt=media&token=126ed273-0959-44d8-879e-8647c06d335c');"
        @mouseenter="hoverHandler('william')"
      ></div>
    </div>

    <aboutOtisComp :hovered-tab="hoveredTab" />
    <aboutCcComp :hovered-tab="hoveredTab" />
    <aboutEvaComp :hovered-tab="hoveredTab" />
    <aboutEricComp :hovered-tab="hoveredTab" />
    <aboutFrankComp :hovered-tab="hoveredTab" />
    <aboutWilliamComp :hovered-tab="hoveredTab" />
  </main>
</template>

<style lang="scss" scoped>
.wrap {
  margin: 50px auto 0;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  border: 1px solid lighten(#fe839a, 10);
  display: flex;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 200px;
  }
}

.item {
  flex-grow: 1.5;
  height: 100%;
  background: linear-gradient(to bottom, #fe839a, #4a72ff);
  position: relative;
  transition: all 500ms ease-in-out;
  background-position: center;
  background-size: cover;
  border-image: fill 0 linear-gradient(#0003, #3b1b1b);

  &.item-hover {
    flex-grow: 2.3;
    background-color: lighten(darkred, 20);

    border-image: fill 0 linear-gradient(#0003, #0003);
    &::before {
      color: white;
      backdrop-filter: blur(5px);
      background: rgb(255, 255, 255, 0.3);
    }
  }

  &:before {
    content: attr(data-order);
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    overflow-wrap: normal;
    border-radius: 10px;
    padding: 10px 5px;
    width: 90px;
    @media (max-width: 768px) {
      font-size: 0.5em;
      width: 60px;
      padding: 0;
    }
  }
}
</style>
