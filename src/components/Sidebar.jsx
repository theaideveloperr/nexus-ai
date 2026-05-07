import { useState } from 'react';
import { Plus, MessageSquare, Trash2, Zap, Settings, ChevronRight } from 'lucide-react';

export default function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, onSettings }) {
  const [hoveredId, setHoveredId] = useState(null);

  const grouped = {
    today: conversations.filter(c => {
      const d = new Date(c.createdAt);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }),
    earlier: conversations.filter(c => {
      const d = new Date(c.createdAt);
      const now = new Date();
      return d.toDateString() !== now.toDateString();
    }),
  };

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        width: 260,
        minWidth: 260,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)',
            boxShadow: '0 0 20px var(--accent-glow)',
          }}
        >
          <Zap size={16} color="#fff" fill="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            NEXUS
          </div>
          <div style={{ fontSize: 9, color: 'var(--accent)', letterSpacing: '0.12em', fontWeight: 500, marginTop: -1 }}>
            AI PLATFORM
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all"
          style={{
            background: 'var(--accent-dim)',
            border: '1px solid rgba(139,127,255,0.25)',
            color: 'var(--accent)',
            fontSize: 13,
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,127,255,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-dim)'}
        >
          <Plus size={15} />
          New conversation
        </button>
      </div>

      {/* Conversations */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {grouped.today.length > 0 && (
          <>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.1em', padding: '8px 8px 4px' }}>
              TODAY
            </div>
            {grouped.today.map(c => (
              <ConvItem
                key={c.id}
                conv={c}
                active={c.id === activeId}
                hovered={hoveredId === c.id}
                onHover={setHoveredId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            ))}
          </>
        )}
        {grouped.earlier.length > 0 && (
          <>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.1em', padding: '12px 8px 4px' }}>
              EARLIER
            </div>
            {grouped.earlier.map(c => (
              <ConvItem
                key={c.id}
                conv={c}
                active={c.id === activeId}
                hovered={hoveredId === c.id}
                onHover={setHoveredId}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            ))}
          </>
        )}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '12px' }}>
        <button
          onClick={onSettings}
          className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 13,
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <Settings size={14} />
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>Settings</span>
        </button>

        <div className="flex items-center gap-3 px-3 pt-3">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 30, height: 30, background: 'linear-gradient(135deg, #7c6fff, #ff6ba8)', flexShrink: 0 }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'Syne' }}>U</span>
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Syne', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>User</div>
            <div style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>Free Plan</div>
          </div>
          <div
            className="px-2 py-0.5 rounded-full"
            style={{ background: 'var(--accent-dim)', border: '1px solid rgba(139,127,255,0.3)', fontSize: 9, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            FREE
          </div>
        </div>
      </div>
    </aside>
  );
}

function ConvItem({ conv, active, hovered, onHover, onSelect, onDelete }) {
  return (
    <div
      className="relative flex items-center gap-2 rounded-xl px-3 py-2.5 mb-0.5 cursor-pointer transition-all group"
      style={{
        background: active ? 'var(--bg-hover)' : hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: active ? '1px solid var(--border)' : '1px solid transparent',
      }}
      onMouseEnter={() => onHover(conv.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(conv.id)}
    >
      <MessageSquare size={13} style={{ color: active ? 'var(--accent)' : 'var(--text-tertiary)', flexShrink: 0 }} />
      <span
        className="flex-1 truncate"
        style={{ fontSize: 12.5, color: active ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: active ? 500 : 400 }}
      >
        {conv.title}
      </span>
      {hovered && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(conv.id); }}
          className="rounded-lg p-1 transition-all"
          style={{ background: 'rgba(255,100,100,0.1)', border: 'none', color: '#ff6b6b', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,100,100,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,100,100,0.1)'}
        >
          <Trash2 size={11} />
        </button>
      )}
    </div>
  );
}
