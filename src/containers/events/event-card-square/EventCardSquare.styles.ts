import { Typography } from '@mui/material'
import { ellipsisTextStyle } from '~/utils/helper-functions'

export const styles = {
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    height: 'auto',
    flexDirection: 'column',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'basic.white',
    borderRadius: '8px',
    boxShadow: 1
  },
  locationIcon: {
    typography: 'midTitle'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  userInfo: {
    root: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: '12px'
    },
    avatar: {
      height: '32px',
      width: '32px'
    },
    info: {
      gap: '4px'
    }
  },
  description: {
    ...ellipsisTextStyle(2),
    typography: 'midTitle',
    fontWeight: 600,
    color: 'primary.700',
    wordBreak: 'break-word'
  },
  iconButton: {
    color: 'basic.black',
    position: 'absolute',
    top: '8px',
    right: '8px'
  },

  titleWithDescription: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      typography: 'h6'
    },
    description: {
      typography: 'caption'
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  eventPhoto: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  categories: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(4px)',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  // New styles added:
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    mx: 1,
    my: 1.5,
    padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
  },
  infoRow: {
    display: 'flex', 
    alignItems: 'center', 
    color: 'primary.400',
    gap: 1
  },
  locationText: {
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'text.secondary',
    Typography: 'body2',
    flexGrow: 1,
  },
  calendarIcon: {
    color: 'primary.main',
    fontSize: '1.1rem'
  },
  dateText: {
    fontSize: '0.85rem', 
    fontWeight: 500,
    color: 'primary.main',
  },
  categoryChip: {
    height: '22px',
    fontSize: '0.7rem',
    fontWeight: 'medium',
    textTransform: 'capitalize',
  }
}