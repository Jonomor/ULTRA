import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, X } from 'lucide-react';


<>
  <Mic size={20} />
  <X size={20} />
</>


const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

type RecognitionEvent = {
  results: SpeechRecognitionResultList;
};

export default function VoiceAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: RecognitionEvent) => {
      const spoken = event.results?.[0]?.[0]?.transcript || '';
      setTranscript(spoken);
      sendToCommand(spoken);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    setTranscript('');
    setResponse('');
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const sendToCommand = async (prompt: string) => {
    const res = await fetch('/api/assistant/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const json = await res.json();
    setResponse(json.speak || 'Command executed.');

    if (json.action === 'toggle_dispatch') {
      await fetch('/api/admin/dispatch', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: json.params?.enabled }),
      });
    }

    if (json.action === 'change_regime') {
      await fetch('/api/admin/regime', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: json.params?.mode }),
      });
    }

    if (json.action === 'switch_bot') {
      const bot = json.params?.bot;
      if (bot) {
        window.location.href = `/dashboard?bot=${bot}`;
      }
    }

    if (json.action === 'override_mode') {
      await fetch('/api/admin/override', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json.params),
      });
    }

    const synth = window.speechSynthesis;
    const speak = new SpeechSynthesisUtterance(json.speak || 'Command executed');
    speak.lang = 'en-US';
    synth.speak(speak);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50">
      {/* FAB Toggle */}
      <motion.button
  onClick={() => setIsOpen((prev) => !prev)}
  whileHover={{ scale: 1.1 }}
  initial={{ y: 10, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg relative"
>
  {isOpen ? <X size={20} /> : <Mic size={20} />}
  {!isOpen && (
    <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" />
  )}
</motion.button>




      {/* Animated Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="voice-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mt-4 w-72 bg-gray-900 text-white p-4 rounded-lg shadow-lg border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-2">🎧 Voice Assistant</h2>

            <button
              onClick={startListening}
              disabled={isListening}
              className={`w-full px-4 py-2 rounded text-sm ${
                isListening ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isListening ? '🎤 Listening...' : '🎙️ Start Voice Command'}
            </button>

            {transcript && (
              <p className="mt-2 text-sm text-gray-300">
                You said: <strong>{transcript}</strong>
              </p>
            )}

            {response && (
              <p className="mt-2 text-green-400 text-sm whitespace-pre-line">{response}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
