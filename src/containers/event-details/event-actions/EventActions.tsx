import React from 'react'
import { Box, Typography, Paper, Button, alpha } from '@mui/material'
import { getFormattedDate } from '~/utils/helper-functions'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkIcon from '@mui/icons-material/Bookmark'

export const styles = {
  actionsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    boxShadow: '0px 8px 30px rgba(34, 51, 84, 0.1)',
    border: '1px solid rgba(75, 191, 141, 0.12)'
  },
  registrationInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1.25rem',
    padding: '1rem',
    backgroundColor: 'rgba(75, 191, 141, 0.05)',
    borderRadius: '12px'
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    '& .label': {
      fontSize: '0.9rem',
      color: '#5B7282'
    },
    '& .value': {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#1B262C'
    }
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  primaryButton: {
    fontSize: '1.05rem',
    padding: '0.9rem',
    borderRadius: '12px',
    fontWeight: 600
  },
  secondaryActions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    borderRadius: '10px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  shareButton: {
    backgroundColor: alpha('#4BBF8D', 0.15),
    color: '#4BBF8D',
    '&:hover': {
      backgroundColor: alpha('#4BBF8D', 0.25)
    }
  },
  saveButton: {
    backgroundColor: alpha('#3E7BFA', 0.15),
    color: '#3E7BFA',
    '&:hover': {
      backgroundColor: alpha('#3E7BFA', 0.25)
    }
  }
}

interface EventActionsProps {
  onRegister: () => void
  isRegistering: boolean
  deadline: string
  slots: number
  participants: number
  isUserJoined?: boolean
  isCreator?: boolean
  applicationStatus?: string
}

const EventActions: React.FC<EventActionsProps> = ({
  onRegister,
  isRegistering,
  deadline,
  slots,
  participants,
  isUserJoined = false,
  isCreator = false,
  applicationStatus
}) => {
  const availableSlots = slots - participants
  const isRegistrationOpen = new Date(deadline) > new Date()

  const getButtonText = () => {
    if (isRegistering) return 'Реєстрація...'
    if (isCreator) return 'Ви організатор події'
    if (isUserJoined) {
      switch (applicationStatus) {
        case 'PENDING':
          return 'Заявка на розгляді'
        case 'ACCEPTED':
          return 'Ви зареєстровані'
        case 'REJECTED':
          return 'Заявка відхилена'
        default:
          return 'Ви приєднались'
      }
    }
    return 'Зареєструватися як волонтер'
  }
  return (
    <Paper elevation={0} sx={styles.actionsContainer}>
      <Box sx={styles.registrationInfo}>
        <Box sx={styles.infoItem}>
          <Typography className='label'>Доступно місць</Typography>
          <Typography className='value'>
            {availableSlots > 0 ? availableSlots : 'Немає місць'}
          </Typography>
        </Box>
        <Box sx={styles.infoItem}>
          <Typography className='label'>Реєстрація відкрита до</Typography>
          <Typography className='value'>
            {getFormattedDate({ date: deadline })}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.actionButtons}>
        <Button
          variant='contained'
          size='large'
          onClick={onRegister}
          disabled={
            !isRegistrationOpen ||
            availableSlots <= 0 ||
            isRegistering ||
            isUserJoined ||
            isCreator
          }
          loading={isRegistering}
          fullWidth
          sx={styles.primaryButton}
        >
          {getButtonText()}
        </Button>

        <Box sx={styles.secondaryActions}>
          <Button
            variant='text'
            sx={{ ...styles.secondaryButton, ...styles.shareButton }}
            fullWidth
          >
            <ShareIcon fontSize='small' />
            Поділитися
          </Button>
          <Button
            variant='text'
            sx={{ ...styles.secondaryButton, ...styles.saveButton }}
            fullWidth
          >
            <BookmarkIcon fontSize='small' />
            Зберегти
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default EventActions
