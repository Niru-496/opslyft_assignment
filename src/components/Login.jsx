import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/Actions/userLoginAction";
import Navbar from "./navbar";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassoword] = useState("");
	const dispatch = useDispatch();
	const submitHandle = (e) => {
		e.preventDefault();
		dispatch(login(email, password));

	};

	const userLogin = useSelector((state) => state.userLogin);
	const { error, loading, userInfo } = userLogin;
	const redirect = window.location.search ? window.location.search.split("=")[1]:"/";
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, navigate, redirect]);
	return (
		<>
		<Navbar/>

			<div className="container d-flex flex-column justify-content-center align-items-center login-center">

				<form
					className="Login col-md-8 col-lg-4 col-11"
					onSubmit={submitHandle}
				>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassoword(e.target.value)}
					/>
					<button type="submit">Login</button>
					<p>
						<Link
							to={
								redirect
									? `/register?redirect=${redirect}`
									: "/register"
							}
						>
							Create Account
						</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default Login;
