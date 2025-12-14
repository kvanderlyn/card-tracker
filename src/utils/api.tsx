import { useUserStore } from "../store/useUserStore";
import supabase from "./supabase";
import type { CardRow } from "./types";
export const auth = {
	signIn: async ({ email, password }: { email: string; password: string }) => {
		await supabase.auth
			.signInWithPassword({
				email: email,
				password: password,
			})
			.then((response) => {
				if (response.error) {
					throw Error;
				}
			})
			.catch((error: unknown) => {
				console.log("Error signing in");
				console.log(error);
			});
	},
	signOut: async () => {
		await supabase.auth.signOut();
	},
	signUp: async ({
		email,
		password,
		username,
	}: {
		email: string;
		password: string;
		username: string;
	}) => {
		await supabase.auth
			.signUp({
				email: email,
				password: password,
				options: {
					data: {
						username: username,
					},
				},
			})
			.then((response) => {
				if (response.error) {
					throw response.error;
				}
			})
			.catch((error: unknown) => {
				console.log(error);
			});
	},
	setSession: () => {
		const { setSession } = useUserStore.getState();
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});
	},
	onAuthChange: () => {
		const { setAuthState, setSession, setUserName, reset } =
			useUserStore.getState();

		return supabase.auth.onAuthStateChange((event, session) => {
			try {
				setAuthState(event);
				if (event === "SIGNED_OUT") {
					reset();
				}
				if (session) {
					setSession(session);
					const userName = session.user.user_metadata?.username;
					setUserName(userName);
				}
			} catch (error: unknown) {
				console.log(error);
			}
		});
	},
};
export const cards = {
	getAll: async (): Promise<CardRow[]> => {
		const { data, error } = await supabase.from("cards").select("*");
		if (error) throw error;
		return data ?? [];
	},
};
export const profiles = {
	getUserByID: async (id: string) => {
		const { data, error } = await supabase
			.from("profiles")
			.select("username")
			.eq("id", id);
		if (error) throw error;
		return data ?? [];
	},
	getAllUserByID: async (): Promise<
		Array<{ id: string; username: string | null }>
	> => {
		const { data, error } = await supabase
			.from("profiles")
			.select("username, id");
		if (error) throw error;
		return data ?? [];
	},
};
