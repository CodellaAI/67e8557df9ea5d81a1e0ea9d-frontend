
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function MessageForm({ onSubmit, darkMode }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(message);
      setMessage('');
    } catch (error) {
      console.error('Error in form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className={`form-input flex-1 ${darkMode ? 'bg-gray-700/50 text-white placeholder-gray-400' : ''}`}
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className={`btn btn-primary w-12 h-12 flex items-center justify-center p-0 ${!message.trim() ? 'opacity-70' : ''}`}
        disabled={isSubmitting || !message.trim()}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Send size={18} />
        )}
      </button>
    </form>
  );
}
