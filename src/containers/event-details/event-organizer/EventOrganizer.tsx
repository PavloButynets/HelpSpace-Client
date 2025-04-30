import React from 'react'
import { Box, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import UserAvatar from '~scss-components/user-avatar/UserAvatar'
import { Link } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { createUrlPath } from '~/utils/helper-functions'
import { tr } from 'date-fns/locale'

export const styles = {
  organizerContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '2rem'
  },
  organizerTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1.5rem'
  },
  organizerContent: {
    display: 'flex',
    gap: '1.5rem',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'center', sm: 'flex-start' },
    textAlign: { xs: 'center', sm: 'left' }
  },
  organizerLogo: {
    width: '100px',
    height: '100px',
    borderRadius: '8px'
  },
  organizerInfo: {
    flex: 1
  },
  organizerName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  organizerDescription: {
    marginBottom: '1rem',
    color: '#444',
    lineHeight: 1.5
  },
  organizerContact: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#3498db',
    justifyContent: { xs: 'center', sm: 'flex-start' }
  },
  link: { textDecoration: 'none' }

}

interface OrganizerProps {
  organizer: {
    id: string
    firstName: string
    lastName: string
    photo?: string
    email: string
  }
}

const EventOrganizer: React.FC<OrganizerProps> = ({ organizer }) => {
  const userURL = createUrlPath(authRoutes.userProfile.path, organizer.id)

  return (
    <Box sx={styles.organizerContainer}>
      <Typography sx={styles.organizerTitle} variant='h3'>
        Організатор
      </Typography>

      <Box sx={styles.organizerContent}>
      <Link style={styles.link} to={userURL}>

        <UserAvatar
          firstName={organizer.firstName}
          lastName={organizer.lastName}
          src={organizer.photo}
          sx={styles.organizerLogo}
          variant={'photo'}
        />
      </Link>
        <Box sx={styles.organizerInfo}>
          <Link style={styles.link} to={userURL}>
            <Typography
              color={'textPrimary'}
              sx={styles.organizerName}
            >
              { `${organizer.firstName} ${organizer.lastName}` }
            </Typography>
          </Link>
          <Box sx={styles.organizerContact}>
            <EmailIcon />
            <Typography component='span'>{organizer.email}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default EventOrganizer
