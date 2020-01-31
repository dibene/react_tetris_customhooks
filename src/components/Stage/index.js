import React from 'react'
//styles
import { StyledStage } from "./styles";
//components
import { Cell } from "../Cell";

export const Stage = ({ stage }) => {
    return (
        <StyledStage width={stage[0].length} height={stage.length}>
                {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
        </StyledStage>
    )
}