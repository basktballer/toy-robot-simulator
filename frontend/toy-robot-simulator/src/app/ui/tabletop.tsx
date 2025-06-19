import { Grid, Table, TableBody, TableCell, TableRow } from "@mui/material"
import { Tile } from "./tile"

export function Tabletop() {

  const generateGrid = (width = 5, height = 5) => {
    const result = []
    for (let i = 0; i < height; i++) {
      const row = []
      for (let j = 0; j < width; j++) {
        row.push({
          isEmpty: false,
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

  const grid = generateGrid()

  return (
    <Table>
      <TableBody>
        {grid.map((row, rowIndex) => {
          const rowMap = row.map((col, colIndex) => {
            return (
              <TableCell onClick={() => {console.log(`x ${colIndex}, y: ${rowIndex}`)}} key={`tablecell-${rowIndex}-${colIndex}`}>
                <Tile details={grid[colIndex][rowIndex]} />
              </TableCell>
            )
          })
          
          return <TableRow>{rowMap}</TableRow>
        }).reverse()}
      </TableBody>
    </Table>
  )
}