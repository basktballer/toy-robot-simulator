import * as React from 'react';
import { initialize } from '../api/helpers';
import { Box, Grid, Typography } from '@mui/material';
import Board from '../ui/board';
import { Suspense } from 'react';

export default async function RobotPage() {
  const initialRobot = await initialize()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box
            bgcolor="#3f403f"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            borderRadius="4px"
            paddingY="1rem"
          >
            <Typography>Click to place the robot, use the buttons or arrows to move</Typography>
          </Box>
        </Grid>
        <Grid>
          <Suspense fallback={<Loading />}>
            <Board initialRobot={initialRobot} />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}

function Loading() {
  return <h2>Loading...</h2>
}