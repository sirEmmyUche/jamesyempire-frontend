import {create} from 'zustand';

export const useChatStore = create((set, get) => ({
  chatRoomId: '',
  chats: {},
  selectedUser: null, 

  setChatRoomId: (id) => set({ chatRoomId: id }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  getChats: (chatRoomId) => {
    return get().chats[chatRoomId] || [];
  },
  
  addChats: (chatRoomId, messages) => {
    const current = get().chats[chatRoomId] || [];
    const newMessages = Array.isArray(messages) ? messages : [messages];
    const seen = new Set(current.map((m) => m.timestamp + m.message));
    const deduped = newMessages.filter((m) => !seen.has(m.timestamp + m.message));
    set((state) => ({
      chats: {
        ...state.chats,
        [chatRoomId]: [...current, ...deduped],
      },
    }));
  },

  clearChats: (chatRoomId) => {
    if (chatRoomId) {
      set((state) => ({
        chats: {
          ...state.chats,
          [chatRoomId]: [],
        },
      }));
    } else {
      set({ chats: {} });
    }
  },
}));
