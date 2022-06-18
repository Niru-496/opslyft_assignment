import { DATA_LIST_FAIL, DATA_LIST_REQUEST, DATA_LIST_SUCCESS } from "../Constants/ProductData";



export const DataListReducer = (state = { data_list: [] }, action) => {
	switch (action.type) {
		case DATA_LIST_REQUEST:
			return { loading: true, data_list: [] };
		case DATA_LIST_SUCCESS:
			return { loading: false, data_list: action.payload };
		case DATA_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};