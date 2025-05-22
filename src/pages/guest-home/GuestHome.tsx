// Оновлений код GuestHome.tsx без футера та з перенаправленням на логін

import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
  Paper,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  IconButton,
  Fade,
  Grow,
  Slide
} from '@mui/material'
import Grid from '@mui/material/GridLegacy'
import {
  Search,
  VolunteerActivism,
  Handshake,
  AccessTime,
  MapOutlined,
  Message,
  ArrowForward,
  PersonOutlined,
  BusinessOutlined,
  KeyboardArrowDown,
  StarOutlined,
  CheckCircleOutline,
  Favorite
} from '@mui/icons-material'

import LoginDialog from '~/containers/auth/login-dialog/LoginDialog'
import { useModalContext } from '~/context/modal-context'
import EmailConfirmModal from '~/containers/auth/email-confirm-modal/EmailConfirmModal'

// Стилізовані компоненти
import { styled } from '@mui/material/styles'

const HeroButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '12px 30px',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0,118,255,0.39)',
    transform: 'translateY(-1px)'
  }
}))

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
}))

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}))

const CategoryChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '16px',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }
}))

const TestimonialCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  height: '100%',
  position: 'relative',
  '&::before': {
    content: '"""',
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '5rem',
    color: theme.palette.grey[200],
    fontFamily: 'serif',
    opacity: 0.5,
    lineHeight: 1
  }
}))

const GuestHomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { openModal } = useModalContext()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Симуляція даних для відображення
  const statData = [
    {
      title: 'Активних волонтерів',
      count: '2,500+',
      icon: <PersonOutlined fontSize='large' color='primary' />
    },
    {
      title: 'Організацій',
      count: '450+',
      icon: <BusinessOutlined fontSize='large' color='primary' />
    },
    {
      title: 'Завершених проектів',
      count: '3,200+',
      icon: <CheckCircleOutline fontSize='large' color='primary' />
    },
    {
      title: 'Людей отримали допомогу',
      count: '12,000+',
      icon: <Favorite fontSize='large' color='primary' />
    }
  ]

  const testimonials = [
    {
      name: 'Марія Петренко',
      role: 'Волонтер',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      text: 'Завдяки платформі VolunteersHubUA я змогла знайти проекти, які дійсно відповідають моїм навичкам та бажанням допомагати. Зручний інтерфейс та чудова координація!'
    },
    {
      name: 'Іван Коваленко',
      role: 'Організатор',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      text: 'Наша організація швидко знайшла потрібних волонтерів для термінового гуманітарного проекту. Комунікація була простою та ефективною, а підтримка команди — неоціненною.'
    },
    {
      name: 'Олена Шевченко',
      role: 'Отримувач допомоги',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      text: "Коли мені терміново була потрібна допомога з доглядом за літньою матір'ю, через платформу я знайшла чудових людей, які погодились допомогти. Дуже вдячна цьому сервісу!"
    }
  ]

  const categories = [
    'Гуманітарна допомога',
    'Допомога військовим',
    'Медична підтримка',
    'Екологічні ініціативи',
    'Освіта',
    'Психологічна підтримка',
    'Допомога літнім',
    'Логістика',
    'ІТ волонтерство',
    'Юридична підтримка'
  ]

  const featuredProjects = [
    {
      title: 'Допомога літнім людям у Львові',
      description:
        'Організація щотижневих закупівель продуктів та ліків для 25 літніх людей, які не можуть вийти з дому.',
      image:
        'https://images.unsplash.com/photo-1516728778615-2d590ea1855e?auto=format&fit=crop&q=80',
      type: 'Особиста допомога',
      location: 'Львів',
      timeline: 'Постійно'
    },
    {
      title: 'Збір коштів на медичне обладнання для військового госпіталю',
      description:
        'Терміновий збір коштів на придбання медичного обладнання для військового госпіталю у Харкові.',
      image:
        'https://images.unsplash.com/photo-1516816851876-aa7b3e6ee487?auto=format&fit=crop&q=80',
      type: 'Фінансова допомога',
      location: 'Харків',
      timeline: 'До 30 травня'
    },
    {
      title:
        'Встановлення та налаштування програмного забезпечення для волонтерського центру',
      description:
        'Потрібна допомога ІТ-спеціалістів для встановлення та налаштування програмного забезпечення для координаційного центру.',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      type: 'ІТ волонтерство',
      location: 'Онлайн',
      timeline: 'До 15 травня'
    }
  ]

  useEffect(() => {
    const confirmToken = searchParams.get('confirmToken')
    const resetToken = searchParams.get('resetToken')

    if (confirmToken) {
      openModal({
        component: (
          <EmailConfirmModal
            confirmToken={confirmToken}
            openModal={openModal}
          />
        )
      })
    }

    if (searchParams.get('login') !== null) {
      openModal({ component: <LoginDialog /> })
    }

    setSearchParams([])
  }, [searchParams, setSearchParams, openModal])

  const handleLoginClick = () => {
    openModal({ component: <LoginDialog /> })
  }

  return (
    <Box>
      {/* Секція Герой */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: { xs: 6, md: 10 },
          pb: { xs: 8, md: 14 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={4} alignItems='center'>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography
                    variant='h2'
                    component='h1'
                    gutterBottom
                    fontWeight='bold'
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.2
                    }}
                  >
                    З'єднуємо{' '}
                    <Box component='span' color='primary.main'>
                      волонтерів
                    </Box>{' '}
                    з тими, хто потребує допомоги
                  </Typography>
                  <Typography
                    variant='h5'
                    color='text.secondary'
                    paragraph
                    sx={{ mb: 4, maxWidth: '90%' }}
                  >
                    VolunteersHubUA — платформа, що допомагає волонтерам
                    знаходити проекти, а організаціям та людям залучати
                    підтримку для своїх ініціатив.
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ mt: 4 }}
                  >
                    <HeroButton
                      variant='contained'
                      color='primary'
                      size='large'
                      startIcon={<VolunteerActivism />}
                      onClick={handleLoginClick}
                    >
                      Стати волонтером
                    </HeroButton>
                    <HeroButton
                      variant='outlined'
                      color='primary'
                      size='large'
                      startIcon={<Handshake />}
                      onClick={handleLoginClick}
                    >
                      Отримати допомогу
                    </HeroButton>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grow in={true} timeout={1500}>
                <Box
                  component='img'
                  src='https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80'
                  alt='Волонтери допомагають'
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    boxShadow:
                      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                />
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Секція Категорій проектів */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant='h4'
          component='h2'
          textAlign='center'
          fontWeight='bold'
          gutterBottom
        >
          Категорії для допомоги
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          Знайдіть волонтерські можливості, що відповідають вашим навичкам та
          інтересам
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 6
          }}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              onClick={handleLoginClick}
              variant='outlined'
              color='primary'
            />
          ))}
        </Box>

        <Button
          variant='outlined'
          color='primary'
          endIcon={<KeyboardArrowDown />}
          onClick={handleLoginClick}
          sx={{
            display: 'block',
            mx: 'auto',
            mt: 2,
            borderRadius: '20px',
            textTransform: 'none'
          }}
        >
          Показати більше категорій
        </Button>
      </Container>

      {/* Секція Статистики */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container>
          <Typography
            variant='h4'
            component='h2'
            textAlign='center'
            fontWeight='bold'
            gutterBottom
          >
            Наш вплив
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            textAlign='center'
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
          >
            VolunteersHubUA об'єднує волонтерів та потребуючих по всій Україні
            для створення реальних змін
          </Typography>

          <Grid container spacing={3} justifyContent='center'>
            {statData.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Grow in={true} timeout={1000 + index * 200}>
                  <StatCard elevation={0}>
                    <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                    <Typography
                      variant='h3'
                      component='div'
                      fontWeight='bold'
                      gutterBottom
                    >
                      {stat.count}
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                      {stat.title}
                    </Typography>
                  </StatCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Секція Рекомендованих проектів */}
      <Container sx={{ py: 8 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Typography variant='h4' component='h2' fontWeight='bold'>
            Актуальні проекти
          </Typography>
          <Button
            variant='text'
            color='primary'
            endIcon={<ArrowForward />}
            onClick={handleLoginClick}
            sx={{ textTransform: 'none' }}
          >
            Переглянути всі
          </Button>
        </Box>

        <Grid container spacing={4}>
          {featuredProjects.map((project, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard onClick={handleLoginClick}>
                <CardMedia
                  component='img'
                  height='200'
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
                    <Chip
                      size='small'
                      label={project.type}
                      color='primary'
                      variant='outlined'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLoginClick()
                      }}
                    />
                    <Chip
                      size='small'
                      icon={<MapOutlined fontSize='small' />}
                      label={project.location}
                      variant='outlined'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLoginClick()
                      }}
                    />
                  </Box>
                  <Typography
                    gutterBottom
                    variant='h6'
                    component='h3'
                    sx={{ mt: 1 }}
                  >
                    {project.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' paragraph>
                    {project.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <AccessTime fontSize='small' color='action' />
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ ml: 1 }}
                    >
                      {project.timeline}
                    </Typography>
                  </Box>
                </CardContent>
                <Box
                  sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}
                >
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLoginClick()
                    }}
                    sx={{ borderRadius: '8px', textTransform: 'none' }}
                  >
                    Детальніше
                  </Button>
                </Box>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Секція Як це працює */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container>
          <Typography
            variant='h4'
            component='h2'
            textAlign='center'
            fontWeight='bold'
            gutterBottom
          >
            Як це працює
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            textAlign='center'
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
          >
            Три прості кроки для того, щоб стати волонтером або отримати
            допомогу
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                textAlign='center'
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}
                onClick={handleLoginClick}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <PersonOutlined fontSize='large' />
                </Avatar>
                <Typography variant='h5' component='h3' gutterBottom>
                  1. Створіть профіль
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Зареєструйтесь та заповніть інформацію про свої навички,
                  інтереси та доступність
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                textAlign='center'
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}
                onClick={handleLoginClick}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Search fontSize='large' />
                </Avatar>
                <Typography variant='h5' component='h3' gutterBottom>
                  2. Знайдіть проект
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Перегляньте доступні проекти або запити про допомогу та
                  виберіть ті, що вам підходять
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                textAlign='center'
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'translateY(-8px)' }
                }}
                onClick={handleLoginClick}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Message fontSize='large' />
                </Avatar>
                <Typography variant='h5' component='h3' gutterBottom>
                  3. Зв'яжіться та допомагайте
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  Спілкуйтесь через вбудований чат, координуйте свої дії та
                  розпочинайте допомагати
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Секція Відгуків */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant='h4'
          component='h2'
          textAlign='center'
          fontWeight='bold'
          gutterBottom
        >
          Відгуки учасників
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          textAlign='center'
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          Дізнайтеся, що кажуть волонтери, організатори та люди, які отримали
          допомогу
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard
                elevation={1}
                sx={{ cursor: 'pointer' }}
                onClick={handleLoginClick}
              >
                <Typography
                  variant='body1'
                  paragraph
                  sx={{ mb: 3, position: 'relative', zIndex: 1 }}
                >
                  {testimonial.text}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      {testimonial.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {testimonial.role}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto' }}>
                    <StarOutlined color='primary' />
                    <StarOutlined color='primary' />
                    <StarOutlined color='primary' />
                    <StarOutlined color='primary' />
                    <StarOutlined color='primary' />
                  </Box>
                </Box>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Секція Заклику до дії */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth='md'>
          <Typography
            variant='h3'
            component='h2'
            textAlign='center'
            fontWeight='bold'
            gutterBottom
          >
            Приєднуйтесь до спільноти волонтерів сьогодні
          </Typography>
          <Typography
            variant='h6'
            textAlign='center'
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}
          >
            Допомагайте тим, хто потребує підтримки, або знаходьте волонтерів
            для ваших ініціатив
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent='center'
            sx={{ mt: 4 }}
          >
            <HeroButton
              variant='contained'
              color='secondary'
              size='large'
              onClick={handleLoginClick}
              sx={{
                bgcolor: 'background.paper',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'background.paper'
                }
              }}
            >
              Зареєструватись
            </HeroButton>
            <HeroButton
              variant='outlined'
              color='inherit'
              size='large'
              onClick={handleLoginClick}
              sx={{
                borderColor: 'background.paper',
                color: 'background.paper',
                '&:hover': {
                  borderColor: 'background.paper',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Дізнатись більше
            </HeroButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default GuestHomePage
