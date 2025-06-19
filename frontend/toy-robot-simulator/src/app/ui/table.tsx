import { Table as MuiTable, TableBody, TableCell, TableRow } from "@mui/material"
import { Tile } from "./tile"
import { useEffect, useMemo, useState } from "react"
import { Robot } from "../models/robot"

export interface TileDetails {
  isFaceLeft: boolean,
  isFaceRight: boolean,
  isFaceUp: boolean,
  isFaceDown: boolean
}

export interface TableProps {
  robot: Robot
  placeFunction: (x: number, y: number) => void
}

export function Table(props: TableProps) {

  // initialize grid
  const grid = useMemo(() => {
    return generateGrid()
  }, [])
  
  const { robot, placeFunction } = props
  const [gridState, setGridState] = useState<Array<Array<TileDetails>>>([...grid])
  const [currentRobot, setCurrentRobot] = useState<Robot>()

  useEffect(() => {
    if (gridState.length === 0) {
      return
    }
    if (currentRobot) {
      clearCell(gridState, currentRobot.x, currentRobot.y)
    }
    if (robot.facing === 'north') {
      toggleUp(gridState, robot.x, robot.y)
    }
    if (robot.facing === 'south') {
      toggleDown(gridState, robot.x, robot.y)
    }
    if (robot.facing === 'east') {
      toggleRight(gridState, robot.x, robot.y)
    }
    if (robot.facing === 'west') {
      toggleLeft(gridState, robot.x, robot.y)
    }
    setCurrentRobot(robot)
  }, [robot])

  const clickCell = (colIndex: number, rowIndex: number) => {
    placeFunction(colIndex, rowIndex)
  }

  if (gridState.length === 0) {
    return null
  }

  return (
    <MuiTable>
      <TableBody>
        {gridState.map((row, rowIndex) => {
          const rowMap = row.map((col, colIndex) => {
            return (
              <TableCell 
                key={`tablecell-${rowIndex}-${colIndex}`}
                onClick={()=> clickCell(colIndex, rowIndex)}
                padding="none"
                sx={{
                  border: "2px solid",
                  borderColor: '#7a7a7a'
                }}
              >
                <Tile details={gridState[colIndex][rowIndex]} />
              </TableCell>
            )
          })
          return <TableRow key={`tablerow-${rowIndex}`}>{rowMap}</TableRow>
        }).reverse()}
      </TableBody>
    </MuiTable>
  )
}

// helpers
function generateGrid(width = 5, height = 5) {
  const result = []
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      row.push({
        isFaceLeft: false,
        isFaceRight: false,
        isFaceUp: false,
        isFaceDown: false
      })
    }
    result.push(row)
  }
  return result
}
function toggleRight(grid: Array<Array<TileDetails>>, x: number, y: number) {
  grid[x][y].isFaceRight = !grid[x][y].isFaceRight
}
function toggleLeft(grid: Array<Array<TileDetails>>, x: number, y: number) {
  grid[x][y].isFaceLeft = !grid[x][y].isFaceLeft
}
function toggleUp(grid: Array<Array<TileDetails>>, x: number, y: number) {
  grid[x][y].isFaceUp = !grid[x][y].isFaceUp
}
function toggleDown(grid: Array<Array<TileDetails>>, x: number, y: number) {
  grid[x][y].isFaceDown = !grid[x][y].isFaceDown
}
function clearCell(grid: Array<Array<TileDetails>>, x: number, y: number) {
  grid[x][y].isFaceDown = false
  grid[x][y].isFaceLeft = false
  grid[x][y].isFaceRight = false
  grid[x][y].isFaceUp = false
}