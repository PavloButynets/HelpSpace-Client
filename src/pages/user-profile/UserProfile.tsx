import type React from "react"

import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"
import { Stack } from "@mui/system"
import { CalendarMonth, Email, LocationOn, Star, AccessTime, People } from "@mui/icons-material"
import UserReviews from "../../containers/user-profile/UserReviews"
import UserStats from "../../containers/user-profile/UserStats"
import UserEvents from "../../containers/user-profile/UserEvents"
import UserBadges from "../../containers/user-profile/UserBadges"

// This would be replaced with your actual data fetching logic
function getUser(id: string) {
  // Simulate API call
  // In a real app, you would fetch this data from your backend
  return {
    id: '1',
    name: "Oleksandr Petrenko",
    username: "alex_volunteer",
    avatar: "/placeholder.svg",
    city: "Kyiv",
    bio: "Passionate about community service and making a difference. I've been volunteering for over 3 years in various environmental and social projects.",
    totalVolunteerHours: 156,
    completedEvents: 23,
    joinedDate: "2021-05-15",
    skills: ["Project Management", "First Aid", "Teaching", "Environmental"],
    badges: [
      { name: "Super Volunteer", description: "Completed 20+ events" },
      { name: "Community Leader", description: "Organized 5+ successful events" },
      { name: "First Responder", description: "Trained in emergency response" },
    ],
    rating: 4.8,
    reviewCount: 17,
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
      aria-labelledby={`user-tab-${index}`}
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `user-tab-${index}`,
    "aria-controls": `user-tabpanel-${index}`,
  }
}

export default function UserProfile() {
  const { id } = useParams<{ id: string }>()
  const [tabValue, setTabValue] = useState(0)
  const user = getUser(id || "default-id")

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            alignItems="stretch"
        >
          {/* Left column - User info */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card>
                <CardHeader
                    avatar={
                      <Avatar
                          alt={user.name}
                          src={user.avatar}
                          sx={{ width: 80, height: 80 }}
                      />
                    }
                    subheader={
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                        <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography color="text.secondary" variant="body2">
                          {user.city}
                        </Typography>
                      </Box>
                    }
                    title={
                      <Typography component="h1" variant="h5">
                        {user.name}
                      </Typography>
                    }
                />
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Star sx={{ color: "gold", mr: 0.5 }} />
                    <Typography
                        fontWeight="medium"
                        sx={{ mr: 0.5 }}
                        variant="body1"
                    >
                      {user.rating}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      ({user.reviewCount} reviews)
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography gutterBottom variant="subtitle1">
                      About
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {user.bio}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography gutterBottom variant="subtitle1">
                      Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {user.skills.map((skill) => (
                          <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              variant="outlined"
                          />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                    <Button fullWidth startIcon={<Email />} color="primary" variant="contained">
                      Send Message
                    </Button>
                    <Button fullWidth startIcon={<CalendarMonth />} variant="outlined">
                      View Events
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardHeader title="Volunteer Stats" titleTypographyProps={{ variant: "h6" }} />
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTime sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography>Total Hours</Typography>
                    </Box>
                    <Typography fontWeight="medium">{user.totalVolunteerHours}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography>Events Completed</Typography>
                    </Box>
                    <Typography fontWeight="medium">{user.completedEvents}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <People sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography>Member Since</Typography>
                    </Box>
                    <Typography fontWeight="medium">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <UserBadges badges={user.badges} />
            </Box>
          </Box>

          {/* Right column - Tabs with content */}
          <Box sx={{ flex: 2 }}>
            <Card>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    aria-label="user profile tabs"
                    onChange={handleTabChange}
                    value={tabValue}
                    variant="fullWidth"
                >
                  <Tab label="Reviews" {...a11yProps(0)} />
                  <Tab label="Impact" {...a11yProps(1)} />
                  <Tab label="Events" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <TabPanel index={0} value={tabValue}>
                <UserReviews userId={user.id} />
              </TabPanel>

              <TabPanel index={1} value={tabValue}>
                <UserStats userId={user.id} />
              </TabPanel>

              <TabPanel index={2} value={tabValue}>
                <UserEvents userId={user.id} />
              </TabPanel>
            </Card>
          </Box>
        </Stack>
      </Container>
  )
}
