export const providers = [
  {
    name: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    key: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
    model: 'openai/gpt-3.5-turbo',
  },
  {
    name: 'TogetherAI',
    url: 'https://api.together.xyz/v1/chat/completions',
    key: process.env.EXPO_PUBLIC_TOGETHERAI_API_KEY,
    model: 'meta-llama/Llama-3.1-8B-Instruct-Turbo',
  },
  {
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    key: process.env.EXPO_PUBLIC_GROQ_API_KEY,
    model: 'llama-3.1-8b-instant',
  },
]
