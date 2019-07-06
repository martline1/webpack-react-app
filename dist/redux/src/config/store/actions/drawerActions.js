import {
	CLOSE_DRAWER,
	OPEN_DRAWER
} from "../../constants/actionTypes";

const openDrawer  = () => ({ type : OPEN_DRAWER });
const closeDrawer = () => ({ type : CLOSE_DRAWER });

const DrawerActions = {
	openDrawer,
	closeDrawer,
};

export default DrawerActions;
