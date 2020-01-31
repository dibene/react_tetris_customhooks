import { useState, useCallback } from 'react'
import { randomTetromino, initTetromino } from '../shared/tetrominos'
import { STAGE_WIDTH, checkCollision } from "../shared/gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: initTetromino().shape,
        collided: false
    })

    const rotate = (matrix, dir) => {
        const transposeTetro = matrix.map((rows, index) =>
            matrix.map(col => col[index])
        )
        if (dir > 0) return transposeTetro.map(row => row.reverse());
        return transposeTetro.reverse()
    }

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        // move the piece when dont have place for rotate
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prevState => ({
            ...prevState,
            pos: { x: (prevState.pos.x += x), y: (prevState.pos.y += y) },
            collided: collided
        }))
    }

    const resetPlayer = useCallback(
        () => {
            setPlayer({
                pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
                tetromino: randomTetromino().shape,
                collided: false
            })
        },
        [],
    )

    return [player, updatePlayerPos, resetPlayer, playerRotate]
}