import { Box } from "@mui/material"
import Image from 'next/image'
import robotDown from '../assets/robot-down.png'
import robotLeft from '../assets/robot-left.png'
import robotRight from '../assets/robot-right.png'
import robotUp from '../assets/robot-up.png'
import { TileDetails } from "./table"

interface TileProps {
  details: TileDetails
}

export function Tile(props: TileProps) {

  const { details } = props
  const renderTile = () => {
    if (details.isFaceLeft) {
      return (
        <Image
          src={robotLeft}
          width={150}
          height={150}
          alt="robot facing left"
        />
      )
    } else if (details.isFaceRight) {
      return (
        <Image
          src={robotRight}
          width={150}
          height={150}
          alt="robot facing right"
        />
      )
    } else if (details.isFaceDown) {
      return (
        <Image
          src={robotDown}
          width={150}
          height={150}
          alt="robot facing down"
        />
      )
    } else if (details.isFaceUp) {
      return (
        <Image
          src={robotUp}
          width={150}
          height={150}
          alt="robot facing up"
        />
      )
    }
  }

  return (
    <Box
      bgcolor="#364242"
      height="6rem"
      width="6rem"
      border="1px"
      borderColor="#b3b3b3"
    >
      {renderTile()}
    </Box>
  )
}