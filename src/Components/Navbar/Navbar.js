import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements.js";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/" activeStyle>
						Home
					</NavLink>
					<NavLink to="/login" activeStyle>
						Log In
					</NavLink>
					<NavLink to="/register" activeStyle>
						Register
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
