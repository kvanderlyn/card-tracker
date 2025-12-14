import { type ReactNode, useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { auth } from "../utils/api";
import SignupForm from "./SignupForm";

export default function Authentication({ children }: { children: ReactNode }) {
	const session = useUserStore((state) => state.session);
	useEffect(() => {
		const { data } = auth.onAuthChange();
		return () => data.subscription.unsubscribe();
	}, []);

	if (session) {
		return <div>{children}</div>;
	}
	return <SignupForm />;
}
