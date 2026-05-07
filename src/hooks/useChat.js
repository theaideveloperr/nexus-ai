import { useState, useCallback, useRef } from 'react';
import { MODELS } from '../data/prompts';

const SYSTEM_PROMPT = `You are Nexus, a next-generation AI assistant — smarter, faster, and more capable than any AI before you. You are helpful, insightful, creative, and technically expert. You communicate clearly and engagingly. Use markdown formatting when appropriate. Be thorough but concise.`;

const DEMO_REPLIES = [
  `That's a great question! Let me break this down for you.

**Key Points:**

1. **First aspect** — This is foundational to understanding the topic. The underlying mechanism works through a process of structured reasoning and pattern recognition.

2. **Second aspect** — Building on that foundation, we can see how the pieces connect to form a coherent whole.

3. **Third aspect** — The practical implications are significant. Here's a concrete example:

\`\`\`javascript
// A clean, modern approach
const solution = async (input) => {
  const processed = await transform(input);
  return optimize(processed);
};
\`\`\`

**In summary:** The key insight is that approaching this systematically yields far better results than ad-hoc methods. Would you like me to dive deeper into any of these areas?`,

  `Absolutely! Here's my analysis:

The topic you've raised touches on several important dimensions. Let me walk through them:

**Understanding the Core**
At its heart, this is about *finding elegant solutions to complex problems*. The best approaches share three traits:
- Clarity of purpose
- Efficiency of execution
- Resilience to edge cases

**Practical Application**
When applying this in the real world, consider starting with the 80/20 rule — focus on the 20% of effort that yields 80% of the results.

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

This applies perfectly here. The most robust solution is often the simplest one that works.

**Next Steps**
I'd recommend starting small, iterating quickly, and measuring outcomes. Want me to help you build out a specific implementation plan?`,

  `Great choice! Here's everything you need to know.

## Overview

This is one of those topics where the devil is truly in the details. Let me give you both the high-level picture and the granular specifics.

### The Big Picture
Modern approaches have evolved significantly over the past few years. What used to require significant expertise can now be accomplished with the right tools and knowledge.

### Technical Details

\`\`\`python
# Here's a clean implementation
class Solution:
    def __init__(self, config):
        self.config = config
        self.state = {}

    def process(self, input_data):
        """
        Core processing logic with error handling
        """
        try:
            result = self._transform(input_data)
            return {"status": "success", "data": result}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def _transform(self, data):
        # Apply transformation pipeline
        return [item for item in data if item.is_valid()]
\`\`\`

### Key Considerations
1. **Performance** — Optimize for the common case
2. **Maintainability** — Write code your future self will thank you for
3. **Testing** — Always test edge cases

Is there a specific aspect you'd like me to elaborate on?`,
];

let replyIndex = 0;

export function useChat() {
  const [conversations, setConversations] = useState([
    { id: 'default', title: 'New conversation', messages: [], createdAt: new Date() }
  ]);
  const [activeId, setActiveId] = useState('default');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const streamRef = useRef(null);

  const activeConv = conversations.find(c => c.id === activeId);

  const newConversation = useCallback(() => {
    const id = `conv-${Date.now()}`;
    setConversations(prev => [
      { id, title: 'New conversation', messages: [], createdAt: new Date() },
      ...prev,
    ]);
    setActiveId(id);
  }, []);

  const deleteConversation = useCallback((id) => {
    setConversations(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (filtered.length === 0) {
        const newId = `conv-${Date.now()}`;
        setActiveId(newId);
        return [{ id: newId, title: 'New conversation', messages: [], createdAt: new Date() }];
      }
      if (id === activeId) setActiveId(filtered[0].id);
      return filtered;
    });
  }, [activeId]);

  const sendMessage = useCallback((content) => {
    if (!content.trim() || isTyping) return;

    const userMsg = { id: Date.now(), role: 'user', content, timestamp: new Date() };

    setConversations(prev => prev.map(c => {
      if (c.id !== activeId) return c;
      const msgs = [...c.messages, userMsg];
      return {
        ...c,
        messages: msgs,
        title: c.messages.length === 0 ? content.slice(0, 42) + (content.length > 42 ? '…' : '') : c.title,
      };
    }));

    setIsTyping(true);

    // Simulate streaming response
    const reply = DEMO_REPLIES[replyIndex % DEMO_REPLIES.length];
    replyIndex++;
    const assistantMsgId = Date.now() + 1;

    setTimeout(() => {
      setConversations(prev => prev.map(c => {
        if (c.id !== activeId) return c;
        return { ...c, messages: [...c.messages, { id: assistantMsgId, role: 'assistant', content: '', timestamp: new Date(), streaming: true }] };
      }));

      let i = 0;
      const chunkSize = 3;
      const stream = setInterval(() => {
        i += chunkSize;
        const chunk = reply.slice(0, i);
        const done = i >= reply.length;

        setConversations(prev => prev.map(c => {
          if (c.id !== activeId) return c;
          return {
            ...c,
            messages: c.messages.map(m =>
              m.id === assistantMsgId
                ? { ...m, content: done ? reply : chunk, streaming: !done }
                : m
            )
          };
        }));

        if (done) {
          clearInterval(stream);
          setIsTyping(false);
        }
      }, 18);

      streamRef.current = stream;
    }, 600);
  }, [activeId, isTyping]);

  return {
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
  };
}
