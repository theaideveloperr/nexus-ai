import { Zap } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="fade-up flex gap-3.5 mb-8 px-4">
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{
          width: 32, height: 32,
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
          boxShadow: '0 0 16px var(--accent-glow)',
          marginTop: 2,
        }}
      >
        <Zap size={14} color="#fff" fill="#fff" />
      </div>
      <div style={{ paddingTop: 6 }}>
        <div className="flex items-center gap-2 mb-3">
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--accent)' }}>Nexus</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>is thinking…</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
