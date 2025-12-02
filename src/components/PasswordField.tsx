import { useState } from "react";
import { Input, type InputProps } from "react-aria-components";
import { Icon } from "./Icons/Icons";

function PasswordField(
	props: InputProps & React.RefAttributes<HTMLInputElement>,
) {
	const [pwVisible, setPwVisible] = useState(false);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flex: "auto",
				columnGap: "0.25rem",
			}}
		>
			<Input
				type={pwVisible ? "text" : "password"}
				autoComplete="off"
				{...props}
			/>

			<div>
				<button
					type="button"
					aria-label={pwVisible ? "Hide password" : "Show password"}
					style={{
						paddingTop: ".125rem",
					}}
					onClick={() => setPwVisible(!pwVisible)}
				>
					{pwVisible ? <Icon.EyeSlash aria-hidden /> : <Icon.Eye aria-hidden />}
				</button>
			</div>
		</div>
	);
}

function validatePassword(props: {
	inputPassword: string;
	rules?: Array<passwordValidation>;
}) {
	const defaultRules: Array<passwordValidation> = [
		{
			test: (password: string) => password.length >= 6,
			message: "Password must be at least 6 characters",
		},
		{
			test: (password: string) => /[A-Z]/.test(password),
			message: "Password must include at least one uppercase letter",
		},
		{
			test: (password: string) => /[a-z]/.test(password),
			message: "Password must include at least one lowercase letter",
		},
		{
			test: (password: string) => /[0-9]/.test(password),
			message: "Password must include at least one number",
		},
		{
			test: (password: string) =>
				/[!@#$%^&*()_+\-=[\]{};'\\:"|<>?,./`~]/.test(password),
			message: "Password must include at least one special character",
		},
	];
	const { inputPassword, rules = defaultRules } = props;
	const errorArray: Array<string> = [];
	rules.forEach((rule) => {
		rule.test(inputPassword) ? "" : errorArray.push(rule.message);
	});
	return errorArray;
}

export type passwordValidation = {
	test: (password: string) => boolean;
	message: string;
};
export { PasswordField, validatePassword };
