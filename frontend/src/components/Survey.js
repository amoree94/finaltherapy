import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import { questions } from "./Questions";

const Survey = () => {
	const { isAuthenticated, user } = useAuth0();
	const [score, setScore] = useState({});
	
	const handleSubmit = (ev) => {
		let finalScore = 0;
		ev.preventDefault();
		const fullScore = Object.values(score);
		fullScore.forEach((value) => {
			finalScore = Number(value) + finalScore;
		});

		fetch(`/surveys/${user.email}`, {
			// sending email as a parameter to backend
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ finalScore }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	};

	const handleClick = (value, key) => {
		setScore({ ...score, [key]: value });
	};

	return !isAuthenticated ? (
		<>
			<h1>Please Login</h1>
			<LoginButton />
		</>
	) : (
		<Wrapper>
			<h1>Survey</h1>

			<a
				href="https://www.apa.org/depression-guideline/epidemiologic-studies-scale.pdf"
				target="_blank"
			>
				Source Document
			</a>
			<h3>During this Past Week</h3>
			<ScoreParent>
				<ScoreChild>
					Rare or none of the time (less than 1 day)
				</ScoreChild>
				<ScoreChild>Some or a little of the time (1-2 days)</ScoreChild>
				<ScoreChild>
					Occasionally or a moderate amount of time(3-4 days)
				</ScoreChild>
				<ScoreChild>Most or all of the time(5-7days)</ScoreChild>
			</ScoreParent>
			<Questions onSubmit={handleSubmit}>
				{questions.map((question, index) => {
					return (
						<StyledQuestion key={index}>
							<StyledLabel htmlFor={`Q${index + 1}`}>
								{question}
							</StyledLabel>
							<StyledRadio
								required
								type="radio"
								name={`Q${index + 1}`}
								value={0}
								onClick={(ev) =>
									handleClick(
										ev.target.value,
										`Q${index + 1}`
									)
								}
							/>
							<StyledRadio
								required
								type="radio"
								name={`Q${index + 1}`}
								value={1}
								onClick={(ev) =>
									handleClick(
										ev.target.value,
										`Q${index + 1}`
									)
								}
							/>
							<StyledRadio
								required
								type="radio"
								name={`Q${index + 1}`}
								value={2}
								onClick={(ev) =>
									handleClick(
										ev.target.value,
										`Q${index + 1}`
									)
								}
							/>
							<StyledRadio
								required
								type="radio"
								name={`Q${index + 1}`}
								value={3}
								onClick={(ev) =>
									handleClick(
										ev.target.value,
										`Q${index + 1}`
									)
								}
							/>
						</StyledQuestion>
					);
				})}
				<StyledButton type="submit">Submit</StyledButton>
			</Questions>
		</Wrapper>
	);
};

const StyledButton = styled.button`
width: 100px;
height: 50px;
display:flex;
justify-content: center;
align-items: center;
margin-left: 400px;
margin-top: 20px;

`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #282c34;
  color: white;
  padding: 40px;
  font-family: Arial;
  
`;

const ScoreParent = styled.div`
	display: flex;
	justify-content: space-between;
	width: 47%;
	margin-left: 500px;
	text-align: center;
	font-size: 1.2rem;
`;

const ScoreChild = styled.div`
	width: 175px;
`;

const Questions = styled.form`

	width: 75%;
	display: flex;
	flex-direction: column;
	padding: 25px;
`;

const StyledQuestion = styled.div`
	padding: 15px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	margin-top: 10px;
`;

const StyledLabel = styled.label`
	width: 400px;
	font-size: 1.3rem;
`;

const StyledRadio = styled.input`
	transform: scale(1.3);
`;

export default Survey;
