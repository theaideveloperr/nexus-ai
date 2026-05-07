import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Globe, Mic } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [value]);

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: 'var(--bg-raised)',
        border: `1px solid ${value ? 'rgba(139,127,255,0.4)' : 'var(--border)'}`,
        boxShadow: value ? '0 0 30px rgba(139,127,255,0.08)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKey}
        placeholder="Message Nexus…"
        disabled={disabled}
        rows={1}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          resize: 'none',
          color: 'var(--text-primary)',
          fontSize: 14,
          lineHeight: 1.65,
          padding: '16px 18px 8px',
          fontFamily: 'DM Mono, monospace',
          minHeight: 52,
          maxHeight: 200,
          overflow: 'auto',
        }}
      />

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1">
        <div className="flex items-center gap-1">
          <ToolBtn icon={<Paperclip size={14} />} title="Attach file" />
          <ToolBtn icon={<Globe size={14} />} title="Web search" />
          <ToolBtn icon={<Mic size={14} />} title="Voice input" />
        </div>

        <div className="flex items-center gap-3">
          {value.length > 0 && (
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
              ↵ send · ⇧↵ newline
            </span>
          )}
          <button
            onClick={submit}
            disabled={!canSend}
            className="flex items-center justify-center rounded-xl transition-all"
            style={{
              width: 36, height: 36,
              background: canSend ? 'var(--accent)' : 'var(--bg-hover)',
              border: 'none',
              color: canSend ? '#fff' : 'var(--text-tertiary)',
              cursor: canSend ? 'pointer' : 'default',
              boxShadow: canSend ? '0 0 20px var(--accent-glow)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ToolBtn({ icon, title }) {
  return (
    <button
      title={title}
      className="flex items-center justify-center rounded-xl transition-all"
      style={{
        width: 32, height: 32,
        background: 'transparent',
        border: 'none',
        color: 'var(--text-tertiary)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
    >
      {icon}
    </button>
  );
}
