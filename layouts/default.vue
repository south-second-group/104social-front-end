<template>
  <div class="flex min-h-screen flex-col">
    <Nav />
    <main class="grow px-8 py-16 text-center">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
