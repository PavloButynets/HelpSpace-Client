import React, { useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  alpha
} from '@mui/material'
import { AccessTime, LocationOn, CalendarMonth } from '@mui/icons-material'
import PageWrapper from '~/containers/page-wrapper/PageWrapper'
import { getFormattedDate } from '~/utils/helper-functions'
import defaultEventImage from '~/assets/img/default-event-image.png'

export const styles = {
  section: {
    position: 'relative',
    padding: { xs: '3rem 0', md: '5rem 0 7rem' },
    backgroundColor: '#F5F7FA',
    overflow: 'hidden'
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg, rgba(75, 191, 141, 0.15), rgba(75, 191, 141, 0.05))',
    width: '400px',
    height: '400px',
    top: '-200px',
    left: '-100px',
    zIndex: 0
  },
  decorativeLine: {
    position: 'absolute',
    width: '100%',
    height: '3px',
    background:
      'linear-gradient(90deg, rgba(75, 191, 141, 0), rgba(75, 191, 141, 0.3), rgba(75, 191, 141, 0))',
    bottom: '120px',
    left: 0,
    zIndex: 0
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1
  },
  contentContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 4, md: 6 },
    alignItems: { xs: 'flex-start', md: 'center' }
  },
  imageWrapper: {
    position: 'relative',
    width: { xs: '100%', md: '45%' },
    order: { xs: 1, md: 2 }
  },
  mainImage: {
    width: '100%',
    height: { xs: '280px', md: '420px' },
    objectFit: 'cover',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(34, 51, 84, 0.15)',
    transform: 'perspective(1000px) rotateY(-5deg)',
    transition: 'all 0.5s ease-in-out',
    '&:hover': {
      transform: 'perspective(1000px) rotateY(-2deg) translateY(-5px)',
      boxShadow: '0 30px 70px rgba(34, 51, 84, 0.2)'
    },
    filter: 'contrast(1.05) brightness(1.02)'
  },
  imageBadge: {
    position: 'absolute',
    bottom: { xs: '-15px', md: '-25px' },
    right: { xs: '10px', md: '-25px' },
    height: { xs: '85px', md: '110px' },
    width: { xs: '85px', md: '110px' },
    borderRadius: '50%',
    boxShadow: '0 10px 20px rgba(75, 191, 141, 0.3)',
    border: '4px solid white',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  badgeContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  contentBox: {
    width: { xs: '100%', md: '55%' },
    order: { xs: 2, md: 1 },
    position: 'relative'
  },
  statusBadge: (status: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    py: '0.65rem',
    px: '1.5rem',
    borderRadius: '30px',
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    letterSpacing: '0.06em',
    mb: 3,
    backgroundColor: alpha(
      status === 'NEW'
        ? '#4BBF8D'
        : status === 'UPCOMING'
          ? '#3E7BFA'
          : '#808080',
      0.95
    ),
    color: 'white',
    boxShadow: `0 8px 20px ${alpha(
      status === 'NEW'
        ? '#4BBF8D'
        : status === 'UPCOMING'
          ? '#3E7BFA'
          : '#808080',
      0.25
    )}`,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      right: '-10px',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      backgroundColor: 'inherit',
      borderRadius: '4px',
      zIndex: -1,
      rotate: '45deg'
    }
  }),
  title: {
    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    background: 'linear-gradient(135deg, #1B262C 0%, #3A4A55 100%)',
    backgroundClip: 'text',
    color: 'transparent',
    mb: { xs: 3, md: 4 },
    maxWidth: '95%',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-15px',
      left: '0',
      width: '80px',
      height: '6px',
      borderRadius: '3px',
      background: 'linear-gradient(90deg, #4BBF8D, rgba(75, 191, 141, 0.3))'
    }
  },
  infoCards: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
    gap: 3,
    mt: 5,
    mb: 4,
    position: 'relative'
  },
  infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    p: '1rem 1.5rem',
    borderRadius: '16px',
    backgroundColor: 'white',
    boxShadow: '0 10px 30px rgba(34, 51, 84, 0.07)',
    border: '1px solid rgba(75, 191, 141, 0.1)',
    transition: 'all 0.25s ease',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 15px 35px rgba(34, 51, 84, 0.1)',
      borderColor: 'rgba(75, 191, 141, 0.3)'
    }
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: 'rgba(75, 191, 141, 0.1)',
    color: '#4BBF8D'
  },
  infoText: {
    flex: 1,
    '& .value': {
      fontWeight: 600,
      fontSize: '1.1rem',
      color: '#1B262C',
      display: 'block',
      mb: 0.5
    },
    '& .label': {
      color: '#5B7282',
      fontSize: '0.9rem'
    }
  },
  categoryChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1.5,
    mt: 2,
    '& .MuiChip-root': {
      borderRadius: '10px',
      height: '38px',
      fontSize: '0.9rem',
      fontWeight: 500,
      backgroundColor: 'rgba(75, 191, 141, 0.08)',
      border: '1px solid rgba(75, 191, 141, 0.15)',
      color: '#4BBF8D',
      transition: 'all 0.25s ease',
      '&:hover': {
        backgroundColor: 'rgba(75, 191, 141, 0.15)',
        transform: 'translateY(-2px)'
      }
    }
  }
}

