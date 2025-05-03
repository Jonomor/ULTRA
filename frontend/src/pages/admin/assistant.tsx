// src/pages/admin/assistant.tsx
import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminRouteGuard from "../../components/AdminRouteGuard";
import React from "react";

export default function AdminAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setLoading(true);
    setInput('');

    const API = import.meta.env.VITE_API_URL;

const eventSource = new EventSource(`${API}/assistant?q=${encodeURIComponent(input)}`);


    let assistantReply = '';

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);
        setLoading(false);
        eventSource.close();
        return;
      }
      assistantReply += event.data;
      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (lastIndex >= 0 && updated[lastIndex]?.role === 'assistant') {
          updated[lastIndex].content = assistantReply;
        } else {
          updated.push({ role: 'assistant', content: assistantReply });
        }
        return updated;
      });
    };

    eventSource.onerror = (err) => {
      console.error('Streaming error', err);
      setLoading(false);
      eventSource.close();
    };
  };

  return (
    <AdminRouteGuard>
      <div className="flex flex-col lg:flex-row">
        <AdminSidebar />
        <div className="flex-1 p-6">
          <div className="bg-zinc-900 p-6 rounded-xl shadow-lg h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-4 text-pink-400 flex items-center gap-2">
              🧠 ULTRA Assistant
            </h1>
            <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-zinc-800 rounded mb-6">
              {messages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded ${msg.role === 'user' ? 'bg-blue-700 text-white self-end' : 'bg-gray-700 text-green-300 self-start'}`}>
                  {msg.content}
                </div>
              ))}
              {loading && <div className="text-center text-purple-300">Assistant typing...</div>}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask about trading signals, bots, strategies..."
                className="flex-1 px-4 py-2 rounded bg-black text-white border border-zinc-700"
              />
              <button
                onClick={sendMessage}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
