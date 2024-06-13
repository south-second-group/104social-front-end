import { GoogleGenerativeAI } from '@google/generative-ai'

export async function useGenAi(modelType) {
  const GOOGLE_AI_STUDIO_API_KEY = process.env.GOOGLE_AI_STUDIO_API_KEY

  const genAI = new GoogleGenerativeAI(GOOGLE_AI_STUDIO_API_KEY)
  const model = genAI.getGenerativeModel({ model: modelType })

  return model
}
