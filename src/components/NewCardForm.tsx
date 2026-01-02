import type { ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

const cardTypes = ["MELODY", "HARMONY", "ITEM", "BARD"];
const starterTypes = ["MELODY", "HARMONY"];
type CardType = (typeof cardTypes)[number];
const starter_decks = ["melody", "harmony", "texture", "rythem"];
type cardFeatures = {
	cardDraw?: number;
	banish?: number;
	skipBadStuff?: boolean;
	AdvDiscardRecall?: number;
	bardDeckSearch?: number;
	melodyCostReduction?: number;
	advDeckReclaim?: number;
	playFirst?: boolean;
	handSizeModifier?: number;
	bardDamageModifier?: number;
	lookAhead?: number;
	advDiscardSummon?: number;
};
// type NewCardInputs = {
// 	card_name: string;
// 	card_version: string;
// 	card_id: string;
// 	starter_deck?: Array<(typeof starter_decks)[number]>;
// 	card_type: CardType;
// 	card_ad?: number;
// 	card_cost?: number;
// 	card_damage?: number;
// 	is_boss: boolean;
// 	card_adv_effect?: string;
// 	card_features: cardFeatures;
// 	card_description?: string;
// };

type NewCardInputs = {
	cardName: string;
	cardType: CardType;
	isLoot?: boolean;
	isEquipment?: boolean;
	isStarter?: boolean;
	cardAD?: number;
	cardCost?: number;
	doesDamage: boolean;
	cardDamage?: number;
};

export default function NewCardForm() {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<NewCardInputs>();
	const onSubmit: SubmitHandler<NewCardInputs> = (data) => {
		console.log(data);
		reset();
	};
	const cardType = watch("cardType");
	const isStarter = watch("isStarter");
	const isEquipment = watch("isEquipment");
	const isLoot = watch("isLoot");
	const doesDamage = watch("doesDamage");
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<fieldset>
				<legend>
					<h2>New Card:</h2>
				</legend>
				<div>
					<label htmlFor="cardName">Card Name:</label>
					<input
						type="text"
						{...register("cardName", { required: "Name is required" })}
						id="cardName"
					/>
					{errors.cardName && (
						<ErrorText>
							<span>{errors.cardName.message}</span>
						</ErrorText>
					)}
				</div>
				<div>
					<label htmlFor="cardType">Card Type:</label>
					<select
						{...register("cardType", { required: "Type is required" })}
						id="cardType"
					>
						<option value={undefined}>SELECT TYPE</option>
						{cardTypes.map((type: string) => (
							<option value={type} key={type}>
								{type}
							</option>
						))}
					</select>
					{errors.cardName && (
						<ErrorText>
							<span>{errors.cardName.message}</span>
						</ErrorText>
					)}
				</div>
				{cardType === "ITEM" && (
					<div>
						<div>
							<input type="checkbox" {...register("isLoot")} id="isLoot" />
							<label style={{ display: "inline-block" }} htmlFor="isLoot">
								Loot
							</label>
						</div>
						<div>
							<input
								type="checkbox"
								{...register("isEquipment")}
								id="isEquipment"
							/>
							<label style={{ display: "inline-block" }} htmlFor="isEquipment">
								Equipment
							</label>
						</div>
					</div>
				)}
				{starterTypes.includes(cardType) && (
					<div>
						<div>
							<input
								type="checkbox"
								{...register("isStarter")}
								id="isStarter"
							/>
							<label style={{ display: "inline-block" }} htmlFor="isStarter">
								Starter
							</label>
						</div>
					</div>
				)}
				{cardType !== "BARD" && !isStarter && !isLoot && (
					<div>
						<label htmlFor="cardAD">Acquisition Difficulty:</label>
						<input
							type="number"
							{...register("cardAD", {
								required: !isStarter && !isLoot ? "AD is required" : false,
								min: { value: 0, message: "AD must be at least 0" },
								max: { value: 99, message: "AD must be under 99" },
							})}
							id="cardName"
						/>
						{errors.cardAD && (
							<ErrorText>
								<span>{errors.cardAD.message}</span>
							</ErrorText>
						)}
					</div>
				)}
				{cardType !== "BARD" && !isEquipment && (
					<div>
						<label htmlFor="cardCost">Card Cost:</label>
						<input
							type="number"
							{...register("cardCost", {
								required:
									!isStarter && !isEquipment ? "Cost is required" : false,
								min: { value: 0, message: "Cost must be at least 0" },
								max: { value: 5, message: "Cost must be under 5" },
							})}
							id="cardCost"
						/>
						{errors.cardCost && (
							<ErrorText>
								<span>{errors.cardCost.message}</span>
							</ErrorText>
						)}
					</div>
				)}
				<div>
					<input type="checkbox" {...register("doesDamage")} id="doesDamage" />
					<label style={{ display: "inline-block" }} htmlFor="doesDamage">
						Damage
					</label>

					{doesDamage && (
						<div>
							<label htmlFor="cardDamage">Damage Amount:</label>
							<input
								type="number"
								{...register("cardDamage", {
									min: { value: 0, message: "Damage must be at least 0" },
									max: { value: 100, message: "Damage must be under 100" },
								})}
								id="cardDamage"
							/>
							{errors.cardDamage && (
								<ErrorText>
									<span>{errors.cardDamage.message}</span>
								</ErrorText>
							)}
						</div>
					)}
				</div>
				<button type="submit">Add Card</button>
			</fieldset>
		</form>
	);
}

export function ErrorText(props: { children: ReactNode }) {
	return <div style={{ color: "red" }}>{props.children}</div>;
}
