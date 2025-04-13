import React from 'react'
import { Box, Typography } from '@mui/material'
import PageWrapper from '~/containers/page-wrapper/PageWrapper'
import { getFormattedDate } from '~/utils/helper-functions'
import defaultEventImage from '~/assets/img/default-event-image.png'
export const styles = {
  heroContainer: {
    width: '100%',
    height: { xs: '350px', sm: '350px', md: '300px' },
    position: 'relative',
    overflow: 'hidden',
    borderRadius: { xs: '0 0 32px 32px', md: '40px' },
    boxShadow: '0 8px 32px rgba(75, 191, 141, 0.15)'
  },
  heroBackground: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    transition: 'transform 0.3s ease-out',
    '&:hover': {
      transform: 'scale(1.03)'
    }
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(180deg, rgba(75, 191, 141, 0.01) 0%, rgba(27, 38, 44, 1) 100%)',
    display: 'flex',
    alignItems: 'flex-end'
  },
  heroContent: {
    padding: { xs: '2.5rem', md: '3.5rem' },
    color: 'white',
    width: '100%',
    position: 'relative',
    zIndex: 2
  },
  title: {
    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
    margin: '0.75rem 0',
    textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.02em'
  },
  metaInfo: {
    display: 'flex',
    gap: { xs: '1rem', md: '2rem' },
    marginTop: '1.25rem',
    flexDirection: { xs: 'column', sm: 'row' },
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: { xs: '1rem', md: '1.1rem' },
    background: 'rgba(75, 191, 141, 0.15)',
    backdropFilter: 'blur(8px)',
    padding: '0.75rem 1.25rem',
    borderRadius: '16px',
    border: '1px solid rgba(75, 191, 141, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(75, 191, 141, 0.25)',
      transform: 'translateY(-2px)'
    }
  },
  statusBadge: (status: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.75rem 1.5rem',
    borderRadius: '20px',
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
    backgroundColor:
      status === 'upcoming'
        ? 'rgba(75, 191, 141, 0.9)'
        : status === 'active'
          ? 'rgba(75, 191, 141, 0.95)'
          : 'rgba(75, 191, 141, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 16px rgba(75, 191, 141, 0.2)',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(75, 191, 141, 0.3)'
    }
  })
}
interface EventHeroProps {
  title: string
  coverImage?: string
  date: string
  city: string
  status: string
}

const EventHero: React.FC<EventHeroProps> = ({
  title,
  coverImage,
  date,
  city,
  status
}) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'Майбутня подія'
      case 'UPCOMING':
        return 'Активна подія'
      case 'COMPLETED':
        return 'Завершена подія'
      default:
        return status
    }
  }

  return (
    <PageWrapper>
      <Box sx={styles.heroContainer}>
        <Box
          sx={{
            ...styles.heroBackground,
            backgroundImage: `url(${coverImage || defaultEventImage})`
          }}
        >
          <Box sx={styles.heroOverlay}>
            <Box sx={styles.heroContent}>
              <Box sx={styles.statusBadge(status)}>
                {getStatusLabel(status)}
              </Box>
              <Typography sx={styles.title} variant='h1'>
                {title}
              </Typography>
              <Box sx={styles.metaInfo}>
                <Box sx={styles.metaItem}>
                  <i className='icon-calendar'></i>
                  <Typography component='span'>
                    {getFormattedDate({ date })}
                  </Typography>
                </Box>
                <Box sx={styles.metaItem}>
                  <i className='icon-location'></i>
                  <Typography component='span'>{city}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EventHero
