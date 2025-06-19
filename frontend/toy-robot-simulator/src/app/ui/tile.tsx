import { Box } from "@mui/material"
import Image from 'next/image'
import empty from '../assets/empty.png'
import robotDown from '../assets/robot-down.png'
import robotLeft from '../assets/robot-left.png'
import robotRight from '../assets/robot-right.png'
import robotUp from '../assets/robot-up.png'

interface TileProps {
  details: {
    isEmpty: boolean,
    isFaceLeft: boolean,
    isFaceRight: boolean,
    isFaceUp: boolean,
    isFaceDown: boolean
  }
}

export function Tile({ details }: TileProps) {

  const renderTile = () => {
    if (details.isEmpty) {
      return (
        <Image
          src={empty}
          width={50}
          height={50}
          alt="empty tile"
        />
      )
    } else if (details.isFaceLeft) {
      return (
        <Image
          src={robotLeft}
          width={50}
          height={50}
          alt="robot facing left"
        />
      )
    } else if (details.isFaceRight) {
      return (
        <Image
          src={robotRight}
          width={50}
          height={50}
          alt="robot facing right"
        />
      )
    } else if (details.isFaceDown) {
      return (
        <Image
          src={robotDown}
          width={50}
          height={50}
          alt="robot facing down"
        />
      )
    } else if (details.isFaceUp) {
      return (
        <Image
          src={robotUp}
          width={50}
          height={50}
          alt="robot facing up"
        />
      )
    }
  }

  return (
    <Box
      bgcolor="#3f403f"
      height="6rem"
      width="6rem"
      border="1px"
      borderColor="#b3b3b3"
    >
      {renderTile()}
    </Box>
  )
}