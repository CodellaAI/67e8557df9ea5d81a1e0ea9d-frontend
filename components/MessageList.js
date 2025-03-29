
import { useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

export default function MessageList({ messages }) {
  const { darkMode } = useContext(ThemeContext);
  const prevMessagesLengthRef = useRef(messages.length);
  
  useEffect(() => {
    prevMessagesLengthRef.current = messages.length;
  }, [messages.length]);
  
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
    <ul className="space-y-4">
      {messages.map((message, index) => {
        // Only apply delay for initial loading, not for new messages
        const isNewMessage = index === 0 && messages.length > prevMessagesLengthRef.current;
        
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
    </ul>
  );
}
