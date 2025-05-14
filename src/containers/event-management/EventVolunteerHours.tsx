"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  Chip,
  Rating,
} from "@mui/material"
import { Add, AccessTime, CalendarMonth } from "@mui/icons-material"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Loader from "~/components/loader/Loader"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

interface VolunteerHoursRecord {
  id: string
  hours: number
  date: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  feedback?: string
  rating?: number
}

interface EventVolunteerHoursProps {
  eventId: string
  userId: string
}

const styles = {
  container: {
    mt: 4,
    p: 3,
    borderRadius: 2,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    bgcolor: "background.paper",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  hoursItem: {
    mb: 2,
    p: 2,
    borderRadius: 1,
    border: "1px solid",
    borderColor: "divider",
  },
  hoursHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 1,
  },
  hoursDate: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: "text.secondary",
    fontSize: "0.875rem",
  },
  hoursValue: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
  },
  statusChip: {
    fontWeight: "medium",
    mt: 1,
  },
  feedback: {
    mt: 2,
    p: 1.5,
    bgcolor: "action.hover",
    borderRadius: 1,
  },
  noData: {
    textAlign: "center",
    py: 4,
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
}

const EventVolunteerHours = ({ eventId, userId }: EventVolunteerHoursProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [hours, setHours] = useState<number | string>("")
  const [date, setDate] = useState<Date | null>(new Date())
  const [error, setError] = useState("")

  const queryClient = useQueryClient()

  // Mock query for volunteer hours - replace with actual API integration
  const { data: volunteerHours, isLoading } = useQuery({
    queryKey: ["myVolunteerHours", eventId, userId],
    queryFn: () => {
      // This would be replaced with an actual API call
      // return EventService.getMyVolunteerHours(eventId);

      // Mock data for demonstration
      return Promise.resolve([
        {
          id: "1",
          hours: 4.5,
          date: "2025-04-15T10:00:00",
          status: "PENDING",
        },
        {
          id: "2",
          hours: 6,
          date: "2025-04-14T09:30:00",
          status: "APPROVED",
          feedback: "Great work at the registration desk!",
          rating: 5,
        },
        {
          id: "3",
          hours: 3,
          date: "2025-04-13T11:00:00",
          status: "REJECTED",
          feedback: "Hours reported do not match attendance records.",
          rating: 2,
        },
      ] as VolunteerHoursRecord[])
    },
    enabled: !!eventId && !!userId,
  })

  // Mock mutation for submitting hours
  const { mutate: submitHours, isPending: isSubmitting } = useMutation({
    mutationFn: (data: { hours: number; date: Date }) => {
      // This would be replaced with an actual API call
      // return EventService.submitVolunteerHours(eventId, data.hours, data.date);
      return Promise.resolve({ success: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVolunteerHours", eventId, userId] })
      handleCloseDialog()
    },
    onError: (error) => {
      setError("Failed to submit hours. Please try again.")
    },
  })

  const handleOpenDialog = () => {
    setDialogOpen(true)
    setHours("")
    setDate(new Date())
    setError("")
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleSubmit = () => {
    // Validate input
    if (!hours || !date) {
      setError("Please enter both hours and date")
      return
    }

    const hoursNum = Number(hours)
    if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) {
      setError("Please enter a valid number of hours (between 0 and 24)")
      return
    }

    submitHours({
      hours: hoursNum,
      date: date,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning"
      case "APPROVED":
        return "success"
      case "REJECTED":
        return "error"
      default:
        return "default"
    }
  }

  if (isLoading) {
    return (
      <Box sx={styles.container}>
        <Loader size={40} />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography component="h2" fontWeight="bold" variant="h5">
          My Volunteer Hours
        </Typography>
        <Button color="primary" onClick={handleOpenDialog} startIcon={<Add />} variant="contained">
          Log Hours
        </Button>
      </Box>

      {volunteerHours && volunteerHours.length > 0 ? (
        <List>
          {volunteerHours.map((record, index) => (
            <Paper elevation={0} key={record.id} sx={styles.hoursItem}>
              <Box sx={styles.hoursHeader}>
                <Box sx={styles.hoursDate}>
                  <CalendarMonth fontSize="small" />
                  <Typography>{new Date(record.date).toLocaleDateString()}</Typography>
                </Box>
                <Box sx={styles.hoursValue}>
                  <AccessTime fontSize="small" />
                  <Typography fontWeight="medium">{record.hours} hours</Typography>
                </Box>
              </Box>

              <Chip color={getStatusColor(record.status)} label={record.status} size="small" sx={styles.statusChip} />

              {(record.feedback || record.rating) && (
                <Box sx={styles.feedback}>
                  {record.rating && (
                    <Box sx={{ mb: 1 }}>
                      <Rating readOnly size="small" value={record.rating} />
                    </Box>
                  )}
                  {record.feedback && <Typography variant="body2">{record.feedback}</Typography>}
                </Box>
              )}
            </Paper>
          ))}
        </List>
      ) : (
        <Box sx={styles.noData}>
          <Typography color="text.secondary">You haven't logged any hours for this event yet</Typography>
          <Button color="primary" onClick={handleOpenDialog} startIcon={<Add />} sx={{ mt: 2 }} variant="outlined">
            Log Your Hours
          </Button>
        </Box>
      )}

      {/* Log Hours Dialog */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog fullWidth maxWidth="sm" onClose={handleCloseDialog} open={dialogOpen}>
          <DialogTitle>Log Volunteer Hours</DialogTitle>
          <DialogContent>
            <Box sx={styles.dialogContent}>
              {error && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                inputProps={{ min: 0.5, max: 24, step: 0.5 }}
                label="Hours Worked"
                margin="normal"
                onChange={(e) => setHours(e.target.value)}
                placeholder="Enter number of hours"
                type="number"
                value={hours}
              />

              <DatePicker label="Date" onChange={(newDate) => setDate(newDate)} value={date} />

              <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
                Please log your hours accurately. Your submission will be reviewed by the event organizer.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button color="primary" disabled={isSubmitting} onClick={handleSubmit} variant="contained">
              Submit Hours
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Box>
  )
}

export default EventVolunteerHours
