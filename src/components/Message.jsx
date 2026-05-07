import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy, Check, Zap } from 'lucide-react';
import { useState } from 'react';

const codeTheme = {
  'code[class*="language-"]': { color: '#c0caf5', background: 'none', fontFamily: 'DM Mono, monospace', fontSize: '13px', lineHeight: '1.6' },
  'pre[class*="language-"]': { color: '#c0caf5', background: 'none', fontFamily: 'DM Mono, monospace', padding: '0', margin: '0' },
  comment: { color: '#565f89', fontStyle: 'italic' },
  prolog: { color: '#565f89' },
  doctype: { color: '#565f89' },
  cdata: { color: '#565f89' },
  punctuation: { color: '#c0caf5' },
  property: { color: '#7dcfff' },
  tag: { color: '#f7768e' },
  constant: { color: '#ff9e64' },
  symbol: { color: '#ff9e64' },
  deleted: { color: '#f7768e' },
  number: { color: '#ff9e64' },
  boolean: { color: '#ff9e64' },
  selector: { color: '#9ece6a' },
  'attr-name': { color: '#7dcfff' },
  string: { color: '#9ece6a' },
  char: { color: '#9ece6a' },
  builtin: { color: '#7dcfff' },
  inserted: { color: '#9ece6a' },
  operator: { color: '#89ddff' },
  entity: { color: '#89ddff', cursor: 'help' },
  url: { color: '#89ddff' },
  variable: { color: '#c0caf5' },
  atrule: { color: '#bb9af7' },
  'attr-value': { color: '#9ece6a' },
  function: { color: '#7aa2f7' },
  'class-name': { color: '#e0af68' },
  keyword: { color: '#bb9af7' },
  regex: { color: '#89ddff' },
  important: { color: '#ff9e64', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
};

function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl overflow-hidden my-3"
      style={{ background: '#0d0d18', border: '1px solid var(--border)' }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}
      >
        <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {language || 'code'}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-all"
          style={{
            background: copied ? 'rgba(0,229,176,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${copied ? 'rgba(0,229,176,0.3)' : 'var(--border)'}`,
            color: copied ? 'var(--accent-3)' : 'var(--text-secondary)',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <SyntaxHighlighter
          language={language || 'text'}
          style={codeTheme}
          PreTag="div"
          customStyle={{ margin: 0, padding: 0, background: 'none' }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function MarkdownContent({ content, streaming }) {
  const displayContent = streaming ? content + '▌' : content;

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            if (!inline && match) {
              return (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, '')}
                />
              );
            }
            return <code className={className} {...props}>{children}</code>;
          },
          pre({ children }) {
            return <>{children}</>;
          },
        }}
      >
        {displayContent}
      </ReactMarkdown>
    </div>
  );
}

export default function Message({ message }) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="msg-appear flex justify-end mb-6 px-4">
        <div
          className="max-w-2xl rounded-2xl px-5 py-3.5"
          style={{
            background: 'var(--user-bubble)',
            border: '1px solid var(--user-border)',
            color: 'var(--text-primary)',
            fontSize: 14,
            lineHeight: 1.65,
            backdropFilter: 'blur(12px)',
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="msg-appear flex gap-3.5 mb-8 px-4">
      {/* Avatar */}
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

      {/* Content */}
      <div className="flex-1 min-w-0" style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.7 }}>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--accent)' }}>Nexus</span>
        </div>
        <MarkdownContent content={message.content} streaming={message.streaming} />
      </div>
    </div>
  );
}
