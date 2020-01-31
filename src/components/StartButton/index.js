import React from 'react'

//styles
import { StyledStartButton } from "./styles";

export const StartButton = ({ callback, startedGame }) => {
    return (
        <StyledStartButton onClick={callback}>
           { startedGame ? 'RESTART GAME' : 'START GAME'}
        </StyledStartButton>
    )
}
