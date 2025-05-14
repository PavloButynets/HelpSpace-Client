import {Box, Card, CardContent, CardHeader, Grid, LinearProgress, Typography} from "@mui/material"
import { BarChart } from "@mui/x-charts/BarChart"
import { Stack } from "@mui/material"

// Mock data for impact statistics
const MOCK_IMPACT_DATA = {
  categories: [
    { name: "Environmental", hours: 62, events: 8 },
    { name: "Social Services", hours: 45, events: 7 },
    { name: "Education", hours: 28, events: 5 },
    { name: "Healthcare", hours: 21, events: 3 },
  ],
  monthly: [
    { name: "Jan", hours: 12 },
    { name: "Feb", hours: 8 },
    { name: "Mar", hours: 15 },
    { name: "Apr", hours: 10 },
    { name: "May", hours: 18 },
    { name: "Jun", hours: 14 },
    { name: "Jul", hours: 20 },
    { name: "Aug", hours: 16 },
    { name: "Sep", hours: 22 },
    { name: "Oct", hours: 12 },
    { name: "Nov", hours: 9 },
    { name: "Dec", hours: 0 },
  ],
  impact: {
    treesPlanted: 45,
    mealsServed: 320,
    peopleHelped: 178,
    wasteCollected: 230, // in kg
  },
}

interface UserStatsProps {
  userId: string
}

export default function UserStats({ userId }: UserStatsProps) {
  // In a real app, you would fetch stats based on the userId
  const stats = MOCK_IMPACT_DATA

  // Calculate total hours for percentage
  const totalHours = stats.categories.reduce((sum, category) => sum + category.hours, 0)

  // Prepare data for MUI X Charts
  const chartData = stats.monthly.map((item) => item.hours)
  const chartLabels = stats.monthly.map((item) => item.name)

  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom variant="h6">
        Volunteer Impact
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
        <Card variant="outlined">
          <CardHeader
            subheader="Distribution of volunteer hours across different categories"
            subheaderTypographyProps={{ variant: "body2" }}
            title="Impact by Category"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {stats.categories.map((category) => (
                <Box key={category.name}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography fontWeight="medium" variant="body2">
                        {category.name}
                      </Typography>
                      <Typography color="text.secondary" sx={{ ml: 1 }} variant="body2">
                        ({category.events} events)
                      </Typography>
                    </Box>
                    <Typography variant="body2">{category.hours} hours</Typography>
                  </Box>
                  <LinearProgress
                    sx={{ height: 8, borderRadius: 1 }}
                    value={(category.hours / totalHours) * 100}
                    variant="determinate"
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader
            subheader="Volunteer hours contributed each month"
            subheaderTypographyProps={{ variant: "body2" }}
            title="Monthly Activity"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Box sx={{ height: 300, width: "100%" }}>
              <BarChart
                height={300}
                series={[{ data: chartData, label: "Hours" }]}
                xAxis={[{ data: chartLabels, scaleType: "band" }]}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
