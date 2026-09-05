import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { MessageSquare, Send, Paperclip, CheckCheck, Building2, ShieldCheck } from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'student' | 'other';
  text: string;
  timestamp: string;
  attachmentName?: string;
  isRead?: boolean;
}

export interface ConversationItem {
  id: string;
  contactName: string;
  contactRole: 'Employer' | 'CareerCenter';
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

export const StudentMessaging: React.FC = () => {
  const [conversations] = useState<ConversationItem[]>([
    {
      id: 'conv-1',
      contactName: 'ASELSAN Konya İK (Mehmet Yılmaz)',
      contactRole: 'Employer',
      lastMessage: 'Mülakat öncesi C++ projenizin GitHub linkini iletir misiniz?',
      lastTimestamp: '14:20',
      unreadCount: 1,
    },
    {
      id: 'conv-2',
      contactName: 'KTÜN Kariyer Merkezi Uzmanı',
      contactRole: 'CareerCenter',
      lastMessage: 'TÜBİTAK projeniz için staj muafiyet onayınız verilmiştir.',
      lastTimestamp: 'Dün',
      unreadCount: 0,
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv-1');

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'conv-1': [
      { id: 'm1', sender: 'other', text: 'Merhaba Emre Bey, ASELSAN Konya aday mühendislik başvurunuz inceleme aşamasındadır.', timestamp: '14:15', isRead: true },
      { id: 'm2', sender: 'student', text: 'Merhaba Mehmet Bey, ilginiz için teşekkür ederim. Detaylı sorularınız olursa memnuniyetle yanıtlarım.', timestamp: '14:18', isRead: true },
      { id: 'm3', sender: 'other', text: 'Mülakat öncesi C++ projenizin GitHub linkini iletir misiniz?', timestamp: '14:20', isRead: false },
    ],
    'conv-2': [
      { id: 'm4', sender: 'other', text: 'TÜBİTAK projeniz için staj muafiyet onayınız verilmiştir.', timestamp: 'Dün', isRead: true },
    ],
  });

  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() || attachedFile) {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'student',
        text: inputText,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        attachmentName: attachedFile ? attachedFile.name : undefined,
        isRead: true,
      };

      setMessages({
        ...messages,
        [activeConvId]: [...(messages[activeConvId] || []), newMsg],
      });

      setInputText('');
      setAttachedFile(null);
    }
  };

  const currentConv = conversations.find((c) => c.id === activeConvId);
  const currentMessages = messages[activeConvId] || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 md:grid-cols-3 min-h-[520px] overflow-hidden">
      <div className="border-r border-slate-200 dark:border-slate-800 p-4 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <MessageSquare className="w-4 h-4 text-burgundy-700" />
          <span>Mesajlaşma & Görüşmeler</span>
        </h3>

        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`p-3 rounded-xl cursor-pointer transition-colors border space-y-1 ${
                activeConvId === conv.id
                  ? 'bg-burgundy-50/70 dark:bg-burgundy-950/40 border-burgundy-200 dark:border-burgundy-900'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-transparent hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-xs">
                <span className="text-slate-900 dark:text-white truncate">{conv.contactName}</span>
                <span className="text-[10px] text-slate-400">{conv.lastTimestamp}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{conv.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col justify-between p-4 bg-slate-50/50 dark:bg-slate-950/30">
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center text-xs">
              {currentConv?.contactRole === 'Employer' ? <Building2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white block">{currentConv?.contactName}</span>
              <span className="text-[10px] text-emerald-600 font-bold">● Çevrimiçi</span>
            </div>
          </div>
        </div>

        <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-80 px-1">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-3 rounded-2xl text-xs space-y-1 ${
                  msg.sender === 'student'
                    ? 'bg-burgundy-700 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>

                {msg.attachmentName && (
                  <div className="p-2 bg-black/10 rounded-lg text-[11px] font-mono flex items-center gap-1.5">
                    <Paperclip className="w-3 h-3" />
                    <span>{msg.attachmentName}</span>
                  </div>
                )}

                <div className={`flex items-center justify-end gap-1 text-[9px] ${msg.sender === 'student' ? 'text-burgundy-200' : 'text-slate-400'}`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'student' && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="space-y-2 pt-2">
          {attachedFile && (
            <div className="p-2 bg-white dark:bg-slate-900 border rounded-lg text-xs flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300 text-[11px]">Eklendi: <strong>{attachedFile.name}</strong></span>
              <button type="button" onClick={() => setAttachedFile(null)} className="text-red-600 text-xs font-bold">Kaldır</button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-burgundy-700 cursor-pointer transition-colors">
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
