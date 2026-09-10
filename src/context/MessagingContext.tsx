import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'student' | 'employer' | 'career_center';
  text: string;
  timestamp: string;
  attachmentName?: string;
  isRead?: boolean;
}

export interface ConversationItem {
  id: string;
  candidateName: string;
  candidateEmail: string;
  department: string;
  jobTitle: string;
  companyName: string;
  contactName: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCountStudent: number;
  unreadCountEmployer: number;
}

interface MessagingContextType {
  conversations: ConversationItem[];
  messages: Record<string, ChatMessage[]>;
  sendMessage: (
    conversationId: string,
    text: string,
    sender: 'student' | 'employer' | 'career_center',
    attachmentName?: string
  ) => void;
  markAsRead: (conversationId: string, role: 'student' | 'employer') => void;
  getOrCreateConversation: (
    candidateName: string,
    candidateEmail: string,
    department: string,
    jobTitle: string
  ) => string;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv-1',
    candidateName: 'Emre Tunç',
    candidateEmail: 'emre.tunc@ogr.ktun.edu.tr',
    department: 'Bilgisayar Mühendisliği',
    jobTitle: 'Yazılım Geliştirme Mühendisi (Gömülü C++)',
    companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
    contactName: 'ASELSAN Konya İK (Mehmet Yılmaz)',
    lastMessage: 'Mülakat öncesi C++ projenizin GitHub linkini iletir misiniz?',
    lastTimestamp: '14:20',
    unreadCountStudent: 1,
    unreadCountEmployer: 0,
  },
  {
    id: 'conv-2',
    candidateName: 'Kerem Doğan',
    candidateEmail: 'kerem.dogan@ogr.ktun.edu.tr',
    department: 'Makine Mühendisliği',
    jobTitle: 'Mekatronik Sistemler Tasarım Mühendisi',
    companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
    contactName: 'ASELSAN Konya İK (Mehmet Yılmaz)',
    lastMessage: 'Merhaba Mehmet Bey, CAD teknik verilerini ekte iletiyorum.',
    lastTimestamp: '11:45',
    unreadCountStudent: 0,
    unreadCountEmployer: 1,
  },
  {
    id: 'conv-3',
    candidateName: 'Gamze Kılıç',
    candidateEmail: 'gamze.kilic@ogr.ktun.edu.tr',
    department: 'Bilgisayar Mühendisliği',
    jobTitle: 'Veri Analitiği ve Yapay Zeka Stajyeri',
    companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
    contactName: 'ASELSAN Konya İK (Mehmet Yılmaz)',
    lastMessage: 'Staj başvuru evraklarımı kontrol eder misiniz?',
    lastTimestamp: 'Dün',
    unreadCountStudent: 0,
    unreadCountEmployer: 0,
  },
  {
    id: 'conv-4',
    candidateName: 'KTÜN Kariyer Merkezi Uzmanı',
    candidateEmail: 'kariyer@ktun.edu.tr',
    department: 'Kariyer Gelişim Merkezi',
    jobTitle: 'Kurumsal İlan Moderasyonu',
    companyName: 'KTÜN Rektörlüğü',
    contactName: 'KTÜN Kariyer Gelişim Merkezi Uzmanı',
    lastMessage: '2024 Bahar dönemi ilan onayınız sisteme tanımlanmıştır.',
    lastTimestamp: 'Dün',
    unreadCountStudent: 0,
    unreadCountEmployer: 0,
  },
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-1': [
    {
      id: 'm1',
      sender: 'employer',
      text: 'Merhaba Emre Bey, ASELSAN Konya aday mühendislik başvurunuz inceleme aşamasındadır.',
      timestamp: '14:15',
      isRead: true,
    },
    {
      id: 'm2',
      sender: 'student',
      text: 'Merhaba Mehmet Bey, ilginiz için teşekkür ederim. Detaylı sorularınız olursa memnuniyetle yanıtlarım.',
      timestamp: '14:18',
      isRead: true,
    },
    {
      id: 'm3',
      sender: 'employer',
      text: 'Mülakat öncesi C++ projenizin GitHub linkini iletir misiniz?',
      timestamp: '14:20',
      isRead: false,
    },
  ],
  'conv-2': [
    {
      id: 'm2-1',
      sender: 'employer',
      text: 'Kerem Bey merhaba, mekatronik projenizdeki 3D CAD çizimlerini kontrol etmek istiyoruz.',
      timestamp: '11:30',
      isRead: true,
    },
    {
      id: 'm2-2',
      sender: 'student',
      text: 'Merhaba Mehmet Bey, CAD teknik verilerini ekte iletiyorum.',
      timestamp: '11:45',
      attachmentName: 'Kerem_Dogan_CAD_Proje.pdf',
      isRead: false,
    },
  ],
  'conv-3': [
    {
      id: 'm3-1',
      sender: 'student',
      text: 'Staj başvuru evraklarımı kontrol eder misiniz?',
      timestamp: 'Dün',
      isRead: true,
    },
    {
      id: 'm3-2',
      sender: 'employer',
      text: 'Evraklarınız tamamlandı Gamze Hanım, teşekkürler.',
      timestamp: 'Dün',
      isRead: true,
    },
  ],
  'conv-4': [
    {
      id: 'm4-1',
      sender: 'career_center',
      text: '2024 Bahar dönemi ilan onayınız sisteme tanımlanmıştır.',
      timestamp: 'Dün',
      isRead: true,
    },
  ],
};

