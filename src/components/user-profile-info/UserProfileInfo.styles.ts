import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: 0
  },
  left: {
    marginTop: '8px',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    '& > div': {
      flex: '1 1 auto',
      minWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px',
      '& > a': {
        maxWidth: 'fit-content',
        minWidth: 0,
        '& > p': {
          whiteSpace: 'nowrap',

        }
      }
    }
  },
  top: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    height: '48px',
    width: '48px',
    '&:hover': {
      transform: 'scale(1.1)'
    },
    fontSize: {
      xs: '20px',
      md: '16px'
    }
  },
  active: {
    width: '12px',
    height: '12px',
    backgroundColor: 'basic.lime',
    border: '3px solid',
    borderColor: 'basic.white',
    borderRadius: '50%'
  },
  name: {
    color: 'primary.500',
    typography: TypographyVariantEnum.Button,
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: palette.text.disabled
    }
  },
  rating: {
    backgroundColor: 'primary.50'
  },
  reviews: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.500'
  },
  date: {
    typography: TypographyVariantEnum.Body2,
    color: 'primary.400'
  },
  link: { textDecoration: 'none' }
}
