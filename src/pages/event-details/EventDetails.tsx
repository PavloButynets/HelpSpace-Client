import React, { useState } from 'react'
import {
  Alert,
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import PageWrapper from '~/containers/page-wrapper/PageWrapper'
import EventHero from '~/containers/event-details/event-hero/EventHero'
import EventActions from '~/containers/event-details/event-actions/EventActions'
import EventDescription from '~/containers/event-details/event-description/EventDescription'
import EventInfo from '~/containers/event-details/event-info/EventInfo'
import EventOrganizer from '~/containers/event-details/event-organizer/EventOrganizer'
import EventLocation from '~/containers/event-details/event-location/EventLocation'
import EventParticipants from '~/containers/event-details/event-participants/EventParticipants'
import { useParams } from 'react-router-dom'
import { EventService } from '~/services/event-service'
import Loader from '~/components/loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useAppSelector } from '~/hooks/use-redux'
import { useQueryClient } from '@tanstack/react-query'
import {
  Assessment,
  Message,
  People,
  AccessTime,
  CheckCircle,
  Person
} from '@mui/icons-material'
import EventVolunteerManagement from '~/containers/event-management/EventVolunteerManagement'
import EventMessaging from '~/containers/event-management/EventMessaging'
import EventAnalytics from '~/containers/event-management/EventAnalytics'
import { height, margin, padding } from '@mui/system'

// Component for logging volunteer hours
const LogHoursForm = ({
  eventId,
  onSuccess
}: {
  eventId: string
  onSuccess?: () => void
}) => {
  const [hours, setHours] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    // Add logic to submit hours
    console.log('Logging hours:', { hours, description, eventId })
    if (onSuccess) onSuccess()
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom variant='h6'>
        Запис годин волонтерства
      </Typography>

      <TextField
        InputProps={{ inputProps: { min: 0, max: 24 } }}
        fullWidth
        label='Кількість годин'
        margin='normal'
        onChange={(e) => setHours(e.target.value)}
        type='number'
        value={hours}
      />

      <TextField
        fullWidth
        label='Опис виконаної роботи'
        margin='normal'
        multiline
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        value={description}
      />

      <Button
        color='primary'
        disabled={!hours || !description}
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        variant='contained'
      >
        Записати години
      </Button>
    </Box>
  )
}

