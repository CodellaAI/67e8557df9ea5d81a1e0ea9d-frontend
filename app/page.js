
'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Send, MessageSquare, Loader2 } from 'lucide-react';
import { Transition } from '@headlessui/react';
import MessageForm from '@/components/MessageForm';
import MessageList from '@/components/MessageList';
import { ThemeContext } from '../context/ThemeContext';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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
      <header className="mb-10 text-center relative">
        <div className="absolute -top-2 right-0">
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/80 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800/80"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 text-transparent bg-clip-text mb-3">
          Simple Connect App
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">Connect your frontend and backend with a modern, floating interface</p>
      </header>

      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden glass-effect floating-card">
        <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="mr-2" size={20} />
            <h2 className="font-semibold">Messages</h2>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-white/50 dark:bg-gray-800/50">
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
        
        <div className="p-5 border-t border-gray-200/50 dark:border-gray-700">
          <MessageForm onSubmit={handleSubmit} />
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Modern UI implementation • {new Date().getFullYear()}</p>
      </div>
    </main>
  );
}
