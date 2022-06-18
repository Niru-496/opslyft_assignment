import axios from "axios";
import { DATA_LIST_FAIL, DATA_LIST_REQUEST, DATA_LIST_SUCCESS } from "../Constants/ProductData";


export const listData = () => async (dispatch) => {
	try {
		dispatch({ type: DATA_LIST_REQUEST });
		const {data} = await axios.get(
			"https://api.covid19api.com/summary"
		);

		dispatch({ type: DATA_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: DATA_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
