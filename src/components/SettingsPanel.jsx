import { X, Moon, Globe, Volume2, Shield, Cpu, Palette } from 'lucide-react';
import { useState } from 'react';

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative rounded-full transition-all flex-shrink-0"
      style={{
        width: 40, height: 22,
        background: value ? 'var(--accent)' : 'var(--bg-hover)',
        border: `1px solid ${value ? 'var(--accent)' : 'var(--border)'}`,
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: value ? '0 0 12px var(--accent-glow)' : 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 16, height: 16,
          background: '#fff',
          borderRadius: '50%',
          top: 2,
          left: value ? 20 : 2,
          transition: 'left 0.2s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </button>
  );
}

function SettingRow({ icon, label, desc, children }) {
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3.5"
      style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', marginBottom: 8 }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 32, height: 32, background: 'var(--bg-hover)', color: 'var(--accent)' }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>{label}</div>
          {desc && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 1 }}>{desc}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPanel({ onClose }) {
  const [settings, setSettings] = useState({
    darkMode: true,
    webSearch: true,
    voiceInput: false,
    safeMode: true,
    streaming: true,
  });

  const set = (key) => (val) => setSettings(s => ({ ...s, [key]: val }));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          width: 480,
          maxWidth: '95vw',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
          animation: 'appear 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              Settings
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>Customize your Nexus experience</div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-xl transition-all"
            style={{ width: 34, height: 34, background: 'var(--bg-hover)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 12 }}>PREFERENCES</div>
          <SettingRow icon={<Moon size={14} />} label="Dark Mode" desc="Always on — it's better this way">
            <Toggle value={settings.darkMode} onChange={set('darkMode')} />
          </SettingRow>
          <SettingRow icon={<Globe size={14} />} label="Web Search" desc="Enable real-time web browsing">
            <Toggle value={settings.webSearch} onChange={set('webSearch')} />
          </SettingRow>
          <SettingRow icon={<Volume2 size={14} />} label="Voice Input" desc="Speak your messages">
            <Toggle value={settings.voiceInput} onChange={set('voiceInput')} />
          </SettingRow>

          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', letterSpacing: '0.1em', fontWeight: 600, margin: '16px 0 12px' }}>ADVANCED</div>
          <SettingRow icon={<Shield size={14} />} label="Safe Mode" desc="Filter harmful content">
            <Toggle value={settings.safeMode} onChange={set('safeMode')} />
          </SettingRow>
          <SettingRow icon={<Cpu size={14} />} label="Streaming" desc="Show responses as they generate">
            <Toggle value={settings.streaming} onChange={set('streaming')} />
          </SettingRow>

          <div style={{ marginTop: 20 }}>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl transition-all"
              style={{
                background: 'var(--accent)',
                border: 'none',
                color: '#fff',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 0 30px var(--accent-glow)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
