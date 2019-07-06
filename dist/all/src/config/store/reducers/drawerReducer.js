import {
	CLOSE_DRAWER,
	OPEN_DRAWER
} from "../../constants/actionTypes";

const drawerReducer = (state = {}, action) => {
	switch (action.type) {
		case OPEN_DRAWER:
			return {
				openDrawer : true,
			};
		case CLOSE_DRAWER:
			return {};
		default:
			return state;
	}
};

export default drawerReducer;
