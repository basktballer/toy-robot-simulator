'use client'

import { Box, Grid, Typography } from '@mui/material'
import { Stack, Button } from "@mui/material"
import { moveRobot, placeRobot, rotateRobot } from '../api/helpers'
import { Tile } from './tile'
import { useState } from 'react'
import { Tabletop } from './tabletop'

interface BoardProps {
  initialRobot: { x: number, y: number, facing: string, robotId: string }
}

export default function Board(
  { initialRobot }: BoardProps
) {
  console.log('initialrobot', initialRobot)
  const [robot, setRobot] = useState(initialRobot)


  const rotateAndUpdate = async (direction: string) => {
    const updatedRobot = await rotateRobot(robot.robotId, direction, robot.facing)
    console.log('rotated', updatedRobot)
    setRobot(updatedRobot)
  }

  const placeAndUpdate = async (x: number, y: number) => {
    const updatedRobot = await placeRobot(x, y)
    console.log('placed', updatedRobot)
    setRobot(updatedRobot)
  }

  const moveAndUpdate = async () => {
    const updatedRobot = await moveRobot(robot.robotId, robot.facing)
    console.log('moved', updatedRobot)
    setRobot(updatedRobot)
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="300px"
      flexDirection="column"
    >
      <Tabletop />
      <Typography>{robot.x}</Typography>
      <Typography>{robot.y}</Typography>
      <Typography>{robot.facing}</Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant='contained'
          onClick={() => placeAndUpdate(0,0)}
          >
          Place Robot
        </Button>
        <Button
          variant='contained'
          onClick={() => rotateAndUpdate('left')}
          >
          Left
        </Button>
        <Button
          variant='contained'
          onClick={() => moveAndUpdate()}
          >
          Move
        </Button>
        <Button
          variant='contained'
          onClick={() => rotateAndUpdate('right')}
          >
          Right
        </Button>
      </Stack>
    </Box>
  )
}