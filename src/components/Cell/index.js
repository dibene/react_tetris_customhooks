import React from 'react'
import { StyledCell } from "./styles";
import { TETROMINOS } from "../../shared/tetrominos";

const Cell1 = ({ type }) => {
    return (
        <StyledCell type={type} color={TETROMINOS[type].color}>
        </StyledCell>
    )
}

export const Cell = React.memo(Cell1)