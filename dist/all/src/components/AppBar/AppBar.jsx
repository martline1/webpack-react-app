import React                  from "react";
import PropTypes              from "prop-types";
import Typography             from "@material-ui/core/Typography";
import IconButton             from "@material-ui/core/IconButton";
import MenuIcon               from "@material-ui/icons/Menu";
import { connect }            from "react-redux";
import { bindActionCreators } from "redux";

// Import Own Components
import DrawerActions from "../../config/store/actions/drawerActions";
import "./AppBar.scss";

const AppBar = ({ drawerActions }) => (
	<div className="AppBar">
		<IconButton color="inherit" aria-label="Menu" onClick={() => drawerActions.openDrawer()}>
			<MenuIcon />
		</IconButton>
		<Typography variant="h6" color="inherit">
			{"Webpack React App"}
		</Typography>
	</div>
);

AppBar.propTypes = {
	drawerActions : PropTypes.shape({
		openDrawer : PropTypes.func.isRequired,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({ drawerActions : bindActionCreators(DrawerActions, dispatch) });

export default connect(null, mapDispatchToProps)(AppBar);
