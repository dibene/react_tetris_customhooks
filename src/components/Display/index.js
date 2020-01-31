import React from 'react'

//styles
import { StyledDisplay } from "./styles";

export const Display = ({ gameOver, startedGame, text }) => {
    return (
        <StyledDisplay gameOver={gameOver} startedGame={startedGame}>
            {text}
        </StyledDisplay>
    )
}
