import { create } from 'zustand';

interface Message {
  img: string;
  content: string;
  time?: string;
  sender: string;
}

interface Contact {
  id: number;
  fullName: string;
  role: string;
  lastmessage: string;
  lastmessageTime: string;
  unredmessage: number;
  avatar: string;
  status: string;
}

interface Chat {
  id: number;
  userId: number;
  messages: Message[];
}

interface AppState {
  openProfile: boolean;
  openinfo: boolean;
  activechat: boolean;
  searchContact: string;
  mobileChatSidebar: boolean;
  profileinfo: Record<string, unknown>;
  messFeed: Message[];
  user: Record<string, unknown>;
  contacts: Contact[];
  chats: Chat[];
  sendMessage: (payload: Message) => void;
  toggleMobileChatSidebar: (payload: boolean) => void;
  infoToggle: (openinfo: boolean) => void;
}

const appChatStore = create<AppState>((set) => ({
  openProfile: false,
  openinfo: true,
  activechat: false,
  searchContact: "",
  mobileChatSidebar: false,
  profileinfo: {},
  messFeed: [],
  user: {},
  contacts: [
    {
      id: 1,
      fullName: "Kathryn Murphy",
      role: "Frontend Developer",
      lastmessage: "Hey! there I'm available",
      lastmessageTime: "2:30 PM",
      unredmessage: Math.floor(Math.random() * 10),
      avatar: "/assets/images/users/user-2.jpg",
      status: "offline",
    },
    {
      id: 2,
      fullName: "teste",
      role: " UI/UX Designer",
      lastmessage: "Hey! there I'm available",
      lastmessageTime: "2:30 PM",
      unredmessage: Math.floor(Math.random() * 10),
      avatar: "/assets/images/users/user-7.png",
      status: "active",
    },
    {
      id: 3,
      fullName: " Aileen Chavez",
      role: " Backend Developer",
      lastmessage: "Hey! there I'm available",
      lastmessageTime: "2:30 PM",
      unredmessage: Math.floor(Math.random() * 10),
      avatar: "/assets/images/users/user-4.jpg",
      status: "offline",
    },
    {
      id: 4,
      fullName: "Alec Thompson",
      role: " Full Stack Developer",
      lastmessage: "Hey! there I'm available",
      lastmessageTime: "2:30 PM",
      unredmessage: Math.floor(Math.random() * 10),
      avatar: "/assets/images/users/user-5.jpg",
      status: "active",
    },
    {
      id: 5,
      fullName: "Murphy Aileen",
      role: "Frontend Developer",
      lastmessage: "Hey! there I'm available",
      lastmessageTime: "2:30 PM",
      unredmessage: Math.floor(Math.random() * 10),
      avatar: "/assets/images/users/user-1.jpg",
      status: "offline",
    },
  ],
  chats: [
    {
      id: 1,
      userId: 1,
      messages: [
        {
          img: "/assets/images/users/user-2.jpg",
          content: "teste",
          time: "10:00",
          sender: "them",
        },
        {
          img: "/assets/images/users/user-2.jpg",
          content: "salve teste",
          time: "10:02",

          sender: "them",
        },
        {
          content: "Hi, I am good, what about you?",
          img: "/assets/images/users/user-1.jpg",
          time: "10:01",
          sender: "me",
        },

        {
          content: "Thanks, It will be great.",
          img: "/assets/images/users/user-1.jpg",
          time: "10:03",
          sender: "me",
        },
        {
          img: "/assets/images/users/user-2.jpg",
          content: "Hey! How are you?",
          time: "10:00",
          sender: "them",
        },
        {
          img: "/assets/images/users/user-7.png",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          time: "10:02",

          sender: "them",
        },
        {
          content: "Hi, I am good, what about you?",
          img: "/assets/images/users/user-1.jpg",
          time: "10:01",
          sender: "me",
        },

        {
          content: "Thanks, It will be great.",
          img: "/assets/images/users/user-1.jpg",
          time: "10:03",
          sender: "me",
        },
      ],
    },
    {
      id: 2,
      userId: 2,
      messages: [
        {
          img: "/assets/images/users/user-7.png",
          content: "lore",
          time: "10:00",
          sender: "them",
        },
        {
          img: "/assets/images/users/user-7.png",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          time: "10:02",

          sender: "them",
        },
      ],
    },
    {
      id: 3,
      userId: 3,
      messages: [
        {
          img: "/assets/images/users/user-2.jpg",
          content: "Hey! How are you?",
          time: "10:00",
          sender: "them",
        },
        {
          img: "/assets/images/users/user-2.jpg",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          time: "10:02",

          sender: "me",
        },
      ],
    },
    {
      id: 4,
      userId: 4,
      messages: [
        {
          img: "/assets/images/users/user-2.jpg",
          content: "Hey! How are you?",
          time: "10:00",
          sender: "me",
        },
        {
          img: "/assets/images/users/user-2.jpg",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          time: "10:02",

          sender: "them",
        },
      ],
    },
    {
      id: 5,
      userId: 5,
      messages: [
        {
          img: "/assets/images/users/user-2.jpg",
          content: "Hey! How are you?",
          time: "10:00",
          sender: "them",
        },
        {
          img: "/assets/images/users/user-2.jpg",
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          time: "10:02",

          sender: "them",
        },
      ],
    },
  ],

  openChat: (payload:any) =>
  set((state: AppState) => {
    console.log('Payload:', state);
    console.log('Current State:', payload.contact.id);
    const contactId = payload.contact.id;
    const chat = state.chats.find((item:Chat) => item.userId === contactId);
    return {
      activechat: payload.activechat,
      mobileChatSidebar: !state.mobileChatSidebar,
      user: payload.contact,
      messFeed: chat?.messages || [],


    };
  }),
  toggleMobileChatSidebar: (payload:boolean) =>
    set(() => ({
      mobileChatSidebar: payload,
    })),
  infoToggle: (payload:boolean) =>
    set(() => ({
      openinfo: payload,
    })),
  sendMessage: (payload) =>
    set((state) => ({
      messFeed: [...state.messFeed, payload],
    })),
  toggleProfile: (payload:boolean) =>
    set(() => ({
      openProfile: payload,
    })),
  setContactSearch: (payload:string) =>
    set(() => ({
      searchContact: payload,
    })),
    toggleActiveChat: (payload: boolean) =>
    set((state) => ({
      ...state,
      activechat: payload,
    })),
}));
;
export default appChatStore;
