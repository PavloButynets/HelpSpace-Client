import type React from 'react'
import { useState, useRef, useCallback, act } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Button,
  Avatar,
  Drawer,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Pagination
} from '@mui/material'
import {
  CalendarMonth as CalendarIcon,
  LocationOn as MapPinIcon,
  People as UsersIcon,
  Check as CheckIcon,
  Close as XIcon,
  FilterList as FilterIcon,
  CancelOutlined as XCircleIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import PageWrapper from '~/containers/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'
import { EventService } from '~/services/event-service'
import { EventAssignmentStatus } from '~/types/common/common.index'

// Default filter values
const defaultFilters = {
  page: 1,
  search: '',
  status: '',
  category: '',
  city: '',
  dateFrom: '',
  dateTo: ''
}

const itemsPerPage = 5

// Styles
const styles = {
  container: {
    py: 3,
    px: { xs: 2, md: 4 }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  tabsContainer: {
    mb: 4
  },
  eventCard: {
    mb: 3
  },
  cardHeader: {
    pb: 1
  },
  cardContent: {
    pt: 0
  },
  eventMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mt: 2,
    mb: 1,
    color: 'text.secondary'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14
  },
  categoriesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mt: 1
  },
  applicantItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2,
    mb: 2,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1
  },
  applicantInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 2
  },
  applicantActions: {
    display: 'flex',
    gap: 1
  },
  joinedEventsGrid: {
    mt: 2
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    mt: 4
  },
  drawerContent: {
    width: { xs: '100%', sm: 350 },
    p: 3
  },
  joinedEventsContainer: {
    mt: 2
  },
  filterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    mt: 2
  },
  filterActions: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 3,
    pt: 2,
    borderTop: '1px solid',
    borderColor: 'divider'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    py: 10
  },
  showApplicantsButton: {
    mt: 2,
    textTransform: 'none'
  }
}

