import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCheck,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useMessaging } from '../../context/MessagingContext';

export interface EmployerMessagingProps {
  onNavigateToAtsCandidate?: (candidateEmail: string) => void;
}

export const EmployerMessaging: React.FC<EmployerMessagingProps> = ({
  onNavigateToAtsCandidate,
}) => {
  const { conversations, messages, sendMessage, markAsRead } = useMessaging();

  const [activeConvId, setActiveConvId] = useState<string>(() => {
    return conversations[0]?.id || 'conv-1';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  useEffect(() => {
    if (activeConvId) {
      markAsRead(activeConvId, 'employer');
    }
  }, [activeConvId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() || attachedFile) {
      sendMessage(
        activeConvId,
        inputText.trim(),
        'employer',
        attachedFile ? attachedFile.name : undefined
      );

      setInputText('');
      setAttachedFile(null);
    }
  };

  const filteredConversations = conversations.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      c.candidateName.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.jobTitle.toLowerCase().includes(q)
    );
  });

  const currentConv = conversations.find((c) => c.id === activeConvId);
  const currentMessages = messages[activeConvId] || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 md:grid-cols-3 min-h-[580px] overflow-hidden">
      {/* Candidates Conversation Sidebar */}
      <div className="border-r border-slate-200 dark:border-slate-800 p-4 space-y-4 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-burgundy-700" />
            <span>Aday Mesajlaşma & Görüşmeler</span>
          </h3>
        </div>

        {/* Search Candidates */}
        <Input
          leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          placeholder="Aday adı veya bölüm ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Conversation Items List */}
        <div className="flex-1 space-y-2 overflow-y-auto max-h-[440px] pr-1">
          {filteredConversations.map((conv) => {
            const isSelected = activeConvId === conv.id;
            const hasUnread = conv.unreadCountEmployer > 0;

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-colors border space-y-1.5 ${
                  isSelected
                    ? 'bg-burgundy-50/80 dark:bg-burgundy-950/40 border-burgundy-300 dark:border-burgundy-800 shadow-2xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-transparent hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-burgundy-700/10 text-burgundy-700 font-extrabold flex items-center justify-center text-xs border border-burgundy-200 shrink-0">
                      {conv.candidateName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white block truncate max-w-[140px]">
                        {conv.candidateName}
                      </span>
                      <span className="text-[10px] font-bold text-burgundy-700 dark:text-burgundy-400 block truncate max-w-[140px]">
                        {conv.department}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-slate-400 font-medium">{conv.lastTimestamp}</span>
                    {hasUnread && (
                      <span className="px-1.5 py-0.5 rounded-full bg-burgundy-700 text-white font-extrabold text-[9px] animate-pulse">
                        Yeni
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 font-medium line-clamp-1 pl-0.5">
                  {conv.lastMessage}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Active Chat Area */}
      <div className="md:col-span-2 flex flex-col justify-between p-4 bg-slate-50/50 dark:bg-slate-950/30">
        {/* Chat Active Header */}
        {currentConv && (
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-burgundy-700 text-white font-black flex items-center justify-center text-sm shadow-md">
                {currentConv.candidateName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{currentConv.candidateName}</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Çevrimiçi
                  </span>
                </h4>
                <span className="text-xs font-semibold text-burgundy-700 dark:text-burgundy-400 block">
                  {currentConv.jobTitle} • {currentConv.department}
                </span>
              </div>
            </div>

            {onNavigateToAtsCandidate && !currentConv.id.includes('conv-4') && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onNavigateToAtsCandidate(currentConv.candidateEmail)}
                leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                className="text-xs font-bold"
              >
                ATS Paneline Git
              </Button>
            )}
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[380px] px-1">
          {currentMessages.map((msg) => {
            const isEmployer = msg.sender === 'employer';

            return (
              <div
                key={msg.id}
                className={`flex ${isEmployer ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1.5 ${
                    isEmployer
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

                  <div className={`flex items-center justify-end gap-1 text-[9px] ${isEmployer ? 'text-burgundy-200' : 'text-slate-400'}`}>
                    <span>{msg.timestamp}</span>
                    {isEmployer && <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Send Input Bar */}
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
              placeholder="Adaya mesaj yazınız..."
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
