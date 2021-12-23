import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
	return (
		<StyledHeader>
			<StyledLinks>
				<StyledLink to="/emergency">Emergency</StyledLink>

				<StyledLink to="/">Home</StyledLink>

				<StyledLink to="/survey">How are you Today?</StyledLink>

				<StyledLink to="/journal">What's on your mind?</StyledLink>

				<StyledLink to="/meditation">Meditation</StyledLink>
				<LogoutButton/>
				
			</StyledLinks>
		</StyledHeader>
	);
};

const StyledLink = styled(Link)`
color: white;
text-decoration: none;
font-family: Arial;
font-size: 20px;
`
const StyledHeader = styled.div`
	
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	height: 100px;
	
	background-color: #ff8c69;
`;

const StyledLinks = styled.div`
	display: flex;
	justify-content: space-evenly;
	color: white;
	width: 70vw;
`;

export default Header;
