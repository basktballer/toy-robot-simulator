'use client'

import { Box, Typography } from '@mui/material'
import { Stack, Button } from "@mui/material"
import { initialize, moveRobot, placeRobot, rotateRobot } from '../api/methods'
import { useState, useEffect } from 'react'
import { Table } from './table'
import { Robot } from '../models/robot'

interface BoardProps {
  initialRobot: Robot
}

export default function Board(
  { initialRobot }: BoardProps
) {
  const [robot, setRobot] = useState<Robot>(initialRobot)
  const [keyPressCode, setKeyPressCode] = useState(0)
  const [reportToggle, setReportToggle] = useState(false)

  useEffect(() => {
    function handleKeyDown(e) {
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

  const toggleReport = () => {
    setReportToggle(!reportToggle)
    initialize()
  }
  
  const upHandler = () => {
    if (robot.facing === 'north') {
      moveAndUpdate()
    } else if (robot.facing === 'east') {
      rotateAndUpdate('left')
    } else {
      // west and south (default right)
      rotateAndUpdate('right')
    }
  }

  const rightHandler = () => {
    if (robot.facing === 'east') {
      moveAndUpdate()
    } else if (robot.facing === 'south') {
      rotateAndUpdate('left')
    } else {
      // north and west (default right)
      rotateAndUpdate('right')
    }
  }
  
  const leftHandler = () => {
    if (robot.facing === 'west') {
      moveAndUpdate()
    } else if (robot.facing === 'north') {
      rotateAndUpdate('left')
    } else {
      // south and east (default right)
      rotateAndUpdate('right')
    }
  }

  const downHandler = () => {
    if (robot.facing === 'south') {
      moveAndUpdate()
    } else if (robot.facing === 'west') {
      rotateAndUpdate('left')
    } else {
      // east and north (default right)
      rotateAndUpdate('right')
    }
  }

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
      // width="300px"
      flexDirection="column"
    >
      <Table robot={robot} placeFunction={placeAndUpdate} />
      {/* <Typography>{robot.x}</Typography>
      <Typography>{robot.y}</Typography>
      <Typography>{robot.facing}</Typography> */}
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
            <Typography>{`x: ${robot.x}`}</Typography>
            <Typography>{`y: ${robot.y}`}</Typography>
            <Typography>{`facing: ${robot.facing}`}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}