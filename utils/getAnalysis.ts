import { providers } from '@/constants/providers'

export const getAnalysis = async (
  chatName: string,
  messagesBySender1: string[],
  messagesBySender2: string[],
  providerIndexRef: React.MutableRefObject<number>
): Promise<string> => {
  for (let i = providerIndexRef.current; i < providers.length; i++) {
    const provider = providers[i]
    if (!provider.key) {
      console.log(`${provider.name} API key missing`)
      providerIndexRef.current += 1
      continue
    }
    try {
      const prompt = `Analyze the WhatsApp chat between ${chatName}. Sender 1 messages: ${messagesBySender1.join(
        '\n'
      )}. Sender 2 messages: ${messagesBySender2.join(
        '\n'
      )}. Provide a brief analysis of relationship dynamics, communication style, and compatibility.`
      console.log(`Trying ${provider.name} API... Prompt length: ${prompt.length}`)
      const response = await fetch(provider.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${provider.key}`,
        },
        body: JSON.stringify({
          model: provider.model,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.log(`${provider.name} failed: ${response.status} - ${errorText}`)
        providerIndexRef.current += 1
        continue
      }

      const data = await response.json()
      if (!data.choices?.[0]?.message?.content) {
        console.log(`${provider.name} invalid response:`, data)
        providerIndexRef.current += 1
        continue
      }

      return data.choices[0].message.content
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(`${provider.name} error: ${errorMessage}`, error)
      providerIndexRef.current += 1
      if (i === providers.length - 1) {
        throw new Error('All providers failed. Check API keys or network.')
      }
    }
  }
  throw new Error('No providers available.')
}
