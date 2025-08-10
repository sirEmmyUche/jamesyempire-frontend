import { create } from "zustand";

const loadUser = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  return userData ? userData : {};
};

const mergeDeep = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
    if (source[key] === undefined) continue;
    if (Array.isArray(source[key])) {
      result[key] = source[key];
    } else if (
      typeof source[key] === 'object' &&
      typeof result[key] === 'object' &&
      !Array.isArray(result[key])
    ) {
      result[key] = mergeDeep(result[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

export const user = create((set, get) => ({
  user: loadUser(),
  updateUser: (updatedDetails) => {
    const currentUser = get().user;
    const mergedUser = mergeDeep(currentUser, updatedDetails);
    set({ user: mergedUser });
    localStorage.setItem('user', JSON.stringify(mergedUser));
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



// import { create } from "zustand";

// const loadUser = () => {
//   const userData =  JSON.parse(localStorage.getItem("user"))
//   return userData? userData : {};
// };

// export const user = create((set, get) => ({
//     user: loadUser(),
//     updateUser: (userDetails) => {
//         set({ user: userDetails });
//         localStorage.setItem('user', JSON.stringify(userDetails));
//     },
//     getUser: () => {
//         const state = get();
//         return state.user;
//     },
//     clearUser: () => {
//         set({ user: {} });
//         localStorage.removeItem('user');
//     },
// }));