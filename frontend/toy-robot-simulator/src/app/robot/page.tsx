import * as React from 'react';
import { initialize } from '../api/methods';
import { Box, Typography } from '@mui/material';
import BoardContainer from '../ui/board-container';

export default async function RobotPage() {
  const initialRobot = await initialize()

  return (
    <Box
      display="flex"
      marginTop="4rem"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        bgcolor="#364242"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        borderRadius="12px"
        paddingY="1rem"
        marginBottom="3rem"
        width="600px"
      >
        <Typography fontWeight="bold">Click to place the robot, use the buttons or arrows to move</Typography>
      </Box>
      <BoardContainer initialRobot={initialRobot} />
    </Box>
  )
}