export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<ConversationItem[]>(() => {
    const saved = localStorage.getItem('ktun_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('ktun_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ktun_conversations', JSON.stringify(conversations));
    } catch (e) {
      console.warn('Storage quota exceeded for conversations');
    }
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem('ktun_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Storage quota exceeded for messages');
    }
  }, [messages]);

  const sendMessage = (
    conversationId: string,
    text: string,
    sender: 'student' | 'employer' | 'career_center',
    attachmentName?: string
  ) => {
    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      sender,
      text,
      timestamp: now,
      attachmentName,
      isRead: false,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text || (attachmentName ? `Dosya: ${attachmentName}` : ''),
            lastTimestamp: now,
            unreadCountStudent: sender === 'employer' ? c.unreadCountStudent + 1 : c.unreadCountStudent,
            unreadCountEmployer: sender === 'student' ? c.unreadCountEmployer + 1 : c.unreadCountEmployer,
          };
        }
        return c;
      })
    );
  };

  const markAsRead = (conversationId: string, role: 'student' | 'employer') => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            unreadCountStudent: role === 'student' ? 0 : c.unreadCountStudent,
            unreadCountEmployer: role === 'employer' ? 0 : c.unreadCountEmployer,
          };
        }
        return c;
      })
    );

    setMessages((prev) => {
      const convMsgs = prev[conversationId];
      if (!convMsgs) return prev;
      return {
        ...prev,
        [conversationId]: convMsgs.map((m) => ({ ...m, isRead: true })),
      };
    });
  };

  const getOrCreateConversation = (
    candidateName: string,
    candidateEmail: string,
    department: string,
    jobTitle: string
  ): string => {
    const existing = conversations.find((c) => c.candidateEmail === candidateEmail);
    if (existing) return existing.id;

    const newId = `conv-${Date.now()}`;
    const newConv: ConversationItem = {
      id: newId,
      candidateName,
      candidateEmail,
      department,
      jobTitle,
      companyName: 'ASELSAN Konya Silah Sistemleri A.Ş.',
      contactName: 'ASELSAN Konya İK (Mehmet Yılmaz)',
      lastMessage: 'Sohbet başlatıldı.',
      lastTimestamp: 'Şimdi',
      unreadCountStudent: 0,
      unreadCountEmployer: 0,
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => ({
      ...prev,
      [newId]: [
        {
          id: `msg-${Date.now()}`,
          sender: 'employer',
          text: `Merhaba ${candidateName}, ${jobTitle} başvurunuz hakkında sizinle iletişime geçiyoruz.`,
          timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
        },
      ],
    }));

    return newId;
  };

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        messages,
        sendMessage,
        markAsRead,
        getOrCreateConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};
