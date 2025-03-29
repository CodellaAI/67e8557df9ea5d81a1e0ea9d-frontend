
import { useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

export default function MessageList({ messages, onClearMessages }) {
  const { darkMode } = useContext(ThemeContext);
  const prevMessagesLengthRef = useRef(messages.length);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    prevMessagesLengthRef.current = messages.length;
  }, [messages.length]);
  
  useEffect(() => {
    // Scroll to the bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!messages.length) {
    return (
      <div className="text-center py-10">
        <div className="inline-block p-6 rounded-xl glass-effect">
          <p>No messages yet. Be the first to send one!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-4">
        <button 
          onClick={onClearMessages}
          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          Clear Messages
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        <ul className="space-y-4">
          {[...messages].reverse().map((message, index) => {
            // Only apply delay for initial loading, not for new messages
            const isNewMessage = index === messages.length - 1 && messages.length > prevMessagesLengthRef.current;
            
            return (
              <motion.li 
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: isNewMessage ? 0 : index * 0.1 
                }}
                className="message-card"
              >
                <p>{message.text}</p>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                  <span>{new Date(message.createdAt).toLocaleString()}</span>
                  <div className="h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-400"></div>
                </div>
              </motion.li>
            );
          })}
          <div ref={messagesEndRef} />
        </ul>
      </div>
    </div>
  );
}
