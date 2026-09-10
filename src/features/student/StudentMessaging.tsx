import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { MessageSquare, Send, Paperclip, CheckCheck, Building2, ShieldCheck } from 'lucide-react';
import { useMessaging } from '../../context/MessagingContext';

export const StudentMessaging: React.FC = () => {
  const { conversations, messages, sendMessage, markAsRead } = useMessaging();

  const [activeConvId, setActiveConvId] = useState<string>(() => {
    return conversations[0]?.id || 'conv-1';
  });

  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  useEffect(() => {
    if (activeConvId) {
      markAsRead(activeConvId, 'student');
    }
  }, [activeConvId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() || attachedFile) {
      sendMessage(
        activeConvId,
        inputText.trim(),
        'student',
        attachedFile ? attachedFile.name : undefined
      );

      setInputText('');
      setAttachedFile(null);
    }
  };

  const currentConv = conversations.find((c) => c.id === activeConvId);
  const currentMessages = messages[activeConvId] || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 md:grid-cols-3 min-h-[540px] overflow-hidden">
      {/* Conversations List Sidebar */}
      <div className="border-r border-slate-200 dark:border-slate-800 p-4 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-burgundy-700" />
            <span>Mesajlaşma & Görüşmeler</span>
          </div>
        </h3>

        <div className="space-y-2">
          {conversations.map((conv) => {
            const isSelected = activeConvId === conv.id;
            const hasUnread = conv.unreadCountStudent > 0;

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`p-3 rounded-xl cursor-pointer transition-colors border space-y-1 ${
                  isSelected
                    ? 'bg-burgundy-50/70 dark:bg-burgundy-950/40 border-burgundy-200 dark:border-burgundy-900'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-transparent hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs">
                  <span className="text-slate-900 dark:text-white truncate">{conv.contactName}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-normal">{conv.lastTimestamp}</span>
                    {hasUnread && (
                      <span className="w-2 h-2 rounded-full bg-burgundy-700 animate-pulse" />
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">{conv.lastMessage}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Active Window */}
      <div className="md:col-span-2 flex flex-col justify-between p-4 bg-slate-50/50 dark:bg-slate-950/30">
        {/* Chat Top Header Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-burgundy-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {currentConv?.jobTitle.includes('Kariyer') ? <ShieldCheck className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white block">{currentConv?.contactName}</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                ● Çevrimiçi
              </span>
            </div>
          </div>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[360px] px-1">
          {currentMessages.map((msg) => {
            const isStudent = msg.sender === 'student';

            return (
              <div
                key={msg.id}
                className={`flex ${isStudent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1.5 ${
                    isStudent
                      ? 'bg-burgundy-700 text-white rounded-br-none shadow-2xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700 shadow-2xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {msg.attachmentName && (
                    <div className="p-2 bg-black/10 rounded-lg text-[11px] font-mono flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{msg.attachmentName}</span>
                    </div>
                  )}

                  <div className={`flex items-center justify-end gap-1 text-[9px] ${isStudent ? 'text-burgundy-200' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {isStudent && <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Form Bar */}
        <form onSubmit={handleSendMessage} className="space-y-2 pt-2">
          {attachedFile && (
            <div className="p-2 bg-white dark:bg-slate-900 border rounded-lg text-xs flex items-center justify-between shadow-2xs">
              <span className="text-slate-600 dark:text-slate-300 text-[11px]">Eklendi: <strong>{attachedFile.name}</strong></span>
              <button type="button" onClick={() => setAttachedFile(null)} className="text-red-600 text-xs font-bold hover:underline">Kaldır</button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-burgundy-700 cursor-pointer transition-colors shadow-2xs">
              <Paperclip className="w-4 h-4" />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachedFile(e.target.files ? e.target.files[0] : null)}
              />
            </label>

            <Input
              placeholder="Mesajınızı yazınız..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1"
            />

            <Button type="submit" variant="primary" size="md" leftIcon={<Send className="w-4 h-4" />}>
              Gönder
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
