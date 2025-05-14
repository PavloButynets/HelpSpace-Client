import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

export const styles = {
  starContainer: {
    display: 'flex',
    cursor: 'pointer'
  }
}

interface StarRatingProps {
  rating: number
  onRatingChange: (newRating: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index)
  }

  const handleMouseLeave = () => {
    setHoveredRating(null)
  }

  const handleClick = (index: number) => {
    onRatingChange(index)
  }

  return (
    <Box sx={styles.starContainer}>
      {Array.from({ length: 5 }, (_, index) => {
        const starRating = index + 1
        return (
          <IconButton
            key={starRating}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
          >
            {hoveredRating !== null && hoveredRating >= starRating ? (
              <StarIcon color='primary' />
            ) : rating >= starRating ? (
              <StarIcon color='primary' />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        )
      })}
    </Box>
  )
}

export default StarRating
