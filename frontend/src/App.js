import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Emergency from "./components/Emergency";
import Header from "./components/Header";
import Survey from "./components/Survey";
import Journal from "./components/Journal";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import Meditation from "./components/Meditation";
import JournalPage from "./components/JournalPage";

const App = () => {
	const { user, isAuthenticated } = useAuth0();
	// console.log(user);
	useEffect(() => {
		if (user) {
			fetch("/users", {
				method: "POST",
				body: JSON.stringify({
					email: user.email,
					name: user.name,
					picture: user.picture,
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				// .then((data) => console.log(data, "hit"));
		}
	}, [user]);

	return !isAuthenticated ? (
		<Router>
			<Route exact path="/">
				<LoginPage />
			</Route>
		</Router>
	) : (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/">
					<Profile />
				</Route>
				<Route path="/emergency">
					<Emergency />
				</Route>
				<Route path="/survey">
					<Survey />
				</Route>
				<Route path="/journal">
					<Journal />
				</Route>
				<Route path="/meditation">
					<Meditation/>
				</Route>
				<Route path="/journalpage/:date">
					<JournalPage/>
				</Route>
				{/* <Route path="/profile">
					<Profile />
				</Route> */}
			</Switch>
		</Router>
	);
};

export default App;
