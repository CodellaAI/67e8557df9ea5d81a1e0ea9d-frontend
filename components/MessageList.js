
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MessageList({ messages, darkMode }) {
  if (!messages.length) {
    return (
      <div className="text-center py-10">
        <div className={`inline-block p-6 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-white/50'} shadow-lg`}>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>No messages yet. Be the first to send one!</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {messages.map((message, index) => (
        <motion.li 
          key={message._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`message-card ${darkMode ? 'bg-gray-700/70 text-white' : 'bg-white/80'}`}
        >
          <p className={darkMode ? 'text-gray-100' : 'text-gray-800'}>{message.text}</p>
          <div className={`mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex justify-between items-center`}>
            <span>{new Date(message.createdAt).toLocaleString()}</span>
            <div className={`h-2 w-2 rounded-full ${darkMode ? 'bg-primary-400' : 'bg-primary-500'}`}></div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
