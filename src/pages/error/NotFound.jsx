import React from 'react'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Error as ErrorIcon, Home as HomeIcon } from '@mui/icons-material'
import PageWrapper from '~/containers/page-wrapper/PageWrapper'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          padding: 3,
          textAlign: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: 500,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          <Typography variant='h4' gutterBottom fontWeight='bold'>
            404
          </Typography>
          <Typography variant='h5' gutterBottom>
            Сторінку не знайдено
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
            Вибачте, сторінку, яку ви шукаєте, не існує або її було переміщено.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
            >
              На головну
            </Button>
            <Button variant='outlined' onClick={() => navigate(-1)}>
              Назад
            </Button>
          </Box>
        </Paper>
      </Box>
    </PageWrapper>
  )
}

export default NotFound
