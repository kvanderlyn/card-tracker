import type { ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

const cardTypes = ["Melody", "Harmony", "Item"];
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
type NewCardInputs = {
	card_name: string;
	card_version: string;
	card_id: string;
	starter_deck?: Array<(typeof starter_decks)[number]>;
	card_type: CardType;
	card_ad?: number;
	card_cost?: number;
	card_damage?: number;
	is_boss: boolean;
	card_adv_effect?: string;
	card_features: cardFeatures;
	card_description?: string;
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
	const starter_deck_value = watch("starter_deck");
	const isStarter =
		starter_deck_value !== undefined && starter_deck_value.length > 0;
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<fieldset>
				<legend>
					<h2>New Card:</h2>
				</legend>
				<div>
					<label htmlFor="card_name">Name:</label>
					<input
						type="text"
						{...register("card_name", { required: "Name is required" })}
						id="card_name"
					/>
					{errors.card_name && (
						<ErrorText>
							<span>{errors.card_name.message}</span>
						</ErrorText>
					)}
				</div>
				<div>
					<label htmlFor="card_version">Version:</label>
					<input
						type="text"
						{...register("card_version", {
							required: true,
							pattern: /\d+.\d+.\d+/i,
						})}
						id="card_version"
					/>
					{errors.card_version?.type === "required" && (
						<ErrorText>
							<span>Version is required</span>
						</ErrorText>
					)}
					{errors.card_version?.type === "pattern" && (
						<ErrorText>
							<span>
								Version format is incorrect. It should follow the pattern x.x.x
							</span>
						</ErrorText>
					)}
				</div>
				<div>
					<label htmlFor="card_id">Card ID:</label>
					<input
						type="text"
						{...register("card_id", {
							required: "Card ID is required",
						})}
						id="card_id"
					/>
					{errors.card_id && (
						<ErrorText>
							<span>{errors.card_id.message}</span>
						</ErrorText>
					)}
				</div>
				<div>
					<fieldset style={{ columnCount: "2" }}>
						<legend>Starter Deck:</legend>
						{starter_decks.map((deck: string) => {
							return (
								<div key={`${deck}_starter_checkbox`}>
									<input
										type="checkbox"
										id={`${deck}_starter`}
										{...register("starter_deck")}
										value={deck}
									/>
									<label
										style={{ display: "inline-block" }}
										htmlFor={`${deck}_starter`}
									>
										{deck}
									</label>
								</div>
							);
						})}
					</fieldset>
				</div>
				<div>
					<label htmlFor="card_type">Type:</label>
					<select
						{...register("card_type", { required: "Type is required" })}
						id="card_type"
					>
						{cardTypes.map((cardType) => (
							<option key={`card_type_${cardType}`} value={cardType}>
								{cardType}
							</option>
						))}
					</select>
					{errors.card_type && (
						<ErrorText>
							<span>{errors.card_type.message}</span>
						</ErrorText>
					)}
				</div>
				<div>
					<label htmlFor="card_ad">AD:</label>
					<input
						disabled={isStarter}
						type="number"
						{...register("card_ad", {
							required: !isStarter ? "AD is required" : false,
							min: { value: 0, message: "AD must be at least 0" },
							max: { value: 99, message: "AD must be under 99" },
						})}
						id="card_ad"
					/>
					{errors.card_ad && (
						<ErrorText>
							<span>{errors.card_ad.message}</span>
						</ErrorText>
					)}
				</div>
				<div>
					<label htmlFor="card_cost">Cost:</label>
					<input
						type="number"
						defaultValue={0}
						{...register("card_cost", {
							required: "Cost is required",
							valueAsNumber: true,
							min: { value: 0, message: "Cost must be at least 0" },
							max: { value: 5, message: "Cost must be under 5" },
						})}
						id="card_cost"
					/>
					{errors.card_cost && (
						<ErrorText>
							<span>{errors.card_cost.message}</span>
						</ErrorText>
					)}
				</div>
				<div>
					<label htmlFor="card_damage">Damage:</label>
					<input
						type="number"
						{...register("card_damage", {
							min: { value: 1, message: "Damage must be at least 0" },
							max: { value: 99, message: "Damage must be under 99" },
						})}
						id="card_damage"
					/>
					{errors.card_damage && (
						<ErrorText>
							<span>{errors.card_damage.message}</span>
						</ErrorText>
					)}
				</div>
				<div>
					<label style={{ display: "inline-block" }} htmlFor="is_boss">
						Boss
					</label>
					<input type="checkbox" {...register("is_boss")} id="is_boss" />
				</div>
				<div>
					<label htmlFor="card_adv_effect">Enemy Card Effect:</label>
					<textarea {...register("card_adv_effect")} id="card_adv_effect" />
				</div>
				<button type="submit">Add Card</button>
			</fieldset>
		</form>
	);
}

export function ErrorText(props: { children: ReactNode }) {
	return <div style={{ color: "red" }}>{props.children}</div>;
}
