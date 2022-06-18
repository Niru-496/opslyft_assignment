import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const NotFound = () => {
 const navigate = useNavigate()
	const GotoHere= () => {
		navigate("/")
	}
	return (
		<>
		<Navbar/>
			<div className="container my-5">
				<div className="row justify-content-center align-items-center">
					{/* <h4 className="text-center mb-2 mb-sm-5"></h4> */}
					<img
						style={{
							width: "100%",
							height: "100%",
							objectFit: "fit",
						}}
						src="https://cdn.mos.cms.futurecdn.net/PuXipAW3AXUzUJ4uYyxPKC-1200-80.jpg"
						alt="Not-found"
					/>
					<button onClick={GotoHere} className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">

							Home page

					</button>
				</div>
			</div>
		</>
	);
};

export default NotFound;
