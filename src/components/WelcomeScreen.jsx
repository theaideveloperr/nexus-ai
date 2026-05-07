import { SUGGESTIONS } from '../data/prompts';
import { Zap } from 'lucide-react';

export default function WelcomeScreen({ onSend }) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 px-8"
      style={{ animation: 'fadeSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
    >
      {/* Orbs */}
      <div className="relative mb-10">
        <div
          style={{
            position: 'absolute',
            width: 180, height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,127,255,0.25) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            animation: 'orb-float 6s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 120, height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,168,0.18) 0%, transparent 70%)',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            animation: 'orb-float-2 8s ease-in-out infinite',
          }}
        />

        <div
          className="relative flex items-center justify-center rounded-2xl"
          style={{
            width: 68, height: 68,
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
            boxShadow: '0 0 50px rgba(139,127,255,0.45), 0 0 100px rgba(139,127,255,0.2)',
          }}
        >
          <Zap size={28} color="#fff" fill="#fff" />
        </div>
      </div>

      {/* Heading */}
      <h1
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 38,
          letterSpacing: '-1.5px',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: 12,
          lineHeight: 1.1,
        }}
      >
        What can I help you with?
      </h1>
      <p
        style={{
          fontSize: 15,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: 40,
          maxWidth: 480,
          lineHeight: 1.65,
          fontFamily: 'Instrument Serif, serif',
          fontStyle: 'italic',
        }}
      >
        I'm Nexus — a next-generation AI built for depth, speed, and genuine intelligence.
      </p>

      {/* Suggestion chips */}
      <div
        className="grid gap-3 w-full"
        style={{ maxWidth: 680, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSend(s.prompt)}
            className="flex items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-all"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              animation: `fadeSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--bg-hover)';
              e.currentTarget.style.borderColor = 'rgba(139,127,255,0.4)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(139,127,255,0.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-surface)';
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{s.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
