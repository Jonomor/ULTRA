import { useEffect, useRef, useState } from 'react'

// @ts-ignore - Fix missing global type for SpeechRecognition
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

type RecognitionEvent = {
  results: SpeechRecognitionResultList
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event: RecognitionEvent) => {
      const spoken = event.results?.[0]?.[0]?.transcript || ''
      setTranscript(spoken)
      sendToCommand(spoken)
    }

    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
  }, [])

  const startListening = () => {
    setTranscript('')
    setResponse('')
    setIsListening(true)
    recognitionRef.current?.start()
  }

  const sendToCommand = async (prompt: string) => {
    const res = await fetch('/api/assistant/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    const json = await res.json()
    setResponse(json.speak || 'Command executed.')

    // 🔁 Hook into backend logic
    if (json.action === 'toggle_dispatch') {
      await fetch('/api/admin/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ enabled: json.params?.enabled }),
      })
    }

    if (json.action === 'change_regime') {
      await fetch('/api/admin/regime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ mode: json.params?.mode }),
      })
    }

    if (json.action === 'override_mode') {
      await fetch('/api/admin/override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(json.params),
      })
    }

    if (json.action === 'switch_bot') {
      const bot = json.params?.bot
      if (bot) {
        window.location.href = `/dashboard?bot=${bot}`
      }
    }

    // 🔊 Speak response
    const synth = window.speechSynthesis
    const speak = new SpeechSynthesisUtterance(json.speak || 'Command executed')
    speak.lang = 'en-US'
    synth.speak(speak)
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 text-white space-y-4">
      <h2 className="text-xl font-bold text-purple-400">🎙️ Voice Assistant</h2>

      <button
        onClick={startListening}
        disabled={isListening}
        className={`px-4 py-2 rounded text-white ${
          isListening ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isListening ? '🎤 Listening...' : '🎙️ Start Voice Command'}
      </button>

      {transcript && (
        <p className="text-sm text-gray-300">
          You said: <strong>{transcript}</strong>
        </p>
      )}

      {response && (
        <p className="text-green-400 text-sm whitespace-pre-line">{response}</p>
      )}
    </div>
  )
}
