import { useState } from 'react';
import { ChevronDown, Check, Zap } from 'lucide-react';
import { MODELS } from '../data/prompts';

export default function ModelSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  const badgeColors = {
    ULTRA: { bg: 'rgba(139,127,255,0.15)', color: 'var(--accent)', border: 'rgba(139,127,255,0.3)' },
    PRO: { bg: 'rgba(255,107,168,0.12)', color: 'var(--accent-2)', border: 'rgba(255,107,168,0.3)' },
    FAST: { bg: 'rgba(0,229,176,0.1)', color: 'var(--accent-3)', border: 'rgba(0,229,176,0.25)' },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-all"
        style={{
          background: 'var(--bg-raised)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          fontSize: 12,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,127,255,0.4)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
      >
        <Zap size={11} style={{ color: 'var(--accent)' }} />
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 12 }}>{selected.label}</span>
        <span
          className="px-1.5 py-0.5 rounded-md"
          style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
            background: badgeColors[selected.badge]?.bg,
            color: badgeColors[selected.badge]?.color,
            border: `1px solid ${badgeColors[selected.badge]?.border}`,
          }}
        >
          {selected.badge}
        </span>
        <ChevronDown size={11} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            width: 240,
            zIndex: 100,
            animation: 'appear 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          {MODELS.map(m => (
            <button
              key={m.id}
              onClick={() => { onChange(m); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 transition-all"
              style={{
                background: selected.id === m.id ? 'var(--bg-hover)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = selected.id === m.id ? 'var(--bg-hover)' : 'transparent'}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{m.label}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-md"
                    style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                      background: badgeColors[m.badge]?.bg,
                      color: badgeColors[m.badge]?.color,
                      border: `1px solid ${badgeColors[m.badge]?.border}`,
                    }}
                  >
                    {m.badge}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{m.desc}</div>
              </div>
              {selected.id === m.id && <Check size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
            </button>
          ))}
        </div>
      )}

      {open && <div className="fixed inset-0 z-50" onClick={() => setOpen(false)} style={{ zIndex: 99 }} />}
    </div>
  );
}
