import { useState } from 'react'
import { Alert, Box, Typography } from '@mui/material'
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

export const styles = {
  eventDetailsPage: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  eventContent: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
    gap: '2rem'
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  sideContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    order: { xs: -1, md: 0 }
  },
  errorContainer: {
    padding: '2rem',
    textAlign: 'center'
  }
}
// Mock data - replace with actual API data
const eventData = {
  id: '123',
  title: 'Drohobych Half Marathon 2025',
  coverImage:
    'https://platforma.volunteer.country/storage/organizationevent/9168/de32284242d112c777000ccceccbed4789cda944.png',
  date: '2025-04-15T09:00:00',
  endDate: '2025-04-15T15:00:00',
  location: 'Drohobych, Ukraine',
  address: 'вул. Трускавецька, 77, Дрогобич',
  status: 'UPCOMING',
  registrationDeadline: '2025-04-10T23:59:59',
  volunteerSlots: 50,
  participantsCount: 32,
  description: `<p>Запрошуємо волонтерів долучитися до організації Drohobych Half Marathon 2025!</p>
  <p>Це унікальна можливість стати частиною спортивної події та допомогти у створенні неповторної атмосфери для учасників.</p>
  <p>Ваша підтримка та енергія дуже важливі для успіху цього заходу!</p>`,
  requirements: [
    'Вік від 16 років',
    'Комунікабельність',
    'Відповідальність',
    'Бажання допомагати'
  ],
  benefits: [
    'Фірмова футболка волонтера',
    'Харчування в день заходу',
    'Сертифікат участі',
    'Нові знайомства та досвід'
  ],
  tasks: [
    'Реєстрація учасників',
    'Робота на пунктах харчування',
    'Допомога на фініші',
    'Навігація учасників на трасі'
  ],
  organizer: {
    name: 'Дрогобицька міська рада',
    logo: 'https://example.com/organizer-logo.jpg',
    description: 'Офіційний організатор Drohobych Half Marathon 2025',
    contact: 'info@drohobych-marathon.ua'
  },
  coordinates: {
    lat: 49.3545,
    lng: 23.5018
  }
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>()
  const currentUserId = useAppSelector((state) => state.appMain.userId)

  const [isRegistering, setIsRegistering] = useState(false)
  const queryClient = useQueryClient() // Отримуємо queryClient

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
  const { data: eventApplicants, isLoading: loadingStatus } = useQuery({
    queryKey: ['userEventStatus', id],
    queryFn: () => EventService.getEventApplicants(id!),
    enabled: !!id
  })

  const isUserRegistered = eventApplicants?.some(
    (applicant) => applicant.user.id === currentUserId
  )
  //mutation for registering to the event
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
    setIsRegistering(false)
  }

  if (isLoading) {
    return (
      <PageWrapper>
        <Loader pageLoad size={80} />
      </PageWrapper>
    )
  }

  // Show error state
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
  return (
    <PageWrapper>
      <Box sx={styles.eventDetailsPage}>
        <EventHero
          coverImage={eventResponse.coverImage}
          date={eventResponse.startDate.toString()}
          city={eventResponse.city}
          status={eventResponse.status}
          title={eventResponse?.title}
        />

        <Box sx={styles.eventContent}>
          <Box sx={styles.mainContent}>
            <EventActions
              deadline={eventResponse.registrationDeadline}
              isRegistering={isRegistering}
              onRegister={handleRegister}
              participants={eventResponse.participantsCount}
              slots={eventResponse.volunteerSlots}
              isUserJoined={isUserRegistered}
              isCreator={eventResponse.creator.id === currentUserId}
              applicationStatus={
                eventApplicants?.find(
                  (applicant) => applicant.user.id === currentUserId
                )?.status
              }
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
              coordinates={eventData.coordinates}
            />

            <EventParticipants count={eventResponse.participantsCount} />
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EventDetails
