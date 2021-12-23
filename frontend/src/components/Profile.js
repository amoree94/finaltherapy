import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  // console.log(user);
  const [userInfo, setUserInfo] = useState(null);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");
  const [renderProfile, setRenderProfile] = useState(false);
  

  const handleSubmit = (ev) => {
    ev.preventDefault();
		
    fetch(`/resource/${user.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resourceTitle, resourceLink }),
    }).then(() => {
      setResourceTitle("");
      setResourceLink("");
      setRenderProfile(!renderProfile);
    });
  };

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data.data);
        });
    }
  }, [user, renderProfile]);

  return !isAuthenticated ? (
    <>
      <h1>Please Login</h1>;
      <div>
        <LoginButton />
      </div>
    </>
  ) : (
    userInfo && (
      <Wrapper>
        <div>
          <Title>Welcome {user.given_name}!</Title>
          <ProfilePic src={user.picture} />
          <Score>
            Latest Wellness Score:{" "}
            {userInfo.score ? userInfo.score : "Test not yet taken"}
          </Score>
          <ResourceTitle>Paste your favorite links here:</ResourceTitle>
          <StyledForm onSubmit={handleSubmit}>
            <StyledLabel>
							
              <StyledInput
                placeholder="Title"
                type="text"
                onChange={(ev) => {
                  setResourceTitle(ev.target.value);
                }}
                value={resourceTitle}
              />
            </StyledLabel>

            <StyledLabel>
							
              <StyledInput
                placeholder="Link"
                type="text"
                onChange={(ev) => {
                  setResourceLink(ev.target.value);
                }}
                value={resourceLink}
              />
            </StyledLabel>
            <StyledButton type="submit">Add</StyledButton>
          </StyledForm>
        </div>
<BodyWrapper>

        <JournalWrapper>
          {userInfo.journal.length > 0 ? (
            <StyledLinks>
              {userInfo.journal.map((journals, index) => {
                return (
                  <JournalLinks
                    key={index}
                    to={`/journalpage/${journals.date}`}
                  >
                    {journals.title}
                  </JournalLinks>
                );
              })}
            </StyledLinks>
          ) : (
            <div> No Journal Entries</div>
          )}

        </JournalWrapper>
          <JournalTitles>Journal Entries:</JournalTitles>
          <ResourceLinkTitle>Resources:</ResourceLinkTitle>
        <StyledResources>
          {userInfo.resources.length > 0 ? (
            <StyledLinks>
              {userInfo.resources.map((resource, index) => {
                return (
                  <StyledAnchor
                    key={index}
                    href={resource.resourceLink}
                    target="_blank"
                  >
                    {resource.resourceTitle}
                  </StyledAnchor>
                );
              })}
            </StyledLinks>
          ) : (
            <div>No Resources yet!</div>
          )}
        </StyledResources>
				</BodyWrapper>
      </Wrapper>
    )
  );
};
const ResourceLinkTitle = styled.h2`
 position:relative;
  left: 100px;
  color: orange;
  font-family: Arial;
`

const StyledResources = styled.div`

margin-top: 100px;

`


const JournalTitles = styled.h2`
position:relative;
right: 350px;
color: orange;
font-family: Arial;

`

const BodyWrapper = styled.div`
display:flex;
justify-content: space-evenly;

width: 1000px;
`

const ResourceTitle = styled.div`
  font-size: 15px;
  color: white;
  font-family: Arial;
`;
const Score = styled.div`
  margin-top: 10px;
  color: white;
  font-size: 20px;
  font-family: Arial;
`;
const StyledButton = styled.button`
  width: 60%;
  margin-top: 10px;
`;
const StyledLinks = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  background-image: url("background1.jfif");
  display: flex;
  justify-content: flex-start;

  height: 500px;
`;
const ProfilePic = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const Title = styled.h1`
  font-family: American Typewriter, serif;
  color: white;
`;

const JournalWrapper = styled.div`
margin-top: 125px;
  display: flex;
  align-items: center;
  
  width: 300px;
  height:300px;
`;
const JournalLinks = styled(Link)`
  margin-bottom: 10px;
  font-size: 25px;
  font-family: verdana;
  text-decoration: none;
  color: white;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
 
  align-items: center;
  justify-content: center;
  height: 100px;
  margin-top: 25px;
`;

const StyledLabel = styled.label`
  margin-bottom: 10px;
  font-family: verdana;
`;

const StyledInput = styled.input`
  margin-left: 10px;
`;

const StyledAnchor = styled.a`
  margin-bottom: 10px;
  font-size: 25px;
  font-family: verdana;
  text-decoration: none;
  color: white;
`;
export default Profile;
