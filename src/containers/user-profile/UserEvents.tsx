import type React from 'react'

import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Link,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import { CalendarMonth, LocationOn } from '@mui/icons-material'
import { VolunteerEvent } from '~/services/user-service'
import { Link as RouterLink } from 'react-router-dom' // Додайте цей імпорт!

import { Event } from '~/types'
import { userRoutes } from '~/router/constants/userRoutes'
import { authRoutes } from '~/router/constants/authRoutes'

// Mock data for events
const MOCK_EVENTS = {
  created: [
    {
      id: '1',
      title: 'Community Garden Revitalization',
      description:
        'Help us revitalize the community garden by planting new vegetables and flowers, and cleaning up the area.',
      status: 'ACTIVE',
      city: 'Kyiv',
      startDate: '2023-11-25T09:00:00',
      endDate: '2023-11-25T15:00:00',
      volunteerSlots: 15,
      participantsCount: 8,
      categories: ['Environmental', 'Community']
    },
    {
      id: '2',
      title: 'Coding Workshop for Kids',
      description:
        'Teach basic programming concepts to children aged 10-14 using Scratch and other kid-friendly tools.',
      status: 'UPCOMING',
      city: 'Kyiv',
      startDate: '2023-12-10T10:00:00',
      endDate: '2023-12-10T14:00:00',
      volunteerSlots: 10,
      participantsCount: 3,
      categories: ['Education', 'Technology']
    },
    {
      id: '3',
      title: 'Winter Clothing Drive',
      description:
        'Collect and distribute winter clothing to those in need before the cold season begins.',
      status: 'UPCOMING',
      city: 'Kyiv',
      startDate: '2023-12-05T11:00:00',
      endDate: '2023-12-05T17:00:00',
      volunteerSlots: 20,
      participantsCount: 12,
      categories: ['Social Services', 'Humanitarian']
    }
  ],
  participated: [
    {
      id: '4',
      title: 'City River Cleanup',
      description:
        "Join us in cleaning up the riverbanks and removing plastic waste from our city's river.",
      status: 'COMPLETED',
      city: 'Lviv',
      startDate: '2023-09-15T08:00:00',
      endDate: '2023-09-15T14:00:00',
      volunteerSlots: 30,
      participantsCount: 28,
      categories: ['Environmental', 'Community'],
      creator: {
        id: 'user123',
        name: 'Eco Warriors NGO'
      }
    },
    {
      id: '5',
      title: 'Elderly Care Visit',
      description:
        'Visit a local nursing home to spend time with elderly residents, play games, and help with activities.',
      status: 'COMPLETED',
      city: 'Kyiv',
      startDate: '2023-08-20T10:00:00',
      endDate: '2023-08-20T13:00:00',
      volunteerSlots: 12,
      participantsCount: 12,
      categories: ['Healthcare', 'Social Services'],
      creator: {
        id: 'user456',
        name: 'Care Connect'
      }
    }
  ]
}

// Helper function to format date
function formatEventDate(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const date = start.toLocaleDateString()
  const startTime = start.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
  const endTime = end.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${date}, ${startTime} - ${endTime}`
}

// Helper function to get status chip color
function getStatusChipColor(status: string) {
  switch (status) {
    case 'ACTIVE':
      return 'success'
    case 'UPCOMING':
      return 'primary'
    case 'COMPLETED':
      return 'default'
    case 'CANCELED':
      return 'error'
    default:
      return 'default'
  }
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      aria-labelledby={`events-tab-${index}`}
      hidden={value !== index}
      id={`events-tabpanel-${index}`}
      role='tabpanel'
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

interface UserEventsProps {
  events: {
    created: VolunteerEvent[]
    participated: VolunteerEvent[]
  }
}

export default function UserEvents({ events }: UserEventsProps) {
  const [tabValue, setTabValue] = useState(0)
  console.log(events)
  // In a real app, you would fetch events based on the userId
  //const events = MOCK_EVENTS

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          aria-label='events tabs'
          onChange={handleTabChange}
          value={tabValue}
          variant='fullWidth'
        >
          <Tab label='Створені поді' />
          <Tab label='Події де користувач був учасникои' />
        </Tabs>
      </Box>

      <TabPanel index={0} value={tabValue}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {events.created.length === 0 ? (
            <Typography align='center' color='text.secondary' sx={{ py: 4 }}>
              No events created yet.
            </Typography>
          ) : (
            events.created.map((event) => (
              <EventCard event={event} key={event.id} showCreator={false} />
            ))
          )}
        </Box>
      </TabPanel>

      <TabPanel index={1} value={tabValue}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {events.participated.length === 0 ? (
            <Typography align='center' color='text.secondary' sx={{ py: 4 }}>
              No events participated in yet.
            </Typography>
          ) : (
            events.participated.map((event) => (
              <EventCard event={event} key={event.id} showCreator />
            ))
          )}
        </Box>
      </TabPanel>
    </Box>
  )
}

interface EventCardProps {
  event: VolunteerEvent
  showCreator: boolean
}

function EventCard({ event, showCreator }: EventCardProps) {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1
          }}
        >
          <Typography component='h3' variant='h6'>
            {event.title}
          </Typography>
          <Chip
            color={getStatusChipColor(event.status) as any}
            label={event.status}
            size='small'
          />
        </Box>

        <Typography color='text.secondary' sx={{ mb: 2 }} variant='body2'>
          {(
            new DOMParser().parseFromString(event.description, 'text/html').body
              .textContent || ''
          ).slice(0, 50) + '...'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonth
              fontSize='small'
              sx={{ mr: 1, color: 'text.secondary' }}
            />
            <Typography variant='body2'>
              {formatEventDate(event.startDate, event.endDate)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn
              fontSize='small'
              sx={{ mr: 1, color: 'text.secondary' }}
            />
            <Typography variant='body2'>{event.city}</Typography>
          </Box>

          {showCreator && event.creator && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography color='text.secondary' sx={{ mr: 1 }} variant='body2'>
                Організовані:
              </Typography>
              <Link
                fontWeight='medium'
                href={`/users/${event.creator.id}`}
                underline='hover'
                variant='body2'
              >
                {event.creator.firstName} {event.creator.lastName}
              </Link>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {event.categories.map((category: { id: string; name: string }) => (
            <Chip
              key={category.id}
              label={category.name}
              size='small'
              variant='outlined'
            />
          ))}
        </Box>
      </CardContent>

      <CardActions>
        <Button
          component={RouterLink}
          fullWidth
          to={`${userRoutes.events.eventDetails.path}/${event.id}`}
          variant='contained'
        >
          Переглянути деталі події
        </Button>
      </CardActions>
    </Card>
  )
}
