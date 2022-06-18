import axios from "axios";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_PROFILE_DETAILS_FAIL,
	USER_PROFILE_DETAILS_REQUEST,
	USER_PROFILE_DETAILS_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from "../Constants/UserConstant";

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data, token } = await axios.post(
			`https://revision1project.herokuapp.com/login/`,
			{ email, password },
			config
		);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data, token });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logOut = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
	window.location.href = "/login";
};

export const ReGiStEr = (fullName, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data, token } = await axios.post(
			`https://revision1project.herokuapp.com/register/`,
			{ fullName, email, password },
			config
		);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data, token });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data, token });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const GetandUpdateUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(
			`https://revision1project.herokuapp.com/profile/${id}`,
			config
		);

		dispatch({ type: USER_PROFILE_DETAILS_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		const message  = error.response && error.response.data.message
					? error.response.data.message
					: error.message

					if(message ==="Bearer token was not provided"){
						dispatch(logOut())
					}
		dispatch({
			type: USER_PROFILE_DETAILS_FAIL,
			payload: message,
		});
	}
};
