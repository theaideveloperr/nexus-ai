import { useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';
import ModelSelector from './ModelSelector';
import { RefreshCw } from 'lucide-react';

export default function ChatView({ conversation, isTyping, selectedModel, onModelChange, onSend, onNewChat }) {
  const bottomRef = useRef(null);
  const hasMessages = conversation?.messages?.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages, isTyping]);

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3.5 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
      >
        <div className="flex items-center gap-3">
          {hasMessages && (
            <div
              className="truncate max-w-sm"
              style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}
            >
              {conversation?.title}
            </div>
          )}
          {!hasMessages && (
            <div style={{ fontSize: 14, color: 'var(--text-tertiary)', fontFamily: 'Syne, sans-serif' }}>
              New conversation
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ModelSelector selected={selectedModel} onChange={onModelChange} />
          <button
            onClick={onNewChat}
            className="flex items-center justify-center rounded-xl transition-all"
            style={{
              width: 34, height: 34,
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
            title="New chat"
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(139,127,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto" style={{ background: 'var(--bg)' }}>
        {!hasMessages ? (
          <WelcomeScreen onSend={onSend} />
        ) : (
          <div className="max-w-3xl mx-auto py-8 w-full">
            {conversation.messages.map(msg => (
              <Message key={msg.id} message={msg} />
            ))}
            {isTyping && !conversation.messages.some(m => m.streaming) && (
              <TypingIndicator />
            )}
            <div ref={bottomRef} />
          </div>
        )}
        {hasMessages && <div ref={bottomRef} />}
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 px-6 py-5"
        style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={onSend} disabled={isTyping} />
          <div className="flex items-center justify-center mt-3">
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
              Nexus can make mistakes. Verify important information.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