interface EventHeroProps {
  title: string
  coverImage?: string
  date: string
  city: string
  status: string
  attendees?: number
  categories?: string[]
}

const EventHero: React.FC<EventHeroProps> = ({
  title,
  coverImage,
  date,
  city,
  status,
  attendees = 0,
  categories = ['Волонтерство', 'Спільнота', 'Екологія']
}) => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imgRef.current) return

      const { left, top, width, height } =
        imgRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      imgRef.current.style.transform = `perspective(1000px) rotateY(${-x * 5}deg) rotateX(${y * 5}deg)`
    }

    const handleMouseLeave = () => {
      if (!imgRef.current) return
      imgRef.current.style.transform = 'perspective(1000px) rotateY(-5deg)'
    }

    const img = imgRef.current
    if (img) {
      img.addEventListener('mousemove', handleMouseMove)
      img.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (img) {
        img.removeEventListener('mousemove', handleMouseMove)
        img.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return 'Майбутня подія'
      case 'ACTIVE':
        return 'Активна подія'
      case 'COMPLETED':
        return 'Завершена подія'
      default:
        return status
    }
  }

  const formattedDate = getFormattedDate({ date })
  const eventDate = new Date(date)
  const month = eventDate
    .toLocaleString('uk-UA', { month: 'short' })
    .toUpperCase()
  const day = eventDate.getDate()

  return (
    <Box sx={styles.section}>
      <Box sx={styles.decorativeCircle} />
      <Box sx={styles.decorativeLine} />

      <PageWrapper>
        <Container maxWidth='lg'>
          <Box sx={styles.contentWrapper}>
            <Box sx={styles.contentContainer}>
              <Box sx={styles.contentBox}>
                <Box sx={styles.statusBadge(status)}>
                  {getStatusLabel(status)}
                </Box>

                <Typography component='h1' sx={styles.title}>
                  {title}
                </Typography>

                <Box sx={styles.infoCards}>
                  <Paper sx={styles.infoCard}>
                    <Box sx={styles.iconWrapper}>
                      <CalendarMonth fontSize='medium' />
                    </Box>
                    <Box sx={styles.infoText}>
                      <Typography className='value'>{formattedDate}</Typography>
                      <Typography className='label'>Дата проведення</Typography>
                    </Box>
                  </Paper>

                  <Paper sx={styles.infoCard}>
                    <Box sx={styles.iconWrapper}>
                      <LocationOn fontSize='medium' />
                    </Box>
                    <Box sx={styles.infoText}>
                      <Typography className='value'>{city}</Typography>
                      <Typography className='label'>Локація</Typography>
                    </Box>
                  </Paper>

                  {attendees > 0 && (
                    <Paper sx={styles.infoCard}>
                      <Box sx={styles.iconWrapper}>
                        <AccessTime fontSize='medium' />
                      </Box>
                      <Box sx={styles.infoText}>
                        <Typography className='value'>{attendees}</Typography>
                        <Typography className='label'>Учасників</Typography>
                      </Box>
                    </Paper>
                  )}
                </Box>

                {categories && categories.length > 0 && (
                  <Box sx={styles.categoryChips}>
                    {categories.map((category, index) => (
                      <Chip key={index} label={category} />
                    ))}
                  </Box>
                )}
              </Box>

              <Box sx={styles.imageWrapper}>
                <Box
                  component='img'
                  ref={imgRef}
                  src={coverImage || defaultEventImage}
                  alt={title}
                  sx={styles.mainImage}
                />
                <Box sx={styles.imageBadge}>
                  <Box sx={styles.badgeContent}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        color: '#4BBF8D'
                      }}
                    >
                      {day}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', md: '0.9rem' },
                        color: '#5B7282'
                      }}
                    >
                      {month}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </PageWrapper>
    </Box>
  )
}

export default EventHero
