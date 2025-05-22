import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Avatar,
  IconButton,
  InputAdornment,
  Tabs,
  Tab
} from '@mui/material'
import {
  Search,
  Message,
  Star,
  AccessTime,
  CheckCircle,
  Cancel
} from '@mui/icons-material'
import { EventManagementService } from '~/services/event-management-service'

const styles = {
  container: {
    padding: '1rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  searchField: {
    width: '300px'
  },
  tableContainer: {
    marginTop: '1rem',
    marginBottom: '2rem'
  },
  statusChip: {
    fontWeight: 500
  },
  volunteerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    objectFit: 'cover' as const
  },
  actionButton: {
    minWidth: '36px',
    padding: '6px'
  },
  filterContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  ratingDialog: {
    width: '400px'
  },
  hoursBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    background: '#f0f7ff',
    borderRadius: '16px',
    padding: '4px 10px',
    fontWeight: 500
  }
}

interface EventVolunteerManagementProps {
  eventId: string
  isAuthor: boolean
}

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'ACTIVE':
      return 'success'
    case 'PENDING':
      return 'warning'
    case 'REJECTED':
      return 'error'
    default:
      return 'default'
  }
}

const EventVolunteerManagement = ({
  eventId,
  isAuthor
}: EventVolunteerManagementProps) => {
  const [volunteers, setVolunteers] = useState<any[]>([])
  const [filteredVolunteers, setFilteredVolunteers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedVolunteer, setSelectedVolunteer] = useState<any | null>(null)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const [hours, setHours] = useState<any[]>([])
  const [filteredHours, setFilteredHours] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const volunteersData = await EventManagementService.getVolunteers()
        const hoursData = await EventManagementService.getLoggedHours()
        setVolunteers(volunteersData)
        setFilteredVolunteers(volunteersData)
        setHours(hoursData)
        setFilteredHours(hoursData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [eventId])

  useEffect(() => {
    setFilteredVolunteers(
      volunteers.filter(
        (volunteer) =>
          volunteer.firstName.toLowerCase().includes(search.toLowerCase()) ||
          volunteer.lastName.toLowerCase().includes(search.toLowerCase()) ||
          volunteer.email.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, volunteers])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleOpenFeedback = (volunteer: any) => {
    setSelectedVolunteer(volunteer)
    setRating(volunteer.rating || null)
    setFeedback(volunteer.feedback || '')
    setFeedbackOpen(true)
  }

  const handleCloseFeedback = () => {
    setFeedbackOpen(false)
    setSelectedVolunteer(null)
    setRating(null)
    setFeedback('')
  }

  const handleSubmitFeedback = async () => {
    if (!selectedVolunteer) return

    try {
      await EventManagementService.provideFeedback(selectedVolunteer.id, {
        rating: rating || 0,
        comment: feedback
      })

      // Update the volunteer in the list
      setVolunteers(
        volunteers.map((vol) =>
          vol.id === selectedVolunteer.id ? { ...vol, rating, feedback } : vol
        )
      )

      handleCloseFeedback()
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleApproveHours = async (hoursId: string) => {
    try {
      await EventManagementService.approveLoggedHours(hoursId)

      // Update the hours in the list
      setHours(
        hours.map((hour) =>
          hour.id === hoursId ? { ...hour, status: 'APPROVED' } : hour
        )
      )
      setFilteredHours(
        filteredHours.map((hour) =>
          hour.id === hoursId ? { ...hour, status: 'APPROVED' } : hour
        )
      )
    } catch (error) {
      console.error('Error approving hours:', error)
    }
  }

  const handleRejectHours = async (hoursId: string) => {
    try {
      await EventManagementService.rejectLoggedHours(hoursId)

      // Update the hours in the list
      setHours(
        hours.map((hour) =>
          hour.id === hoursId ? { ...hour, status: 'REJECTED' } : hour
        )
      )
      setFilteredHours(
        filteredHours.map((hour) =>
          hour.id === hoursId ? { ...hour, status: 'REJECTED' } : hour
        )
      )
    } catch (error) {
      console.error('Error rejecting hours:', error)
    }
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant='h5'>Волонтери</Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            )
          }}
          onChange={handleSearchChange}
          placeholder='Знайти волонтерів...'
          size='small'
          sx={styles.searchField}
          value={search}
          variant='outlined'
        />
      </Box>

      <Tabs onChange={handleTabChange} sx={{ mb: 2 }} value={tabValue}>
        <Tab label='Волонтери' />
        <Tab label='Підвердження годин' />
      </Tabs>

      {tabValue === 0 && (
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Волонтер</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Зареєстровані години</TableCell>
                <TableCell>Долучився</TableCell>
                <TableCell>Рейтинг</TableCell>
                <TableCell>Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVolunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell>
                    <Box sx={styles.volunteerInfo}>
                      <img
                        alt={`${volunteer.firstName} ${volunteer.lastName}`}
                        src={volunteer.photo}
                        style={styles.avatar}
                      />
                      <Box>
                        <Typography variant='body1'>
                          {volunteer.firstName} {volunteer.lastName}
                        </Typography>
                        <Typography color='textSecondary' variant='body2'>
                          {volunteer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={getStatusColor(volunteer.status) as any}
                      label={volunteer.status}
                      size='small'
                      sx={styles.statusChip}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={styles.hoursBadge}>
                      <AccessTime fontSize='small' />
                      <Typography>
                        {volunteer.hoursApproved}/{volunteer.hoursLogged}h
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(volunteer.joinedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Rating
                      precision={0.5}
                      readOnly
                      size='small'
                      value={volunteer.rating}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                      <IconButton
                        color='primary'
                        onClick={() => handleOpenFeedback(volunteer)}
                        size='small'
                      >
                        <Star fontSize='small' />
                      </IconButton>
                      <IconButton color='primary' size='small'>
                        <Message fontSize='small' />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && (
        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Volunteer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHours.length > 0 ? (
                filteredHours.map((hour) => (
                  <TableRow key={hour.id}>
                    <TableCell>
                      <Box sx={styles.volunteerInfo}>
                        <img
                          alt={hour.volunteerName}
                          src={hour.volunteerPhoto || '/placeholder.svg'}
                          style={styles.avatar}
                        />
                        <Typography>{hour.volunteerName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(hour.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={styles.hoursBadge}>
                        <AccessTime fontSize='small' />
                        <Typography>{hour.hoursLogged}h</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={getStatusColor(hour.status)}
                        label={hour.status}
                        size='small'
                        sx={styles.statusChip}
                      />
                    </TableCell>
                    <TableCell>
                      {volunteers.find((v) => v.id === hour.volunteerId)
                        ?.rating ? (
                        <Rating
                          readOnly
                          size='small'
                          value={
                            volunteers.find((v) => v.id === hour.volunteerId)
                              ?.rating
                          }
                        />
                      ) : (
                        <Typography color='textSecondary' variant='body2'>
                          Not rated
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {hour.status === 'PENDING' && (
                        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                          <IconButton
                            color='success'
                            onClick={() => handleApproveHours(hour.id)}
                            size='small'
                          >
                            <CheckCircle fontSize='small' />
                          </IconButton>
                          <IconButton
                            color='error'
                            onClick={() => handleRejectHours(hour.id)}
                            size='small'
                          >
                            <Cancel fontSize='small' />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align='center' colSpan={6}>
                    <Typography py={2} variant='body1'>
                      No hours logged yet
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog onClose={handleCloseFeedback} open={feedbackOpen}>
        <DialogTitle>
          Feedback for {selectedVolunteer?.firstName}{' '}
          {selectedVolunteer?.lastName}
        </DialogTitle>
        <DialogContent sx={styles.ratingDialog}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Typography variant='subtitle1'>Rating</Typography>
            <Rating
              onChange={(_, newValue) => setRating(newValue)}
              precision={0.5}
              size='large'
              value={rating}
            />
            <Typography sx={{ mt: 1 }} variant='subtitle1'>
              Feedback
            </Typography>
            <TextField
              fullWidth
              multiline
              onChange={(e) => setFeedback(e.target.value)}
              placeholder='Provide feedback about this volunteer...'
              rows={4}
              value={feedback}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedback}>Cancel</Button>
          <Button
            color='primary'
            disabled={!rating}
            onClick={handleSubmitFeedback}
            variant='contained'
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default EventVolunteerManagement
