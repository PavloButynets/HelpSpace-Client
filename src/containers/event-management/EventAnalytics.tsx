import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  CircularProgress,
  Chip
} from '@mui/material'
import {
  PeopleAlt,
  AccessTime,
  Star,
  HourglassEmpty,
  CheckCircle,
  Cancel,
  TrendingUp
} from '@mui/icons-material'
import { EventManagementService } from '~/services/event-management-service'

const styles = {
  container: {
    padding: '1rem'
  },
  header: {
    marginBottom: '1.5rem'
  },
  card: {
    height: '100%'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'primary.main'
  },
  statLabel: {
    color: 'text.secondary',
    marginBottom: 1
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginBottom: 1
  },
  progressContainer: {
    marginTop: 2,
    marginBottom: 2
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 0.5
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  skillChip: {
    margin: '0.25rem'
  }
}

interface EventAnalyticsProps {
  eventId: string
}

const EventAnalytics = ({ eventId }: EventAnalyticsProps) => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const eventStats = await EventManagementService.getEventStats()
        setStats(eventStats)
      } catch (error) {
        console.error('Error fetching event stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [eventId])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!stats) {
    return (
      <Box sx={styles.container}>
        <Typography color='text.secondary' variant='h6'>
          No analytics data available
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant='h5'>Аналітика події</Typography>
        <Typography color='text.secondary' variant='body2'>
          Детальна статистика участі та залучення волонтерів
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Статистика волонтерів */}
        <Grid {...({ item: true, md: 3, sm: 6, xs: 12 } as any)}>
          <Card sx={styles.card}>
            <CardContent>
              <Box sx={styles.iconWrapper}>
                <PeopleAlt color='primary' />
                <Typography variant='h6'>Участь волонтерів</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography sx={styles.statValue}>
                  {stats.totalVolunteers}
                </Typography>
                <Typography sx={styles.statLabel}>
                  Активних волонтерів
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={styles.progressContainer}>
                <Box sx={styles.progressLabel}>
                  <Typography variant='body2'>Заявки</Typography>
                  <Typography variant='body2'>
                    {stats.approvedApplications}/{stats.totalApplications}
                  </Typography>
                </Box>
                <LinearProgress
                  sx={{ height: 8, borderRadius: 4 }}
                  value={
                    (stats.approvedApplications / stats.totalApplications) * 100
                  }
                  variant='determinate'
                />
              </Box>

              <Box sx={styles.progressContainer}>
                <Box sx={styles.progressLabel}>
                  <Typography variant='body2'>Рівень утримання</Typography>
                  <Typography variant='body2'>
                    {stats.volunteerRetentionRate}%
                  </Typography>
                </Box>
                <LinearProgress
                  color='success'
                  sx={{ height: 8, borderRadius: 4 }}
                  value={stats.volunteerRetentionRate}
                  variant='determinate'
                />
              </Box>

              <Box sx={styles.progressContainer}>
                <Box sx={styles.progressLabel}>
                  <Typography variant='body2'>Рівень конверсії</Typography>
                  <Typography variant='body2'>
                    {stats.applicationConversionRate}%
                  </Typography>
                </Box>
                <LinearProgress
                  color='info'
                  sx={{ height: 8, borderRadius: 4 }}
                  value={stats.applicationConversionRate}
                  variant='determinate'
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Статистика годин та рейтингу */}
        <Grid {...({ item: true, md: 3, sm: 6, xs: 12 } as any)}>
          <Card sx={styles.card}>
            <CardContent>
              <Box sx={styles.iconWrapper}>
                <AccessTime color='primary' />
                <Typography variant='h6'>Години і продуктивність</Typography>
              </Box>

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}
              >
                <Box>
                  <Typography sx={styles.statValue}>
                    {stats.totalHoursLogged}
                  </Typography>
                  <Typography sx={styles.statLabel}>
                    Зареєстровано год.
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={styles.statValue}>
                    {stats.totalHoursApproved}
                  </Typography>
                  <Typography sx={styles.statLabel}>
                    Підтверджено год.
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ mb: 1 }} variant='body1'>
                  Середній рейтинг волонтерів
                </Typography>
                <Box sx={styles.ratingContainer}>
                  <Typography sx={styles.statValue}>
                    {stats.averageRating.toFixed(1)}
                  </Typography>
                  <Star color='primary' sx={{ fontSize: '2rem' }} />
                </Box>
              </Box>

              <Box sx={styles.progressContainer}>
                <Box sx={styles.progressLabel}>
                  <Typography variant='body2'>
                    Рівень підтвердження годин
                  </Typography>
                  <Typography variant='body2'>
                    {(
                      (stats.totalHoursApproved / stats.totalHoursLogged) *
                      100
                    ).toFixed(0)}
                    %
                  </Typography>
                </Box>
                <LinearProgress
                  color='success'
                  sx={{ height: 8, borderRadius: 4 }}
                  value={
                    (stats.totalHoursApproved / stats.totalHoursLogged) * 100
                  }
                  variant='determinate'
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Статус заявок */}
        <Grid {...({ item: true, md: 3, sm: 6, xs: 12 } as any)}>
          <Card sx={styles.card}>
            <CardContent>
              <Box sx={styles.iconWrapper}>
                <HourglassEmpty color='primary' />
                <Typography variant='h6'>Статус заявок</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle color='success' />
                  <Box>
                    <Typography variant='h6'>
                      {stats.approvedApplications}
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      Підтверджено
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HourglassEmpty color='warning' />
                  <Box>
                    <Typography variant='h6'>
                      {stats.pendingApplications}
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      В очікуванні
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Cancel color='error' />
                  <Box>
                    <Typography variant='h6'>
                      {stats.rejectedApplications}
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      Відхилено
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ mb: 1 }} variant='body1'>
                Заявки з часом
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                Графік відстеження заявок буде показано тут у виробничій версії.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Розподіл навичок */}
        <Grid {...({ item: true, md: 3, sm: 6, xs: 12 } as any)}>
          <Card sx={styles.card}>
            <CardContent>
              <Box sx={styles.iconWrapper}>
                <TrendingUp color='primary' />
                <Typography variant='h6'>
                  Найпопулярніші навички волонтерів
                </Typography>
              </Box>

              <Box sx={{ my: 2 }}>
                {stats.topSkills.map((skill: any) => (
                  <Chip
                    color='primary'
                    key={skill.skill}
                    label={`${skill.skill} (${skill.count})`}
                    sx={styles.skillChip}
                    variant='outlined'
                  />
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ mb: 1 }} variant='body1'>
                Розподіл навичок
              </Typography>
              <Typography color='text.secondary' variant='body2'>
                Візуалізація розподілу навичок буде показана тут у виробничій
                версії.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EventAnalytics
