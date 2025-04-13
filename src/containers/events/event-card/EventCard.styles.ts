export const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: { sm: '24px', md: '40px' },
    flexWrap: 'wrap',
    wordBreak: 'break-word'
  },
  userInfo: {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px',
      maxWidth: '112px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      alignSelf: 'center',
      mb: '12px'
    },
  },
  eventPhoto: {
    width: 250,
    aspectRatio: '1',
    objectFit: 'cover',
    borderRadius: 2,
    marginLeft: 'auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}
