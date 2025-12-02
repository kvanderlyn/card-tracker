import { useState } from "react";
import "./App.css";
import type { User } from "@supabase/supabase-js";
import SignupForm from "./components/SignupForm";
import { auth } from "./utils/api";
import { currentUser } from "./utils/supabase";

export type TokenType = {
	access_token: string;
	expires_in: number;
	expires_at: number;
	refresh_token: string;
	user: User;
};

// import NewCardForm from "./components/NewCardForm";
function checkToken(token: TokenType) {
	try {
		const timeStamp_in_miliseconds = token.expires_at * 1000;
		const current_time = Date.now();
		const time_remaining = timeStamp_in_miliseconds - current_time;
		return { valid: time_remaining > 1000, timeRemaining: time_remaining };
	} catch {
		return { valid: false, timeRemaining: undefined };
	}
}
function App() {
	const [user, setUser] = useState<User | null>();
	let userName: string = "Unknown User";
	const token: TokenType = currentUser ? JSON.parse(currentUser) : undefined;
	if (token && !checkToken(token).valid) {
		localStorage.clear();
		setUser(null);
	} else if (token !== undefined && !user) {
		setUser(token.user);
	}
	if (user) {
		userName = user.user_metadata?.username;
	}
	return (
		<>
			<h1>Card Tracker</h1>
			{!user && <SignupForm setUser={setUser} />}
			{user && (
				<div>
					<h2>Welcome, {userName || "Unknown User"}</h2>
					<button type="button" onClick={() => auth.signOut(setUser)}>
						Logout
					</button>
				</div>
			)}
		</>
	);
}

export default App;
