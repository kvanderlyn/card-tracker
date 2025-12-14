import { useEffect, useState } from "react";
import "./App.css";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Authentication from "./components/Authentication";
import NewCardForm from "./components/NewCardForm";
import { useUserStore } from "./store/useUserStore";
import { auth, cards, profiles } from "./utils/api";
import type { CardRow } from "./utils/types";

function App() {
	const { userName } = useUserStore((state) => state);
	const [cardList, setCardList] = useState<Array<CardRow> | undefined>();
	const [showNewCardForm, setShowNewCardForm] = useState<boolean>(false);
	const [userList, setUserList] = useState<
		Array<{ id: string; username: string | null }> | undefined
	>();

	useEffect(() => {
		cards
			.getAll()
			.then((response) => {
				setCardList(response);
			})
			.catch((error: unknown) => console.log(error));
		profiles.getAllUserByID().then((response) => setUserList(response));
	}, []);

	const cardColumns: ColumnDef<CardRow>[] = [
		{
			accessorKey: "name",
			header: "Name",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "id",
			header: "Card ID",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "version",
			header: "Version",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "ad",
			header: "AD",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "cost",
			header: "Cost",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "damage",
			header: "Damage",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "damage_modifier",
			header: "Damage Modifier",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "description",
			header: "Description",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "card_draw",
			header: "Card Draw",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "template",
			header: "Template",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "tier",
			header: "Tier",
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: "created_at",
			header: "Date Created",
			cell: (info) => {
				const date = new Date(info.getValue() as string);
				return date.toLocaleDateString();
			},
		},
		{
			accessorKey: "created_by",
			header: "Created By",
			cell: (info) => {
				const id = info.getValue();
				const userName: { id: string; username: string | null } | undefined =
					userList?.find((user) => user.id === id);
				return userName?.username ?? "N/A";
			},
		},
	];
	const table = useReactTable({
		columns: cardColumns,
		data: cardList !== undefined ? cardList : [],
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<>
			<h1>Card Tracker</h1>
			<Authentication>
				<div>
					<h2>Welcome, {userName || "Unknown User"}</h2>
					<button type="button" onClick={() => auth.signOut()}>
						Logout
					</button>
					<button
						type="button"
						onClick={() => setShowNewCardForm(!showNewCardForm)}
					>
						{showNewCardForm ? "Hide New Card Form" : "Add New Card"}
					</button>
					{showNewCardForm && <NewCardForm />}
					<table>
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th key={header.id}>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Authentication>
		</>
	);
}

export default App;
