import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.post('/command', async (req, res) => {
  const { prompt } = req.body

  const fullPrompt = `
You are Strategist Juno, the tactical bot commander for ULTRA SYSTEM.
Convert this user instruction into a JSON action. Include:
- action: what should be done (e.g., toggle_dispatch, change_regime, explain_signal)
- params: required parameters (e.g., "enabled": true)
- speak: short tactical spoken response

User: ${prompt}
`

  try {
    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: fullPrompt }],
      }),
    })

    const json = await gptRes.json()
    const content = json.choices[0].message.content

    const parsed = JSON.parse(content)
    res.json({ ...parsed })
  } catch (err) {
    res.status(400).json({
      error: 'Failed to parse or fetch GPT command',
      details: err.message,
    })
  }
})

export default router
