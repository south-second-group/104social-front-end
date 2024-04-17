export function useDemo() {
  const demo = ref('Hello, world!')
  return computed(() => `${demo.value} (composable)`)
}
