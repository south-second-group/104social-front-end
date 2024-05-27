export function isChinese(char) {
  return /[\u4E00-\u9FA5]/.test(char)
}
