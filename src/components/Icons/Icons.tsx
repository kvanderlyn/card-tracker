import type { JSX } from "react";
import * as iconList from "./index";

export type IconProps = {
	size?: number;
	focusable?: boolean;
	role?: string;
	className?: string;
} & JSX.IntrinsicElements["svg"];

export const Icon = Object.fromEntries(
	Object.entries(iconList).map(([name, IconComponent]) => [
		name,
		({
			className,
			focusable = false,
			role = "img",
			...iconProps
		}: IconProps) => {
			const finalProps = {
				focusable,
				role,
				...iconProps,
			};

			if (
				role === "img" &&
				!iconProps["aria-hidden"] &&
				!iconProps["aria-label"] &&
				!iconProps["aria-labelledby"]
			) {
				console.warn(
					`${name} Icon missing accessible label. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Img_role#associated_wai-aria_roles_states_and_properties`,
				);
			}
			return <IconComponent {...finalProps} width="1em" height="1em" />;
		},
	]),
) as {
	[K in keyof typeof iconList]: React.ComponentType<IconProps>;
};
