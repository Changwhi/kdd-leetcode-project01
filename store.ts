import { create } from "zustand";

export interface userRoleState {
  isAdmin: boolean | undefined;
  groupId: number | undefined
}

export interface userRoleAction {
  setIsAdmin: (isAdmin: boolean) => void;
  setGroupId: (groupId: number) => void;
}


const defaultState: userRoleState = {
  isAdmin: undefined,
  groupId: undefined,
};

const useUserRoleStore = create<userRoleState & userRoleAction>()((set) => ({
  ...defaultState,
  setIsAdmin: (admin: boolean) => set((state) => ({ ...state, isAdmin: admin})),
  setGroupId: (curr_groupId: number) => set((state) => ({ ...state, groupId: curr_groupId })),
}));

export default useUserRoleStore;
