

export async function placeRobot(x: number, y: number) {
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
  console.log('data', resp, parseresp)
  return parseresp
}

export async function rotateRobot(robotId: string, direction: string, facing: string) {
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
  console.log('data', resp, parseresp)
  return parseresp
}

export async function moveRobot(robotId: string, facing: string) {
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
  console.log('data', resp, parseresp)
  return parseresp
}

export async function initialize() {
  const resp = await fetch('http://localhost:4000/robot/position', {
    method: 'GET',
    cache: "no-store"
  })
  const parseresp = await resp.json()
  if (isEmpty(parseresp)) {
    return {
      x: 0,
      y: 0,
      facing: 'north'
    }
  }
  return parseresp
}

function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0
}