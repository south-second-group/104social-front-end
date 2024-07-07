<script setup>
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
        data-order="1"
        :class="{ 'item-hover': hoveredTab === '1' }"
        @mouseenter="hoverHandler('1')"
      ></div>
      <div
        class="item"
        data-order="2"
      ></div>
      <div
        class="item"
        data-order="3"
      ></div>
      <div
        class="item"
        data-order="4"
      ></div>
      <div
        class="item"
        data-order="5"
      ></div>
      <div
        class="item"
        data-order="里程碑＿七/八/九 william"
        :class="{ 'item-hover': hoveredTab === 'william' }"
        style="
          background-image: url('https://firebasestorage.googleapis.com/v0/b/social-e030c.appspot.com/o/about%2FIMG_5026.jpg?alt=media&token=126ed273-0959-44d8-879e-8647c06d335c');"
        @mouseenter="hoverHandler('william')"
      ></div>
    </div>

    <aboutWilliamComp :hovered-tab="hoveredTab" />
  </main>
</template>

<style lang="scss" scoped>
.wrap {
  margin: 0 auto;
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
