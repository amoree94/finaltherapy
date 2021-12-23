import React from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";

const LoginPage = () => {
	return (
		<>
			<Background>
				<LoginButton />
			</Background>
		</>
	);
};

const Background = styled.div`
	background-image: url("imgtest.jfif");
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default LoginPage;
