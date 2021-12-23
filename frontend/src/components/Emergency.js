import React from "react";
import styled from "styled-components";
import helpImage from "../images/oktoaskforhelp.jpg"
import helpBackground from "../images/HELPBACKGROUND.jpg"
import helpImage2 from "../images/helpbackground2.jpg"
import helpImage3 from "../images/helpbackground3.jpg"

const Emergency = () => {
	return (<>
		
			<Title>
				“THOUGHTS OF SUICIDE OR HARMING YOURSELF CALL 833-456-4566 -
				Canada Suicide Prevention Service" (available 24/7 - 365 days a
				year)
			</Title>
		<Background>
			<EmergencyImage src={helpImage} alt="image"/>
			<EmergencyImage src={helpBackground} alt="image2"/>
			<EmergencyImage src={helpImage2} alt="image3"/>
			<EmergencyImage src={helpImage3} alt="image4"/>
		</Background>
		</>
	);
};

const Title = styled.h1`
font-family: Arial;

`

const Background = styled.div`
display:flex;
height:500px;
width:500px;
`

const EmergencyImage= styled.img`
border-radius: 50%;
height:300px;
width:300px;


`

export default Emergency;