export const styles = {
  authorView: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  tabsContainer: {
    borderBottom: 1,
    borderColor: 'divider'
  },
  tabContent: {
    py: 2
  },
  editButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 10
  },
  eventHeader: {
    position: 'relative',
    mb: 4
  },
  errorContainer: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  eventDetailsPage: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  eventContent: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 3
  },
  mainContent: {
    flex: '1 1 65%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  sideContent: {
    flex: '1 1 35%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  actionButtons: {
    zIndex: 10,
    ml: 3,
    display: 'flex',
    gap: '0.5rem',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '40vw',
    '& .MuiButton-root': {
      flex: 1
    }
  }
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>()
  const currentUserId = useAppSelector((state) => state.appMain.userId)
  const [activeTab, setActiveTab] = useState(0)
  const [volunteerActiveTab, setVolunteerActiveTab] = useState(0)
  const [isRegistering, setIsRegistering] = useState(false)
  const [logHoursOpen, setLogHoursOpen] = useState(false)
  const [completeVolunteeringOpen, setCompleteVolunteeringOpen] =
    useState(false)
  const queryClient = useQueryClient()

  const {
    data: eventResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['event', id],
    queryFn: () => EventService.getEventById(id || ''),
    enabled: !!id,
    refetchOnWindowFocus: false
  })

  const { data: eventApplicants } = useQuery({
    queryKey: ['userEventStatus', id],
    queryFn: () => EventService.getEventApplicants(id!),
    enabled: !!id
  })

  const isUserRegistered = eventApplicants?.some(
    (applicant) => applicant.user.id === currentUserId
  )

  // Check if user is an accepted volunteer
  const userApplication = eventApplicants?.find(
    (applicant) =>
      applicant.user.id === currentUserId && applicant.status === 'ACCEPTED'
  )

  const { mutate: registerForEventMutation } = useMutation({
    mutationFn: () => {
      if (!id) throw new Error('Event ID is missing')
      return EventService.applyForEvent(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userEventStatus', id] })
      queryClient.invalidateQueries({ queryKey: ['event', id] })
      setIsRegistering(false)
    },
    onError: () => {
      setIsRegistering(false)
    }
  })

  const handleRegister = () => {
    setIsRegistering(true)
    registerForEventMutation()
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleVolunteerTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setVolunteerActiveTab(newValue)
  }

  const handleCompleteVolunteering = () => {
    // Logic to complete volunteering
    console.log('Completing volunteering')
    setCompleteVolunteeringOpen(false)
    // After API call to complete, you can refetch or update state
    // queryClient.invalidateQueries({ queryKey: ['userEventStatus', id] })
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <Loader pageLoad size={80} />
      </PageWrapper>
    )
  }

  if (error || !eventResponse) {
    return (
      <PageWrapper>
        <Box sx={styles.errorContainer}>
          <Alert severity='error'>
            <Typography variant='h6'>Failed to load event details</Typography>
            <Typography>
              {error instanceof Error
                ? error.message
                : 'Unknown error occurred'}
            </Typography>
          </Alert>
        </Box>
      </PageWrapper>
    )
  }

  // Enhanced view for event author
  if (eventResponse?.creator.id === currentUserId) {
    return (
      <PageWrapper>
        <Box sx={styles.authorView}>
          <Box sx={styles.eventHeader}>
            <EventHero
              city={eventResponse.city}
              coverImage={eventResponse.coverImage}
              date={eventResponse.startDate.toString()}
              status={eventResponse.status}
              title={eventResponse?.title}
            />
          </Box>

          <Paper elevation={2} sx={{ mb: 4 }}>
            <Tabs
              onChange={handleTabChange}
              scrollButtons='auto'
              sx={styles.tabsContainer}
              value={activeTab}
              variant='scrollable'
            >
              <Tab
                icon={<Assessment />}
                iconPosition='start'
                label='Event Details'
              />
              <Tab icon={<People />} iconPosition='start' label='Volunteers' />
              <Tab icon={<Message />} iconPosition='start' label='Messaging' />
              <Tab
                icon={<Assessment />}
                iconPosition='start'
                label='Analytics'
              />
            </Tabs>

            <Box sx={styles.tabContent}>
              {activeTab === 0 && (
                <Box sx={styles.eventContent}>
                  <Box sx={styles.mainContent}>
                    <EventDescription description={eventResponse.description} />
                    <EventOrganizer organizer={eventResponse.creator} />
                  </Box>

                  <Box sx={styles.sideContent}>
                    <EventInfo
                      address={eventResponse.address}
                      city={eventResponse.city}
                      endDate={eventResponse.endDate}
                      participants={eventResponse.participantsCount}
                      slots={eventResponse.volunteerSlots}
                      startDate={eventResponse.startDate}
                    />
                    <EventLocation
                      address={eventResponse.address}
                      coordinates={{ lat: 23, lng: 42 }}
                    />
                    <EventParticipants
                      count={eventResponse.participantsCount}
                    />
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                <EventVolunteerManagement eventId={id!} isAuthor />
              )}

              {activeTab === 2 && <EventMessaging eventId={id!} />}

              {activeTab === 3 && <EventAnalytics eventId={id!} />}
            </Box>
          </Paper>
        </Box>
      </PageWrapper>
    )
  }

  // Enhanced view for accepted volunteers
  if (userApplication) {
    return (
      <PageWrapper>
        <Box sx={styles.authorView}>
          <Box sx={styles.eventHeader}>
            <EventHero
              city={eventResponse.city}
              coverImage={eventResponse.coverImage}
              date={eventResponse.startDate.toString()}
              status={eventResponse.status}
              title={eventResponse?.title}
            />
          </Box>

          <Paper elevation={2} sx={{ mb: 4 }}>
            <Tabs
              onChange={handleVolunteerTabChange}
              scrollButtons='auto'
              sx={styles.tabsContainer}
              value={volunteerActiveTab}
              variant='scrollable'
            >
              <Tab
                icon={<Assessment />}
                iconPosition='start'
                label='Інформація'
              />
              <Tab icon={<People />} iconPosition='start' label='Учасники' />
              <Tab icon={<Message />} iconPosition='start' label='Чат' />
              <Tab icon={<Person />} iconPosition='start' label='Мій профіль' />
              <Box sx={styles.actionButtons}>
                <Button
                  color='primary'
                  onClick={() => setLogHoursOpen(true)}
                  startIcon={<AccessTime />}
                  variant='contained'
                >
                  Записати години
                </Button>
                <Button
                  color='error'
                  onClick={() => setCompleteVolunteeringOpen(true)}
                  startIcon={<CheckCircle />}
                  variant='outlined'
                >
                  Завершити
                </Button>
              </Box>
            </Tabs>

            <Box sx={styles.tabContent}>
              {volunteerActiveTab === 0 && (
                <Box sx={styles.eventContent}>
                  <Box sx={styles.mainContent}>
                    <EventDescription description={eventResponse.description} />
                    <EventOrganizer organizer={eventResponse.creator} />
                  </Box>

                  <Box sx={styles.sideContent}>
                    <EventInfo
                      address={eventResponse.address}
                      city={eventResponse.city}
                      endDate={eventResponse.endDate}
                      participants={eventResponse.participantsCount}
                      slots={eventResponse.volunteerSlots}
                      startDate={eventResponse.startDate}
                    />
                    <EventLocation
                      address={eventResponse.address}
                      coordinates={{ lat: 23, lng: 42 }}
                    />
                    <EventParticipants
                      count={eventResponse.participantsCount}
                    />
                  </Box>
                </Box>
              )}

              {volunteerActiveTab === 1 && (
                <EventVolunteerManagement eventId={id!} isAuthor={false} />
              )}

              {volunteerActiveTab === 2 && <EventMessaging eventId={id!} />}

              {volunteerActiveTab === 3 && (
                <Box sx={{ p: 3 }}>
                  <Paper elevation={1} sx={{ p: 3 }}>
                    <Typography gutterBottom variant='h6'>
                      Мій статус волонтера
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3
                      }}
                    >
                      <Box>
                        <Typography color='text.secondary' variant='body2'>
                          Статус
                        </Typography>
                        <Typography
                          color='success.main'
                          fontWeight='bold'
                          variant='body1'
                        >
                          Активний волонтер
                        </Typography>
                      </Box>

                      <Box>
                        <Typography color='text.secondary' variant='body2'>
                          Дата приєднання
                        </Typography>
                        <Typography variant='body1'>
                          {new Date(
                            userApplication.joinedAt || Date.now()
                          ).toLocaleDateString('uk-UA')}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography color='text.secondary' variant='body2'>
                          Відпрацьовано годин
                        </Typography>
                        <Typography variant='body1'>
                          <Box
                            component='span'
                            sx={{ color: 'primary.main', fontWeight: 'bold' }}
                          >
                            {userApplication.hoursWorked || 0}
                          </Box>
                        </Typography>
                      </Box>
                    </Box>

                    <Typography gutterBottom variant='h6'>
                      Мої відмітки
                    </Typography>

                    {/* Simple form to show most recent hour log */}
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 3
                      }}
                    >
                      <Typography color='text.secondary' variant='body2'>
                        Останнє оновлення:{' '}
                        {new Date().toLocaleDateString('uk-UA')}
                      </Typography>
                      <Typography
                        sx={{ my: 1, color: 'primary.main' }}
                        variant='h5'
                      >
                        {userApplication.hoursWorked || 0} годин
                      </Typography>
                      <Typography variant='body2'>
                        Загальний час, витрачений на волонтерську діяльність в
                        рамках даної події.
                      </Typography>
                    </Box>

                    <Typography gutterBottom variant='h6'>
                      Записати нові години
                    </Typography>
                    <Typography
                      color='text.secondary'
                      sx={{ mb: 2 }}
                      variant='body2'
                    >
                      Будь ласка, вкажіть кількість відпрацьованих годин та опис
                      виконаної роботи. Після подання дані будуть перевірені
                      організатором події.
                    </Typography>

                    <Button
                      color='primary'
                      onClick={() => setLogHoursOpen(true)}
                      startIcon={<AccessTime />}
                      variant='contained'
                    >
                      Записати години
                    </Button>
                  </Paper>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Log Hours Dialog */}
          <Dialog
            fullWidth
            maxWidth='sm'
            onClose={() => setLogHoursOpen(false)}
            open={logHoursOpen}
          >
            <DialogContent>
              <LogHoursForm
                eventId={id!}
                onSuccess={() => setLogHoursOpen(false)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setLogHoursOpen(false)}>Скасувати</Button>
            </DialogActions>
          </Dialog>

          {/* Complete Volunteering Dialog */}
          <Dialog
            fullWidth
            maxWidth='sm'
            onClose={() => setCompleteVolunteeringOpen(false)}
            open={completeVolunteeringOpen}
          >
            <DialogTitle>Завершення волонтерства</DialogTitle>
            <DialogContent>
              <Typography sx={{ mb: 2 }}>
                Ви впевнені, що хочете завершити свою волонтерську роботу на цій
                події?
              </Typography>
              <Typography variant='body2'>
                Ваші відпрацьовані години: <strong>{4}</strong> годин{' '}
                {/*TODO: ADD REAL DATA*/}
              </Typography>
              <Typography color='text.secondary' sx={{ mt: 2 }} variant='body2'>
                Ви завжди можете повернутися до події пізніше, якщо захочете
                продовжити волонтерство.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCompleteVolunteeringOpen(false)}>
                Скасувати
              </Button>
              <Button
                color='primary'
                onClick={handleCompleteVolunteering}
                variant='contained'
              >
                Підтвердити
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </PageWrapper>
    )
  }

  // Regular view for event visitors
  return (
    <PageWrapper>
      <Box sx={styles.eventDetailsPage}>
        <EventHero
          city={eventResponse.city}
          coverImage={eventResponse.coverImage}
          date={eventResponse.startDate.toString()}
          status={eventResponse.status}
          title={eventResponse?.title}
        />

        <Box sx={styles.eventContent}>
          <Box sx={styles.mainContent}>
            <EventActions
              applicationStatus={
                eventApplicants?.find(
                  (applicant) => applicant.user.id === currentUserId
                )?.status
              }
              deadline={eventResponse.registrationDeadline}
              isCreator={eventResponse.creator.id === currentUserId}
              isRegistering={isRegistering}
              isUserJoined={isUserRegistered}
              onRegister={handleRegister}
              participants={eventResponse.participantsCount}
              slots={eventResponse.volunteerSlots}
            />

            <EventDescription description={eventResponse.description} />

            <EventOrganizer organizer={eventResponse.creator} />
          </Box>

          <Box sx={styles.sideContent}>
            <EventInfo
              address={eventResponse.address}
              city={eventResponse.city}
              endDate={eventResponse.endDate}
              participants={eventResponse.participantsCount}
              slots={eventResponse.volunteerSlots}
              startDate={eventResponse.startDate}
            />

            <EventLocation
              address={eventResponse.address}
              coordinates={{ lat: 23, lng: 42 }}
            />

            <EventParticipants count={eventResponse.participantsCount} />
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EventDetails
