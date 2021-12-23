import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import moment from 'moment'
import styled from "styled-components";

const Journal = () => {
	const { isAuthenticated, user } = useAuth0();
	const [post, setPost] = useState("");
	const [titleChange, setTitleChange] = useState("");

	// console.log(user);
	const handleChange = (ev) => {
		setPost(ev.target.value);
	};
	const handleChangeTitle = (ev) => {
		setTitleChange(ev.target.value);
	};
	const handleSubmit = (ev) => {
		ev.preventDefault();
		const data = { post, title: titleChange, date: new Date(), formatDate:moment().format("MMM Do YY")}; // {post}==={post:post}

		fetch(`/journals/${user.email}`, {
			// sending email as a parameter to backend
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				setPost("");
				setTitleChange("");
				console.log(data);
			});
	};

	return !isAuthenticated ? (
		<>
			<h1>Please Login</h1>
			<LoginButton />
		</>
	) : (
		<div>
			<Title>Welcome to your Personal Thoughts Journal!</Title>
			
			 <StyledForm onSubmit={handleSubmit}>
				<label>
					
					<input
						placeholder="Title"
						type="text"
						onChange={handleChangeTitle}
						value={titleChange}
					/>
				</label>
				<label>
					
					<StyledTextArea
						placeholder="What's on your mind?"
						onChange={handleChange}
						value={post}
					></StyledTextArea>
				</label>
				<StyledButton type="submit">Submit</StyledButton>
				</StyledForm>
			
		</div>
	);
};

const StyledButton= styled.button`
padding: 15px;
width:200px;
background-color: purple;
border-radius: 20px;
border: none;
color: white;
`

const StyledTextArea= styled.textarea`
margin-top: 10px;
height:300px;
width:700px;

`

const StyledForm = styled.form`
display:flex;
flex-direction: column;
align-items:center;
height:200px;
`
const Title = styled.h1`
display:flex;
justify-content: center;
font-family: verdana;
color: #ff4500;

`

export default Journal;
