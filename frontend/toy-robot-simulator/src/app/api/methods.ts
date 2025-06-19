import { Robot } from "../models/robot"

export async function placeRobot(x: number, y: number): Promise<Robot> {
  console.log('placing robot')
  const resp = await fetch('http://localhost:4000/robot/place', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      x,
      y,
    })
  })
  const parseresp = await resp.json()
  console.log('placed robot successfully', parseresp)
  return parseresp
}

export async function rotateRobot(robotId: string, direction: string, facing: string): Promise<Robot> {
  console.log('rotating robot')
  const resp = await fetch('http://localhost:4000/robot/rotate', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      robotId: robotId,
      direction: direction,
      facing: facing
    })
  })
  const parseresp = await resp.json()
  console.log('rotated robot successfully',parseresp)
  return parseresp
}

export async function moveRobot(robotId: string, facing: string): Promise<Robot>{
  console.log('moving robot')
  const resp = await fetch('http://localhost:4000/robot/move', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      robotId: robotId,
      facing: facing
    })
  })
  const parseresp = await resp.json()
  console.log('moved robot successfully', parseresp)
  return parseresp
}

export async function initialize(): Promise<Robot|undefined> {
  console.log('initializing, getting last position')
  const resp = await fetch('http://localhost:4000/robot/position', {
    method: 'GET',
    cache: "no-store"
  })
  
  // TODO: revisit this error, resp is empty both when data retrieved and when undefined returned
  // as a result, for a new game, it errors out 
  try {
    const parseresp = await resp.json()
    console.log('initialized - last position retrieved', parseresp)
    return parseresp
  } catch (e) {
    console.debug('swallowing error', e)
    return undefined
  }
}