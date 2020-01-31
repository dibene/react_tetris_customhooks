import React, { useState } from 'react'

//styles
import { StyledTetrisWrapper, StyledTetris } from "./styles";

//custom hooks
import { useStage } from "../../hooks/useStage";
import { usePlayer } from "../../hooks/usePlayer";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";

// components
import { Stage } from "../Stage";
import { Display } from "../Display";
import { StartButton } from "../StartButton";

// helpers
import { createStage, checkCollision } from '../../shared/gameHelpers';

export const Tetris = ({ type }) => {
    //hooks
    const [pressLeft, setPressLeft] = useState(false);
    const [pressRight, setPressRight] = useState(false);
    const [pressDown, setPressDown] = useState(false);
    const [pressAny, setPressAny] = useState(false);

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [startedGame, setStartedGame] = useState(false);

    //custom hooks
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const startGame = () => {
        // set & reset everithing
        setDropTime(1000)
        setPressRight(false)
        setPressLeft(false)
        setPressDown(false)

        setStage(createStage())
        resetPlayer()
        setGameOver(false)
        setStartedGame(true)

        setLevel(0)
        setRows(0)
        setScore(0)
    }

    const drop = () => {
        //increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1)
            setDropTime(1000 / (level + 1) + 200)
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, colided: false })
        } else {
            //GAME OVER
            if (player.pos.y < 1) {
                setGameOver(true)
                setDropTime(null)
                setStartedGame(false)
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })
        }
    }

    const dropPlayer = () => {
        setDropTime(null)
        drop()
    }

    const movePlayer = (dir) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 }))
            updatePlayerPos({ x: dir, y: 0 })
    }

    const keyDownHandler = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                case 37:
                    //left anti bounce effect 
                    if (pressAny)
                        setPressLeft(true)
                    else
                        movePlayer(-1)
                    setPressAny(true)
                    break;
                case 39:
                    // right anti bounce effect 
                    if (pressAny)
                        setPressRight(true)
                    else
                        movePlayer(1)
                    setPressAny(true)
                    break;
                case 40:
                    // down
                    if (pressAny)
                        setPressDown(true)
                    else
                        dropPlayer()
                    setPressAny(true)
                    break;
                case 38:
                    // up
                    playerRotate(stage, 1)
                    break;
                default:
                    break;
            }
        }
    }

    const keyUpHandler = ({ keyCode }) => {
        setPressAny(false)

        if (!gameOver) {
            switch (keyCode) {
                case 37:
                    //left
                    setPressLeft(false)
                    break;
                case 39:
                    // right
                    setPressRight(false)
                    break;
                case 40:
                    // down
                    setPressDown(false)
                    setDropTime(1000 / (level + 1) + 200)
                    break;
                default:
                    break;
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime);

    // set interval  for correct display
    useInterval(() => {
        if (!gameOver) {
            if (pressLeft)
                movePlayer(-1)
            if (pressRight)
                movePlayer(1)
            if (pressDown)
                drop()
        }
    }, 20);

    console.log("render", dropTime)
    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyUp={keyUpHandler} onKeyDown={keyDownHandler}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? <Display text="GAME OVER" gameOver={gameOver} /> :
                        <div>
                            <Display startedGame={startedGame} text={"LEVEL: " + level} />
                            <Display startedGame={startedGame} text={"ROWS: " + rows} />
                            <Display startedGame={startedGame} text={"SCORE: " + score} />
                        </div>
                    }
                    <StartButton startedGame={startedGame} callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}
