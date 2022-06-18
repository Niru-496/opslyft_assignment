import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

import { UserloginReducer, UserProfileReducer, UserRegisterReducer } from "./Reducers/UserReducer";
import { DataListReducer } from "./Reducers/ProductListReducer";


const userInfoFromLStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null ;
const intialState = {

	userLogin: { userInfo: userInfoFromLStorage },
};

let reducers = combineReducers({
	data_list: DataListReducer,
	userLogin: UserloginReducer,
	userRegister: UserRegisterReducer,
	userDetails: UserProfileReducer,
});
const middleware = [thunk];

export const Store = configureStore(
	{ reducer: reducers },
	intialState,
	composeWithDevTools(applyMiddleware(...middleware))
);
