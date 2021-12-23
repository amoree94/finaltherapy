import React, {useEffect, useState}from "react";
import styled from "styled-components";
import music from '../Music.mp3'



const Meditation = () => {
    useEffect(()=>{
        const tunes = new Audio(music)

        tunes.play()

        return ()=>{
            tunes.pause()
        }
    },[])
    return (<>
    <Background>
        <Title>Meditation</Title>
        <div>Meditation is simpler (and harder) than most people think. Read these steps, make sure you're somewhere where you can relax into this process, set a timer, and give it a shot:</div>

        <NumberSteps>1. Take a seat</NumberSteps>
        <div>Find a place to sit that feels calm and quiet to you</div>
        <NumberSteps>2. Set a time limit</NumberSteps>
        <div>If you are just beginning, it can help to choose a short time, such as five or 10 minutes.</div>
        <NumberSteps>3. Notice your body</NumberSteps>
        <div>You can sit in a chair with your feet on the floor. you can sit loosely cross-legged, you can kneel-- all are fine</div>
        <NumberSteps>4. Feel your breath</NumberSteps>
        <div>Follow the sensation of  your breath as it foes in and as it goes out.</div>
        <NumberSteps>5. notice when your mind has wandered</NumberSteps>
        <div>Inevitably, your attention will leave the breath and wander to other places. When you get around to noticing that your mind has wanded. Simply return your attention to your breath.</div>
        <NumberSteps>6. Be kind to your wandering mind</NumberSteps>
        <div>Don't judge yourself or obesess over the content of your thoughts. Just come back.</div>
        <NumberSteps>7. Close with kindness</NumberSteps>
        <div>When you are ready, gently life your gaze (if your eyes are closed, open them). Take a moment to notice any sounds in the environtment. Notice how your body feels right now. Notice your thoughs and emotions.</div>
        </Background>


        </>
    )
}
const Background = styled.div`
  background-color: #282c34;
  color: white;
  padding: 40px;
  font-family: Arial;
  text-align: center;

`
const Title = styled.div`
padding: 20px;
font-family: verdana; 
display:flex;
justify-content: center;
margin-top: 25px;
font-size: 75px;
text-decoration: underline;
`

const NumberSteps = styled.div`
margin-top: 15px;
font-size: 25px;

`
export default Meditation