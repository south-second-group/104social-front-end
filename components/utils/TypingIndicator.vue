<template>
  <div class="ticontainer">
    <div class="tiblock">
      <div class="tidot"></div>
      <div class="tidot"></div>
      <div class="tidot"></div>
    </div>
  </div>
</template>

<style scoped>
.tiblock {
  align-items: center;
  display: flex;
  height: 17px;
}

/* .ticontainer .tidot {
  background-color: #90949c;
} */

.tidot {
  animation: mercuryTypingAnimation 1.5s infinite ease-in-out;
  border-radius: 2px;
  display: inline-block;
  height: 4px;
  margin-right: 2px;
  width: 4px;
}

@keyframes mercuryTypingAnimation {
  0% {
    transform: translateY(0px)
  }

  28% {
    transform: translateY(-5px)
  }

  44% {
    transform: translateY(0px)
  }
}

.tidot:nth-child(1) {
  animation-delay: 200ms;
  background-color: #FE839A;
}

.tidot:nth-child(2) {
  animation-delay: 300ms;
  background-color: #d165d1;
}

.tidot:nth-child(3) {
  animation-delay: 400ms;
  background-color: #4A72FF;
}
</style>