export default function MyEventsPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const [tabValue, setTabValue] = useState(0)
  const [filters, setFilters] = useState(defaultFilters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  const targetBlock = useRef<HTMLDivElement>(null)

  const {
    data: createdEventsData,
    isLoading: loadingCreated,
    isError: errorCreated
  } = useQuery({
    queryKey: ['userCreatedEvents', tabValue === 0],
    queryFn: () => EventService.getUserCreatedEvents(),
    enabled: tabValue === 0
  })

  const {
    data: joinedEventsData,
    isLoading: loadingJoined,
    isError: errorJoined
  } = useQuery({
    queryKey: ['userJoinedEvents', tabValue === 1],
    queryFn: () => EventService.getUserJoinedEvents(),
    enabled: tabValue === 1
  })

  const {
    data: eventAssignmentsData,
    isLoading: loadingAssignments,
    isError: errorAssignments
  } = useQuery({
    queryKey: ['eventAssignments', selectedEventId],
    queryFn: () =>
      selectedEventId
        ? EventService.getEventApplicants(selectedEventId)
        : Promise.resolve([]),
    enabled: !!selectedEventId && tabValue === 0
  })

  const acceptMutation = useMutation({
    mutationFn: ({
      eventId,
      userId,
      action
    }: {
      eventId: string
      userId: string
      action: EventAssignmentStatus
    }) => EventService.acceptOrRejectApplicant(eventId, userId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCreatedEvents'] })
      queryClient.invalidateQueries({
        queryKey: ['eventAssignments', selectedEventId]
      })

      setSnackbar({
        open: true,
        message:
          t('event.applicant.acceptSuccess') ||
          'Applicant accepted successfully',
        severity: 'success'
      })
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message:
          error.message ||
          t('event.applicant.acceptError') ||
          'Error accepting applicant',
        severity: 'error'
      })
    }
  })

  const rejectMutation = useMutation({
    mutationFn: ({
      eventId,
      userId,
      action
    }: {
      eventId: string
      userId: string
      action: EventAssignmentStatus
    }) => EventService.acceptOrRejectApplicant(eventId, userId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCreatedEvents'] })
      queryClient.invalidateQueries({
        queryKey: ['eventAssignments', selectedEventId]
      })

      setSnackbar({
        open: true,
        message:
          t('event.applicant.rejectSuccess') ||
          'Applicant rejected successfully',
        severity: 'info'
      })
    },
    onError: (error: any) => {
      setSnackbar({
        open: true,
        message:
          error.message ||
          t('event.applicant.rejectError') ||
          'Error rejecting applicant',
        severity: 'error'
      })
    }
  })

  // Функція для перемикання відображення заявок
  const showEventAssignments = (eventId: string) => {
    setSelectedEventId((prev) => (prev === eventId ? null : eventId))
  }

  // Calculate active filter count
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    return (
      key !== 'page' &&
      value !== '' &&
      value !== defaultFilters[key as keyof typeof defaultFilters]
    )
  }).length

  // Filter events
  const filteredCreatedEvents = useCallback(() => {
    if (!createdEventsData) return []

    let events = [...createdEventsData]

    if (filters.search) {
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status) {
      events = events.filter((event) => event.status === filters.status)
    }

    if (filters.category) {
      // Перевіряємо структуру категорій (можуть бути об'єкти з полем name або просто рядки)
      events = events.filter((event) =>
        Array.isArray(event.categories) &&
        event.categories.length > 0 &&
        typeof event.categories[0] === 'object' &&
        'name' in event.categories[0]
          ? event.categories.some((cat) => cat.name === filters.category)
          : event.categories
              .map((category) => category.name)
              .includes(filters.category)
      )
    }

    if (filters.city) {
      events = events.filter((event) =>
        event.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom).getTime()
      events = events.filter(
        (event) => new Date(event.startDate).getTime() >= fromDate
      )
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo).getTime()
      events = events.filter(
        (event) => new Date(event.startDate).getTime() <= toDate
      )
    }

    return events
  }, [createdEventsData, filters])

  const filteredJoinedEvents = useCallback(() => {
    if (!joinedEventsData) return []

    let events = [...joinedEventsData]

    if (filters.search) {
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status) {
      events = events.filter(
        (event) =>
          event.status === filters.status ||
          event.applicationStatus === filters.status //TODO: REPLACE WITH USER STATUS
      )
    }

    if (filters.category) {
      // Перевіряємо структуру категорій (можуть бути об'єкти з полем name або просто рядки)
      events = events.filter((event) =>
        Array.isArray(event.categories) &&
        event.categories.length > 0 &&
        typeof event.categories[0] === 'object' &&
        'name' in event.categories[0]
          ? event.categories.some((cat) => cat.name === filters.category)
          : event.categories
              .map((category) => category.name)
              .includes(filters.category)
      )
    }

    if (filters.city) {
      events = events.filter((event) =>
        event.city.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom).getTime()
      events = events.filter(
        (event) => new Date(event.startDate).getTime() >= fromDate
      )
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo).getTime()
      events = events.filter(
        (event) => new Date(event.startDate).getTime() <= toDate
      )
    }

    return events
  }, [joinedEventsData, filters])

  // Get paginated events
  const createdEvents = filteredCreatedEvents()
  const joinedEvents = filteredJoinedEvents()

  const paginatedCreatedEvents = createdEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const paginatedJoinedEvents = joinedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const handleApplicantAction = (
    eventId: string,
    applicantId: string,
    action: 'ACCEPT' | 'REJECT'
  ) => {
    if (action === 'ACCEPT') {
      acceptMutation.mutate({
        eventId,
        userId: applicantId,
        action: EventAssignmentStatus.ACCEPTED
      })
    } else {
      rejectMutation.mutate({
        eventId,
        userId: applicantId,
        action: EventAssignmentStatus.REJECTED
      })
    }
  }

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <Chip
            color='success'
            label={t('event.eventStatus.ONGOING') || 'Active'}
            size='small'
          />
        )
      case 'COMPLETED':
        return (
          <Chip
            color='default'
            label={t('event.eventStatus.COMPLETED') || 'Completed'}
            size='small'
          />
        )
      case 'UPCOMING':
        return (
          <Chip
            color='secondary'
            label={t('event.eventStatus.NEW') || 'New'}
            size='small'
          />
        )
      case 'PENDING':
        return (
          <Chip
            color='warning'
            label={t('event.status.pending') || 'Pending'}
            size='small'
          />
        )
      case 'ACCEPTED':
        return (
          <Chip
            color='success'
            label={t('event.status.accepted') || 'Accepted'}
            size='small'
          />
        )
      default:
        return <Chip label={status} size='small' />
    }
  }

  // Handle page change
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    setFilters({
      ...filters,
      page
    })

    if (targetBlock.current) {
      targetBlock.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Apply filters
  const applyFilters = () => {
    // Close filters drawer
    setIsFilterOpen(false)
  }

  // Reset filters
  const resetFilters = () => {
    setFilters(defaultFilters)
    setCurrentPage(1)
  }

  // Handle tab change
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setCurrentPage(1) // Reset to first page on tab change
    setSelectedEventId(null) // Закрываем все открытые заявки при смене вкладки
  }

  // Calculate total pages
  const getPageCount = useCallback(() => {
    const eventsCount =
      tabValue === 0 ? createdEvents.length : joinedEvents.length
    return Math.ceil(eventsCount / itemsPerPage)
  }, [tabValue, createdEvents.length, joinedEvents.length])

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Determine loading and error state based on active tab
  const isLoading =
    (tabValue === 0 && loadingCreated) || (tabValue === 1 && loadingJoined)
  const hasError =
    (tabValue === 0 && errorCreated) || (tabValue === 1 && errorJoined)

  // Get current events data
  const currentEvents =
    tabValue === 0 ? paginatedCreatedEvents : paginatedJoinedEvents
  const hasData =
    (tabValue === 0 ? createdEvents.length : joinedEvents.length) > 0

  // Функція для перетворення категорій у рядки для відображення
  const getCategoryName = (category: any) => {
    if (
      typeof category === 'object' &&
      category !== null &&
      'name' in category
    ) {
      return category.name
    }
    return category
  }

  return (
    <PageWrapper>
      <Box sx={styles.container}>
        <Box ref={targetBlock} sx={styles.header}>
          <Typography component='h1' fontWeight='bold' variant='h4'>
            {t('event.myEvents.title') || 'My Events'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {activeFilterCount > 0 && (
              <Chip
                deleteIcon={<XCircleIcon />}
                label={`${activeFilterCount} ${
                  activeFilterCount > 1
                    ? t('filters.multiple') || 'filters'
                    : t('filters.single') || 'filter'
                }`}
                onDelete={resetFilters}
                size='small'
                variant='outlined'
              />
            )}

            <Button
              onClick={() => setIsFilterOpen(true)}
              size='small'
              startIcon={<FilterIcon />}
              sx={styles.filterButton}
              variant='outlined'
            >
              {t('event.filters.title') || 'Filters'}
            </Button>
          </Box>
        </Box>

        <Box sx={styles.tabsContainer}>
          <Tabs onChange={handleTabChange} value={tabValue} variant='fullWidth'>
            <Tab
              label={t('event.myEvents.tabs.created') || 'Events I Created'}
            />
            <Tab label={t('event.myEvents.tabs.joined') || 'Events I Joined'} />
          </Tabs>
        </Box>

        {isLoading ? (
          <Box sx={styles.loadingContainer}>
            <Loader />
          </Box>
        ) : hasError ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography color='error'>
              {t('error.fetchingData') || 'Error fetching event data'}
            </Typography>
            <Button
              onClick={() =>
                queryClient.invalidateQueries({
                  queryKey:
                    tabValue === 0
                      ? ['userCreatedEvents']
                      : ['userJoinedEvents']
                })
              }
              sx={{ mt: 2 }}
              variant='outlined'
            >
              {t('button.retry') || 'Retry'}
            </Button>
          </Box>
        ) : !hasData ? (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography color='text.secondary'>
              {tabValue === 0
                ? t('myEvents.noCreatedEvents') ||
                  "You haven't created any events yet."
                : t('event.myEvents.noJoinedEvents') ||
                  "You haven't joined any events yet."}
            </Typography>
          </Box>
        ) : (
          <>
            {/* Events I Created Tab */}
            {tabValue === 0 && (
              <Box>
                {paginatedCreatedEvents.map((event) => (
                  <Card key={event.id} sx={styles.eventCard}>
                    <CardHeader
                      action={getStatusChip(event.status)}
                      subheader={(new DOMParser().parseFromString(event.description, 'text/html').body.textContent || '').slice(0, 50)+'...'}
                      sx={styles.cardHeader}
                      title={event.title}
                    />
                    <CardContent sx={styles.cardContent}>
                      <Box sx={styles.eventMeta}>
                        <Box sx={styles.metaItem}>
                          <CalendarIcon fontSize='small' sx={{ mr: 0.5 }} />
                          {formatDate(event.startDate)}
                        </Box>
                        <Box sx={styles.metaItem}>
                          <MapPinIcon fontSize='small' sx={{ mr: 0.5 }} />
                          {event.city}
                        </Box>
                        <Box sx={styles.metaItem}>
                          <UsersIcon fontSize='small' sx={{ mr: 0.5 }} />
                          {event.participantsCount}/{event.volunteerSlots}{' '}
                          {t('event.volunteers') || 'volunteers'}
                        </Box>
                      </Box>

                      <Box sx={styles.categoriesContainer}>
                        {event.categories.map((category, index) => (
                          <Chip
                            key={index}
                            label={
                              t(
                                `event.categories.${getCategoryName(category)}`
                              ) || getCategoryName(category)
                            }
                            size='small'
                            variant='outlined'
                          />
                        ))}
                      </Box>

                      {/* Кнопка для відображення заявок */}
                      <Button
                        onClick={() => showEventAssignments(event.id)}
                        variant='text'
                        sx={styles.showApplicantsButton}
                        startIcon={
                          selectedEventId === event.id ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )
                        }
                      >
                        {selectedEventId === event.id
                          ? t('event.hideApplicants') || 'Hide applicants'
                          : t('event.showApplicants') || 'Show applicants'}
                      </Button>

                      {/* Відображення заявок для вибраної події */}
                      {selectedEventId === event.id && (
                        <>
                          <Divider sx={{ my: 2 }} />

                          {loadingAssignments ? (
                            <Box textAlign='center' py={2}>
                              <CircularProgress size={24} />
                            </Box>
                          ) : errorAssignments ? (
                            <Typography color='error' textAlign='center' py={2}>
                              {t('error.loadingApplicants') ||
                                'Error loading applicants'}
                            </Typography>
                          ) : eventAssignmentsData &&
                            eventAssignmentsData.length > 0 ? (
                            <>
                              <Typography sx={{ mb: 2 }} variant='subtitle1'>
                                {t('event.applicants', {
                                  count: eventAssignmentsData.length
                                }) ||
                                  `Applicants (${eventAssignmentsData.length})`}
                              </Typography>

                              <Box>
                                {eventAssignmentsData
                                  .filter(
                                    (assignment) =>
                                      assignment.status ===
                                      EventAssignmentStatus.PENDING
                                  )
                                  .map((assignment) => (
                                    <Box
                                      key={assignment.id}
                                      sx={styles.applicantItem}
                                    >
                                      <Box sx={styles.applicantInfo}>
                                        <Avatar>
                                          {assignment.user.name
                                            ? assignment.user.name.charAt(0)
                                            : 'U'}
                                        </Avatar>
                                        <Box>
                                          <Typography variant='body1'>
                                            {assignment.user.name}
                                          </Typography>
                                          <Typography
                                            color='text.secondary'
                                            variant='body2'
                                          >
                                            {assignment.user.email}
                                          </Typography>
                                          <Typography
                                            color='text.secondary'
                                            variant='caption'
                                          >
                                            {formatDate(assignment.joinedAt)}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box sx={styles.applicantActions}>
                                        <Button
                                          disabled={acceptMutation.isPending}
                                          onClick={() =>
                                            handleApplicantAction(
                                              event.id,
                                              assignment.user.id,
                                              'ACCEPT'
                                            )
                                          }
                                          size='small'
                                          startIcon={<CheckIcon />}
                                          variant='outlined'
                                        >
                                          {t('event.button.accept') || 'Accept'}
                                        </Button>
                                        <Button
                                          color='error'
                                          disabled={rejectMutation.isPending}
                                          onClick={() =>
                                            handleApplicantAction(
                                              event.id,
                                              assignment.user.id,
                                              'REJECT'
                                            )
                                          }
                                          size='small'
                                          startIcon={<XIcon />}
                                          variant='outlined'
                                        >
                                          {t('event.button.reject') || 'Reject'}
                                        </Button>
                                      </Box>
                                    </Box>
                                  ))}

                                {eventAssignmentsData.filter(
                                  (a) =>
                                    a.status === EventAssignmentStatus.PENDING
                                ).length === 0 && (
                                  <Typography
                                    textAlign='center'
                                    color='text.secondary'
                                  >
                                    {t('event.noPendingApplicants') ||
                                      'No pending applications'}
                                  </Typography>
                                )}
                              </Box>
                            </>
                          ) : (
                            <Typography
                              color='text.secondary'
                              textAlign='center'
                              py={2}
                            >
                              {t('event.noApplicants') || 'No applicants yet'}
                            </Typography>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            {/* Events I Joined Tab */}
            {tabValue === 1 && (
              <Stack spacing={3} sx={styles.joinedEventsContainer}>
                {paginatedJoinedEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader
                      action={getStatusChip(
                        event.applicationStatus || event.status
                      )} //TODO: REPLACE WITH USER STATUS
                      sx={styles.cardHeader}
                      title={event.title}
                    />
                    <CardContent sx={styles.cardContent}>
                      <Typography
                        color='text.secondary'
                        sx={{ mb: 2 }}
                        variant='body2'
                      >
                        {event.description}
                      </Typography>

                      <Box sx={styles.categoriesContainer}>
                        {event.categories.map((category, index) => (
                          <Chip
                            key={index}
                            label={
                              t(
                                `event.categories.${getCategoryName(category)}`
                              ) || getCategoryName(category)
                            }
                            size='small'
                            variant='outlined'
                          />
                        ))}
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Box sx={styles.metaItem}>
                          <CalendarIcon fontSize='small' sx={{ mr: 0.5 }} />
                          {formatDate(event.startDate)}
                        </Box>
                        <Box mt={1} sx={styles.metaItem}>
                          <MapPinIcon fontSize='small' sx={{ mr: 0.5 }} />
                          {event.city}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </>
        )}

        {hasData && (
          <Box sx={styles.paginationContainer}>
            <Pagination
              color='primary'
              count={getPageCount()}
              onChange={handlePageChange}
              page={currentPage}
              showFirstButton
              showLastButton
            />
          </Box>
        )}

        <Drawer
          anchor='right'
          onClose={() => setIsFilterOpen(false)}
          open={isFilterOpen}
        >
          <Box sx={styles.drawerContent}>
            <Typography component='h2' variant='h6'>
              {t('event.filters.title') || 'Event Filters'}
            </Typography>

            <Box component='form' sx={styles.filterForm}>
              <TextField
                fullWidth
                label={t('event.filters.search') || 'Search'}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                placeholder={
                  t('event.filters.searchPlaceholder') || 'Search events...'
                }
                value={filters.search}
              />

              <FormControl fullWidth>
                <InputLabel id='status-label'>
                  {t('event.filters.status') || 'Status'}
                </InputLabel>
                <Select
                  label={t('event.filters.status') || 'Status'}
                  labelId='status-label'
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value as string })
                  }
                  value={filters.status}
                >
                  <MenuItem value=''>
                    {t('event.filters.allStatuses') || 'All Statuses'}
                  </MenuItem>
                  <MenuItem value='ACTIVE'>
                    {t('event.eventStatus.ONGOING') || 'Active'}
                  </MenuItem>
                  <MenuItem value='COMPLETED'>
                    {t('event.eventStatus.COMPLETED') || 'Completed'}
                  </MenuItem>
                  <MenuItem value='NEW'>
                    {t('event.eventStatus.NEW') || 'New'}
                  </MenuItem>
                  <MenuItem value='CANCELED'>
                    {t('event.eventStatus.CANCELED') || 'Canceled'}
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id='category-label'>
                  {t('event.filters.category') || 'Category'}
                </InputLabel>
                <Select
                  label={t('event.filters.category') || 'Category'}
                  labelId='category-label'
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      category: e.target.value as string
                    })
                  }
                  value={filters.category}
                >
                  <MenuItem value=''>
                    {t('event.filters.allCategories') || 'All Categories'}
                  </MenuItem>
                  <MenuItem value='Environment'>
                    {t('event.categories.Environment') || 'Environment'}
                  </MenuItem>
                  <MenuItem value='Community'>
                    {t('event.categories.Community') || 'Community'}
                  </MenuItem>
                  <MenuItem value='Charity'>
                    {t('event.categories.Charity') || 'Charity'}
                  </MenuItem>
                  <MenuItem value='Animals'>
                    {t('event.categories.Animals') || 'Animals'}
                  </MenuItem>
                  <MenuItem value='Social'>
                    {t('event.categories.Social') || 'Social Work'}
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label={t('event.filters.city') || 'City'}
                onChange={(e) =>
                  setFilters({ ...filters, city: e.target.value })
                }
                placeholder={
                  t('event.filters.cityPlaceholder') || 'Filter by city'
                }
                value={filters.city}
              />

              <Stack direction='row' spacing={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label={t('event.filters.fromDate') || 'From Date'}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                  type='date'
                  value={filters.dateFrom}
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label={t('event.filters.toDate') || 'To Date'}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                  type='date'
                  value={filters.dateTo}
                />
              </Stack>

              <Box sx={styles.filterActions}>
                <Button onClick={resetFilters} variant='outlined'>
                  {t('button.clearFilters') || 'Reset'}
                </Button>
                <Button onClick={applyFilters} variant='contained'>
                  {t('button.applyFilters') || 'Apply Filters'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Drawer>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          open={snackbar.open}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={
              snackbar.severity as 'success' | 'info' | 'warning' | 'error'
            }
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </PageWrapper>
  )
}
