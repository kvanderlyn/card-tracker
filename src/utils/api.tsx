import supabase, { userTokenName } from "./supabase";

export const auth = {
	signIn: async ({ email, password }: { email: string; password: string }) => {
		const data = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (data.error) {
			console.log(data.error);
			return false;
		} else {
			localStorage.setItem(userTokenName, JSON.stringify(data.data.session));
			return data.data.user;
		}
	},
	signOut: async (clearLocalUser?: (value: null) => void) => {
		await supabase.auth.signOut();
		localStorage.clear();
		clearLocalUser?.(null);
	},
};
