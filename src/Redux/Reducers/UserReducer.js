import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_DETAILS_FAIL, USER_PROFILE_DETAILS_REQUEST, USER_PROFILE_DETAILS_RESET, USER_PROFILE_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../Constants/UserConstant";

export const UserloginReducer = (
	state = {},
	action
) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};


export const UserRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
export const UserProfileReducer = (state = {user:{}}, action) => {
	switch (action.type) {
		case USER_PROFILE_DETAILS_REQUEST:
			return { loading: true };
		case USER_PROFILE_DETAILS_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_PROFILE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case USER_PROFILE_DETAILS_RESET:
			return { user:{}};
		default:
			return state;
	}
};