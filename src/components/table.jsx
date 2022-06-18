import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { listData } from "../Redux/Actions/ProductAction";
import axios from "axios";

const columns = [
	{ id: "name", label: "Country Name", minWidth: 170 },
	{ id: "code", label: "Code", minWidth: 100 },
	{
		id: "New_Cases",
		label: "New_Cases",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "New_Deaths",
		label: "New_Deaths",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "Total_Confirmed",
		label: "Total_Confirmed",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "Total_Deaths",
		label: "Total_Deaths",
		minWidth: 170,
		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
];

function createData(
	name,
	code,
	New_Cases,
	New_Deaths,
	Total_Confirmed,
	Total_Deaths
) {
	return { name, code, New_Cases, New_Deaths, Total_Confirmed, Total_Deaths };
}

// const rows = [
// 	createData("India", "IN", 1324171354, 3287263),
// 	createData("China", "CN", 1403500365, 9596961),
// 	createData("Italy", "IT", 60483973, 301340),
// 	createData("United States", "US", 327167434, 9833520),
// 	createData("Canada", "CA", 37602103, 9984670),
// 	createData("Australia", "AU", 25475400, 7692024),
// 	createData("Germany", "DE", 83019200, 357578),
// 	createData("Ireland", "IE", 4857000, 70273),
// 	createData("Mexico", "MX", 126577691, 1972550),
// 	createData("Japan", "JP", 126317000, 377973),
// 	createData("France", "FR", 67022000, 640679),
// 	createData("United Kingdom", "GB", 67545757, 242495),
// 	createData("Russia", "RU", 146793744, 17098246),
// 	createData("Nigeria", "NG", 200962417, 923768),
// 	createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function StickyHeadTable() {

	const [BigData, setBigData] = useState([]);
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	function appendData(arr){

		arr.map((e) => {
			let obj = createData(
				e.Country,
				e.CountryCode,
				e.NewConfirmed,
				e.NewDeaths,
				e.TotalConfirmed,
				e.TotalDeaths
			);

			for(let x of rows){
				if(rows[x]){
					rows[x] = 1
				}
				else{
					rows.push(obj)
				}
			}
		})

	}

	const data = () => {
		axios
			.get("https://api.covid19api.com/summary")
			.then((result) => {
				setBigData(result.data.Countries);


				// console.log(BigData);
			})

			.catch((err) => {
				console.error(err);
			});

	};
	useEffect(() => {
		data();
		appendData(BigData);

	}, []);


	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row) => {
								return (
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.name}
									>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell
													key={row.code}
													align={column.align}
												>
													{column.format &&
													typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
