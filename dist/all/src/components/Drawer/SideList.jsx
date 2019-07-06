import React, { useState }    from "react";
import PropTypes              from "prop-types";
import List                   from "@material-ui/core/List";
import Divider                from "@material-ui/core/Divider";
import ListItem               from "@material-ui/core/ListItem";
import ListItemText           from "@material-ui/core/ListItemText";
import Collapse               from "@material-ui/core/Collapse";
import HomeIcon               from "@material-ui/icons/Home";
import FolderIcon             from "@material-ui/icons/Folder";
import FolderOpenIcon         from "@material-ui/icons/FolderOpen";
import DriveFileOutlined      from "@material-ui/icons/InsertDriveFileOutlined";
import ListItemIcon           from "@material-ui/core/ListItemIcon";
import ExpandLess             from "@material-ui/icons/ExpandLess";
import ExpandMore             from "@material-ui/icons/ExpandMore";
import { connect }            from "react-redux";
import { bindActionCreators } from "redux";

// Import Own Components
import history       from "../../config/helpers/history";
import starGray      from "../../resources/star.svg";
import DrawerActions from "../../config/store/actions/drawerActions";
import "./SideList.scss";

const SideList = ({ drawerActions }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Close drawer when redirect to a url
	const handleRedirect = (url, newTab) => {
		setTimeout(() => drawerActions.closeDrawer(), 100);

		return newTab ? window.open(url) : history.push(url);
	};

	const MenuOptions = [
		{ name : "Option1", id : 1 },
		{ name : "Option2", id : 2 }
	];

	return (
		<div className="List">
			<List>
				<ListItem>
					<ListItemText>
						<div className="StarImgContainer">
							<div className="spacer">&nbsp;</div>
							<img src={starGray} alt="starGray" className="StarImg" onClick={() => handleRedirect("https://github.com/martline1/webpack-react-app", true)} />
						</div>
					</ListItemText>
				</ListItem>
			</List>

			<List>
				<ListItem button onClick={() => handleRedirect("/")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button onClick={() => handleRedirect("https://github.com/martline1/webpack-react-app", true)}>
					<ListItemIcon>
						<img src={starGray} alt="starGray" style={{ width : "22px", height : "22px" }} />
					</ListItemIcon>
					<ListItemText primary="Gitlab Repo" />
				</ListItem>
			</List>

			<Divider />
			<List>
				<ListItem button onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<ListItemIcon>
						{isMenuOpen ? <FolderOpenIcon /> : <FolderIcon /> }
					</ListItemIcon>
					<ListItemText inset primary="Menu" />
					{isMenuOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
					{MenuOptions.map(({ name, id }) => (
						<List component="div" disablePadding key={id}>
							<ListItem button style={{ paddingLeft : "32px" }} onClick={() => handleRedirect("/")}>
								<ListItemIcon>
									<DriveFileOutlined />
								</ListItemIcon>
								<ListItemText inset primary={name} />
							</ListItem>
						</List>
					))}
				</Collapse>
			</List>
		</div>
	);
};

SideList.propTypes = {
	drawerActions : PropTypes.shape({
		closeDrawer : PropTypes.func,
	}).isRequired,
};

const mapDispatchToProps = dispatch => ({ drawerActions : bindActionCreators(DrawerActions, dispatch) });

export default connect(null, mapDispatchToProps)(SideList);
