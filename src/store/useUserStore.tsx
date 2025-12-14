import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

type State = {
	userName: string;
	session: Session | null;
	authState: string;
};
type Action = {
	setSession: (session: State["session"]) => void;
	setUserName: (userName: State["userName"]) => void;
	setAuthState: (authState: State["authState"]) => void;
	reset: () => void;
};
export type UserStoreType = State & Action;
const useUserStore = create<State & Action>()((set, __, store) => ({
	userName: "",
	session: null,
	authState: "INITIAL_SESSION",
	setUserName: (userName) => set(() => ({ userName: userName })),
	setSession: (session) => set(() => ({ session: session })),
	setAuthState: (authState) => set(() => ({ authState: authState })),
	reset: () => {
		set(store.getInitialState());
	},
}));

export { useUserStore };
