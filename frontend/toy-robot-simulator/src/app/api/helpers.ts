

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
  const respmessage = await resp.json()
  console.log('data', resp, respmessage)
  return respmessage
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
  const respmessage = await resp.json()
  console.log('data', resp, respmessage)
  return respmessage
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
  const respmessage = await resp.json()
  console.log('data', resp, respmessage)
  return respmessage
}

export async function initialize() {
  const resp = await fetch('http://localhost:4000/robot/position', {
    cache: "no-cache"
  })
  if (isEmpty(resp)) {
    // return null
    return {
      x: 0,
      y: 0,
      facing: 'north'
    }
  }
  const respmessage = await resp.json()
  return respmessage
}

function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0
}