import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import SettingsPanel from './components/SettingsPanel';
import { useChat } from './hooks/useChat';

export default function App() {
  const {
    conversations,
    activeConv,
    activeId,
    setActiveId,
    isTyping,
    selectedModel,
    setSelectedModel,
    newConversation,
    deleteConversation,
    sendMessage,
  } = useChat();

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex h-full" style={{ background: 'var(--bg)' }}>
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={newConversation}
        onDelete={deleteConversation}
        onSettings={() => setShowSettings(true)}
      />
      <ChatView
        conversation={activeConv}
        isTyping={isTyping}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        onSend={sendMessage}
        onNewChat={newConversation}
      />
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
