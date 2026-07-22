import React, { useState, useRef, useEffect } from 'react';
import { UserFinancialProfile, ChatMessage } from '../types';

interface CoachScreenProps {
  profile: UserFinancialProfile;
  initialMessages: ChatMessage[];
  onBackToHome: () => void;
}

export const CoachScreen: React.FC<CoachScreenProps> = ({ profile, initialMessages, onBackToHome }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Optimize monthly deposit",
    "Tax efficiency tips",
    "Risk profile update",
    "Market insights"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || isThinking) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
          context: {
            income: profile.monthlyIncome,
            netWorth: profile.netWorth,
            availableToSpend: profile.availableToSpend,
            monthlySpent: profile.monthlySpent,
          }
        }),
      });

      const data = await res.json();
      const modelReply = data.reply || "I'm analyzing your numbers to keep your financial ritual aligned.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'model',
        text: modelReply,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'model',
          text: "I am here with you, Julian. How can we further optimize your wealth goals today?"
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] pb-32">
      {/* Top Header */}
      <header className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-40 border-b border-[#e1e3e4]">
        <div className="flex justify-between items-center px-4 py-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToHome}
              className="p-1.5 rounded-full hover:bg-[#edeeef] text-[#191c1d] transition-colors"
              title="Go back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#beead1] flex items-center justify-center overflow-hidden border border-[#3f6653]/10 shadow-sm">
                <img 
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBREKVIg7bu-UfrVwOtz6Zdk5u49ucJJb7ljvl0N8H9ri6oX6Q4jQobJ8enCDZpd6eZry9iD-rQBApqjSbH7JWNn9S97gBMHFGtdfAI9-nBBbarfGkdA5oCvC8ConX9Q5LPZKtGryrx4J8ZHVWRwsT_0jIWZDX557M7I2mBZ_E-kzBXEB-D6BUee_hz2mpUDnqVbyybQJ7CEnqdLB5a8BxzgSULQYIe6IFqXDpFBKXe9VBxJGnlGvcEbQ"
                  alt="Wealth Coach"
                />
              </div>
              <div>
                <h1 className="font-bold text-sm text-[#000000]">Wealth Coach</h1>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3f6653] animate-pulse"></span>
                  <span className="text-[11px] font-medium text-[#44474d]">Online & Thinking</span>
                </div>
              </div>
            </div>
          </div>

          <button className="p-1.5 rounded-full hover:bg-[#edeeef] text-[#44474d]">
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>
      </header>

      {/* Main Chat Canvas */}
      <main className="flex-1 mt-16 px-4 pt-4 max-w-3xl mx-auto w-full flex flex-col gap-4">
        {/* Date Indicator */}
        <div className="flex flex-col items-center text-center my-2">
          <span className="text-[11px] font-semibold text-[#75777e] px-3 py-1 bg-[#edeeef] rounded-full mb-2">
            Today, Oct 24
          </span>
          <p className="text-xs text-[#44474d] max-w-xs leading-relaxed">
            Welcome back, Julian. Your financial ritual starts here. How can we grow your serenity today?
          </p>
        </div>

        {/* Message Loop */}
        {messages.map((msg) => {
          const isModel = msg.sender === 'model';
          return (
            <div 
              key={msg.id}
              className={`flex flex-col gap-2 max-w-[88%] ${isModel ? 'self-start' : 'self-end'}`}
            >
              <div 
                className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isModel 
                    ? 'bg-white text-[#191c1d] border border-[#e1e3e4] rounded-bl-xs' 
                    : 'bg-[#3f6653] text-white rounded-br-xs'
                }`}
              >
                {msg.text}
              </div>

              {/* Embedded Dividend Impact Card */}
              {msg.card?.type === 'dividend' && (
                <div className="bg-[#edeeef]/70 p-3.5 rounded-2xl border border-[#3f6653]/10 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs text-[#3f6653]">{msg.card.title}</h4>
                    <p className="text-[11px] text-[#44474d]">{msg.card.subtitle}</p>
                  </div>
                  <div className="w-14 h-8 bg-[#beead1] rounded-lg flex items-end justify-between p-1.5">
                    <div className="w-2 bg-[#3f6653] h-2 rounded-t-xs"></div>
                    <div className="w-2 bg-[#3f6653] h-4 rounded-t-xs"></div>
                    <div className="w-2 bg-[#3f6653] h-3 rounded-t-xs"></div>
                    <div className="w-2 bg-[#3f6653] h-6 rounded-t-xs"></div>
                  </div>
                </div>
              )}

              {/* Embedded Goal Progress Card */}
              {msg.card?.type === 'goal_progress' && (
                <div className="bg-white p-4 rounded-2xl border border-[#3f6653]/20 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xs text-[#000000]">{msg.card.title}</h3>
                      <p className="text-[11px] text-[#3f6653]">{msg.card.subtitle}</p>
                    </div>
                    <span className="bg-[#beead1] text-[#436b58] px-2 py-0.5 rounded-md font-bold text-[10px]">
                      Ahead
                    </span>
                  </div>

                  <div className="relative h-3 bg-[#edeeef] rounded-full overflow-hidden mb-2">
                    <div className="absolute h-full bg-gradient-to-r from-[#a5d0b9] to-[#3f6653] w-[62%] rounded-full"></div>
                  </div>

                  <div className="flex justify-between text-[10px] font-semibold text-[#44474d]">
                    <span>${msg.card.amount?.toLocaleString()} saved</span>
                    <span>{msg.card.achievedPercent}% achieved</span>
                  </div>

                  <div className="mt-3 p-2.5 bg-[#beead1]/30 rounded-xl flex items-start gap-2 text-[11px] text-[#274e3d]">
                    <span className="material-symbols-outlined text-[#3f6653] text-[16px]">lightbulb</span>
                    <span>A soft push: increasing your monthly deposit by $150 would close the gap earlier.</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-center gap-1.5 ml-2 opacity-70 my-1">
            <div className="w-2 h-2 bg-[#3f6653] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-[#3f6653] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[#3f6653] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}

        <div ref={chatEndRef} />
      </main>

      {/* Bottom Action / Input Area */}
      <footer className="fixed bottom-14 left-0 w-full bg-white/95 backdrop-blur-md pt-2 pb-2 z-40 border-t border-[#e1e3e4]">
        <div className="max-w-3xl mx-auto px-4 space-y-2">
          {/* Quick Questions Chips */}
          <div className="flex overflow-x-auto gap-2 no-scrollbar py-1">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3.5 py-1.5 bg-[#f8f9fa] border border-[#c5c6cd] rounded-full text-[11px] font-semibold text-[#191c1d] hover:border-[#3f6653] hover:bg-[#beead1]/20 active:scale-95 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 bg-[#edeeef] rounded-full px-3 py-1.5 border border-transparent focus-within:border-[#3f6653]/40 shadow-sm">
            <button className="text-[#44474d] hover:text-[#3f6653] p-1">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </button>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Speak your intentions..."
              className="flex-1 bg-transparent border-none focus:outline-none text-xs text-[#191c1d] placeholder-[#44474d]/60"
            />
            <button 
              onClick={() => handleSendMessage()}
              className="bg-[#3f6653] text-white w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-transform hover:bg-[#274e3d]"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
