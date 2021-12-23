import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const JournalPage = () => {
const {date} = useParams()
const { isAuthenticated, user } = useAuth0();
const [journalPage, setJournalPage] = useState("")
useEffect(() => {
    if (user) {
        fetch(`/journalpage/${date}/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setJournalPage(data.data)
                console.log(data.data)
            });
    }
}, [user]);
    return (<>
        <h2>Journal Page</h2>
        <div>{journalPage.formatDate}</div>
        <Wrapper>
        <JournalTitle>{journalPage.title}</JournalTitle>
        <JournalPost>"{journalPage.post}"</JournalPost>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items:center;
`
const JournalTitle= styled.div`
margin-bottom: 10px;
font-size: 30px;
text-decoration: underline;

`
const JournalPost = styled.div`

`

export default JournalPage