import { useState, useEffect } from 'react'
import { createStage } from "../shared/gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage())
    const [rowsClear, setRowsClear] = useState(0)

    useEffect(() => {
        /** clear rows**/
        setRowsClear(0);
        const sweepRows = newStage =>
            newStage.reduce((ack, row) => {
                // if dont exist 0 in a row
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsClear(prevCount => prevCount + 1)
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [])

        // const sweepRowsw = newStage =>
        //     newStage.reduce((ack, row) => {
        //         // if dont exist 0 in a row
        //         if (row.findIndex(cell => cell[0] === 0) === -1) {
        //             setRowsClear(prevCount => prevCount + 1)
        //             ack.push(new Array(newStage[0].length).fill(['W', 'merged']))
        //             return ack;
        //         }
        //         ack.push(row);
        //         return ack;
        //     }, [])

        const updateStage = prevStage => {
            // first flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            )
            // then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`
                        ]
                    }
                })
            })

            // check finish drop
            if (player.collided) {
                resetPlayer()
                return sweepRows(newStage)
            }
            return newStage;
        }

       

        setStage(prevStage =>
            updateStage(prevStage)
        )
    }, [player, resetPlayer]);

    return [stage, setStage, rowsClear]
}