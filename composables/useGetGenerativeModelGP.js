import { useGenAi } from './useGenAi.js'

export async function useGetGenerativeModelGP(prompt) {
  const rule1 = `
參考以下是訊息範例，邀清訊息必需加入對方資訊：${prompt}，產生一段三百字繁體中文的邀請訊息：

**輕鬆自然:**
* "最近想吃 [餐廳類型]，你喜歡嗎？有空一起吃飯嗎？"
* "聽說 [餐廳名] 很不錯，想一起去試試看嗎？"
* "週末有空嗎？我想約你吃飯，聊聊天。"

**展現誠意:**
* "一直想找機會和你聊聊，不知道你有沒有空一起吃飯？"
* "我很欣賞你的 [特質/想法]，想更了解你，可以請你吃飯嗎？"
* "想邀請你一起吃飯，希望可以和你分享一些 [話題]。"

**幽默風趣:**
* "我最近食慾不振，想請你來當我的飯友，幫我開開胃。"
* "聽說你很會挑餐廳，可以推薦一家好吃的嗎？我想請你吃飯。"
* "我的朋友都說我挑食，你能來教教我怎麼吃嗎？我請你吃飯當學費。"

**建議:**
* 選擇她喜歡的餐廳類型。
* 提前詢問她的空閒時間，並給予選擇空間。
* 避免過於油膩或曖昧的言語，保持真誠和尊重。
* 訊息發送後，記得耐心等待她的回覆，不要過於急躁。

**額外提醒:**
* 如果是第一次邀約，建議選擇公共場所，避免讓女生感到不安。
*  尊重她的選擇，如果她拒絕了，請不要勉強。
`

  //   const rule2 = `
  // 依照對方資訊和興趣和職業：${prompt}，產生約三百字繁體中文的單獨約會的邀約訊息
  // `

  const model = await useGenAi('gemini-1.5-flash') // 'gemini-1.5-flash' 'gemini-pro'
  const result = await model.generateContent(rule1)
  const response = await result.response
  const text = response.text()

  return text
}
