
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, MessageSquare, Loader2 } from 'lucide-react';
import { Transition } from '@headlessui/react';
import MessageForm from '@/components/MessageForm';
import MessageList from '@/components/MessageList';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (text) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/messages`, { text });
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simple Connect App</h1>
        <p className="text-gray-600">Connect your frontend and backend with ease</p>
      </header>

      <div className="flex-1 flex flex-col shadow-lg rounded-xl bg-white overflow-hidden">
        <div className="p-4 bg-primary-600 text-white flex items-center">
          <MessageSquare className="mr-2" size={20} />
          <h2 className="font-semibold">Messages</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-primary-500" size={30} />
            </div>
          ) : (
            <Transition
              show={!loading}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <MessageList messages={messages} />
            </Transition>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <MessageForm onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
}
