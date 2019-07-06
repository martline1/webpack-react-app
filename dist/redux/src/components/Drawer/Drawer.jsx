import React                  from "react";
import PropTypes              from "prop-types";
import { connect }            from "react-redux";
import { bindActionCreators } from "redux";
import SwipeableDrawer        from "@material-ui/core/SwipeableDrawer";

// Import Own Components
import DrawerActions from "../../config/store/actions/drawerActions";
import SideList      from "./SideList.jsx";
import "./Drawer.scss";

const Drawer = ({ openDrawer, drawerActions }) => (
	<SwipeableDrawer
		open={openDrawer || false}
		disableBackdropTransition
		onClose={() => drawerActions.closeDrawer(false)}
		onOpen={() => drawerActions.openDrawer(true)}
		className="Drawer"
	>
		<div
			tabIndex={0}
			role="button"
			onKeyDown={() => drawerActions.closeDrawer(false)}
			className="DivList"
		>
			<SideList />
		</div>
	</SwipeableDrawer>
);

Drawer.propTypes = {
	openDrawer    : PropTypes.bool,
	drawerActions : PropTypes.shape({
		openDrawer  : PropTypes.func,
		closeDrawer : PropTypes.func,
	}).isRequired,
};

Drawer.defaultProps = {
	openDrawer : false,
};

const mapStateToProps    = ({ drawerReducer : { openDrawer } }) => ({ openDrawer });
const mapDispatchToProps = dispatch => ({ drawerActions : bindActionCreators(DrawerActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
