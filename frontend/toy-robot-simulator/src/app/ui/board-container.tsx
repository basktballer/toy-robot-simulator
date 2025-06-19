'use client'

import { Box, Typography } from '@mui/material'
import { Stack, Button } from "@mui/material"
import { initialize, moveRobot, placeRobot, rotateRobot } from '../api/methods'
import { useState, useEffect } from 'react'
import { RobotBoard } from './robot-board'
import { Robot } from '../models/robot'

interface BoardContainerProps {
  initialRobot?: Robot
}

export default function BoardContainer(
  { initialRobot }: BoardContainerProps
) {
  const [robot, setRobot] = useState<Robot|undefined>(initialRobot)
  const [keyPressCode, setKeyPressCode] = useState(0)
  const [reportToggle, setReportToggle] = useState(false)

  // keyboard event listeners
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // only action for arrow keys
      if (e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 40) {
        setKeyPressCode(e.keyCode)
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // keyboard effects
  useEffect(() => {
    if (keyPressCode === 38) {
      // up key
      upHandler()
      setKeyPressCode(0)
    }
    if (keyPressCode === 39) {
      // right key
      rightHandler()
      setKeyPressCode(0)
    }
    if (keyPressCode === 37) {
      // left key
      leftHandler()
      setKeyPressCode(0)
    }
    if (keyPressCode === 40) {
      // down key
      downHandler()
      setKeyPressCode(0)
    }
  }, [keyPressCode])

  // helpers
  const toggleReport = () => {
    setReportToggle(!reportToggle)
    initialize()
  }

  // robot state update utils
  const upHandler = () => {
    if (robot) {
      if (robot.facing === 'north') {
        moveAndUpdate()
      } else if (robot.facing === 'east') {
        rotateAndUpdate('left')
      } else {
        // west and south (default right)
        rotateAndUpdate('right')
      }
    }
  }

  const rightHandler = () => {
    if (robot) {
      if (robot.facing === 'east') {
        moveAndUpdate()
      } else if (robot.facing === 'south') {
        rotateAndUpdate('left')
      } else {
        // north and west (default right)
        rotateAndUpdate('right')
      }
    }
  }
  
  const leftHandler = () => {
    if (robot) {
      if (robot.facing === 'west') {
        moveAndUpdate()
      } else if (robot.facing === 'north') {
        rotateAndUpdate('left')
      } else {
        // south and east (default right)
        rotateAndUpdate('right')
      }
    }
  }

  const downHandler = () => {
    if (robot) {
      if (robot.facing === 'south') {
        moveAndUpdate()
      } else if (robot.facing === 'west') {
        rotateAndUpdate('left')
      } else {
        // east and north (default right)
        rotateAndUpdate('right')
      }
    }
  }

  const rotateAndUpdate = async (direction: string) => {
    if (robot) {
      const updatedRobot = await rotateRobot(robot.robotId, direction, robot.facing)
      setRobot(updatedRobot)
    }
  }

  const placeAndUpdate = async (x: number, y: number) => {
    const updatedRobot = await placeRobot(x, y)
    setRobot(updatedRobot)
  }

  const moveAndUpdate = async () => {
    if (robot) {
      const updatedRobot = await moveRobot(robot.robotId, robot.facing)
      setRobot(updatedRobot)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // width="300px"
      flexDirection="column"
    >
      <RobotBoard robot={robot} placeFunction={placeAndUpdate} />
      <Stack marginY="2rem" direction="row" spacing={2}>
        <Button
          sx={{
            bgcolor: '#28b5b5',
            color: '#000000',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '100px'
          }}
          variant='contained'
          onClick={() => rotateAndUpdate('left')}
        >
          Left
        </Button>
        <Button
          sx={{
            bgcolor: '#28b5b5',
            color: '#000000',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '100px'
          }}
          variant='contained'
          onClick={() => moveAndUpdate()}
        >
          Move
        </Button>
        <Button
          sx={{
            bgcolor: '#28b5b5',
            color: '#000000',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '100px'
          }}
          variant='contained'
          onClick={() => rotateAndUpdate('right')}
        >
          Right
        </Button>
      </Stack>
      <Box>
        <Button
          variant='outlined'
          onClick={() => toggleReport()}
          sx={{
            borderColor: '#28b5b5',
            bgcolor: '#364242',
            color: '#FFFFFF',
            fontWeight: 'bold',
            textTransform: 'none',
            width: '200px'
          }}
        >
          {reportToggle ? 'Hide Report' : 'Report'}
        </Button>
        {reportToggle && (
          <Box
            marginTop="1rem"
            padding="0.5rem"
            bgcolor="#364242"
            border="1px"
            borderColor="#b3b3b3"
          >
            <Typography fontWeight="bold" align='center'>Report</Typography>
            <Typography>{`x: ${robot ? robot.x : 'Not yet placed'}`}</Typography>
            <Typography>{`y: ${robot ? robot.y : 'Not yet placed'}`}</Typography>
            <Typography>{`facing: ${robot ? robot.facing : 'Not yet placed'}`}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}