import { useState } from "react";
import { FieldError, Input, Label, TextField } from "react-aria-components";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../utils/api";
import { PasswordField, validatePassword } from "./PasswordField";

export default function SignupForm() {
	const [password, setPassword] = useState("");
	const [showSignUp, setShowSignUp] = useState(false);
	let passwordErrors: Array<string> = [];

	type SignUpInputs = SignInInputs & {
		username?: string;
		confirm_password?: string;
	};

	type SignInInputs = {
		email: string;
		password: string;
	};

	let defaultValues: SignInInputs | SignUpInputs = {
		password: "",
		email: "",
	};

	if (showSignUp) {
		passwordErrors = validatePassword({
			inputPassword: password,
		});
		defaultValues = {
			password: "",
			username: "",
			email: "",
			confirm_password: "",
		};
	}

	const { handleSubmit, reset, control } = useForm<SignInInputs | SignUpInputs>(
		{
			defaultValues: defaultValues,
		},
	);

	async function signUp(formData: SignUpInputs) {
		await auth.signUp({
			email: formData.email,
			password: formData.password,
			username: formData.username as string,
		});
	}

	function signIn(formData: SignInInputs) {
		auth.signIn({
			email: formData.email,
			password: formData.password,
		});
	}

	const onSubmit: SubmitHandler<SignUpInputs | SignInInputs> = (data) => {
		showSignUp ? signUp(data) : signIn(data);
		reset();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			name={showSignUp ? "sign_up_form" : "sign_in_form"}
			autoComplete="off"
		>
			<fieldset>
				<legend>Sign {showSignUp ? "Up" : "In"}</legend>
				<Controller
					control={control}
					name="email"
					render={({ field }) => (
						<TextField
							type="email"
							isRequired
							style={{
								display: "flex",
								flexDirection: "column",
								flex: "auto",
								columnGap: "0.25rem",
							}}
						>
							<Label>Email:</Label>
							<Input {...field} />
							<FieldError />
						</TextField>
					)}
				/>
				{showSignUp && (
					<Controller
						control={control}
						name="username"
						render={({ field }) => (
							<TextField
								type="text"
								isRequired
								style={{
									display: "flex",
									flexDirection: "column",
									flex: "auto",
									columnGap: "0.25rem",
								}}
							>
								<Label>Username:</Label>
								<Input {...field} />
								<FieldError />
							</TextField>
						)}
					/>
				)}
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							style={{ display: "flex", flexDirection: "column" }}
							value={password}
							onChange={setPassword}
							isInvalid={passwordErrors.length > 0}
						>
							<Label>Password:</Label>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									flex: "auto",
									columnGap: "0.25rem",
								}}
							>
								<PasswordField {...field} />
							</div>
							<FieldError>
								<ul>
									{passwordErrors.map((error) => (
										<li key={error}>{error}</li>
									))}
								</ul>
							</FieldError>
						</TextField>
					)}
				/>
				{showSignUp && (
					<Controller
						name="confirm_password"
						control={control}
						render={({ field }) => (
							<TextField
								style={{ display: "flex", flexDirection: "column" }}
								validate={(value) =>
									value === password ? null : "Passwords must match"
								}
							>
								<Label>Confirm Password:</Label>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										flex: "auto",
										columnGap: "0.25rem",
									}}
								>
									<PasswordField {...field} />
								</div>
								<FieldError />
							</TextField>
						)}
					/>
				)}
				<button type="submit">Submit</button>
				<button type="button" onClick={() => setShowSignUp(!showSignUp)}>
					Sign {showSignUp ? "In" : " Up"}
				</button>
			</fieldset>
		</form>
	);
}
