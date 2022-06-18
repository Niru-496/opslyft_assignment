import './App.css';

import React from "react";
import Navbar from './components/navbar';
import { Routes, Route } from "react-router-dom";
import Login from "../src/components/Login"
import Register from "../src/components/Register";
import NotFound from "../src/components/NotFound";
import "../src/css/Reg.css"
import "../src/css/Media.css"
const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Navbar/>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default App;

