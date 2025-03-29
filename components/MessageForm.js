
import { useState, useContext } from 'react';
import { Send } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function MessageForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { darkMode } = useContext(ThemeContext);

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
        className="form-input flex-1"
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
