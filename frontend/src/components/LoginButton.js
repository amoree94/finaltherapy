import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>
	);
};

const StyledButton = styled.button`
	width: 100px;
	height: 50px;
`;

export default LoginButton;
