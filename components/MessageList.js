
import { useState } from 'react';

export default function MessageList({ messages }) {
  if (!messages.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No messages yet. Be the first to send one!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {messages.map((message) => (
        <li 
          key={message._id} 
          className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in"
        >
          <p className="text-gray-800">{message.text}</p>
          <div className="mt-2 text-xs text-gray-500">
            {new Date(message.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
