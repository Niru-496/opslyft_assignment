import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../Errors/Error";
import { Loading } from "../Errors/Loading";
import { ReGiStEr } from "../Redux/Actions/userLoginAction";
import Navbar from "./navbar";

const Register = () => {
	const [name, Setname] = useState("");
	const [email, Setemail] = useState("");
	const [password, Setpassoword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const submitHandle = (e) => {
		e.preventDefault();
		dispatch(ReGiStEr(name, email, password));
	};

	const userRegister = useSelector((state) => state.userRegister);
	const { error, loading, userInfo } = userRegister;
	const redirect = window.location.search
		? window.location.search.split("=")[1]
		: "/";
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, navigate, redirect]);
	return (
		<>
			<Navbar/>
			<div className="container d-flex flex-column justify-content-center align-items-center login-center">
				{error && <Message variant={"alert-danger"}> {error}</Message>}
				{loading && <Loading />}
				<form
					className="Login col-md-8 col-lg-4 col-11"
					onSubmit={submitHandle}
				>
					<input
						type="text"
						placeholder="Username"
						value={name}
						onChange={(e) => Setname(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => Setemail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => Setpassoword(e.target.value)}
					/>

					<button type="submit">Register</button>
					<p>
						<Link
							to={
								redirect
									? `/login?redirect=${redirect}`
									: "/login"
							}
						>
							I Have Account <strong>Login</strong>
						</Link>
					</p>
				</form>
			</div>
		</>
	);
};

export default Register;
