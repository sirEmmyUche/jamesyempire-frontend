import { create } from "zustand";

const loadUser = () => {
  const userData =  JSON.parse(localStorage.getItem("user"))
  return userData? userData : {};
};


// export const useSignalStore = create((set, get) => ({
//     signal: null,
//     updateSignal: (newSignal) => set({ signal: newSignal }),
//     getSignal: () => {
//         const state = get();
//         return state.signal
//     },
//   }))

export const user = create((set, get) => ({
    user: loadUser(),
    updateUser: (userDetails) => {
        set({ user: userDetails });
        localStorage.setItem('user', JSON.stringify(userDetails));
    },
    getUser: () => {
        const state = get();
        return state.user;
    },
    clearUser: () => {
        set({ user: {} });
        localStorage.removeItem('user');
    },
}));