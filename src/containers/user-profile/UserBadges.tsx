import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material"
import { EmojiEvents } from "@mui/icons-material"

type Badge = {
  name: string
  description: string
}

interface UserBadgesProps {
  badges: Badge[]
}

export default function UserBadges({ badges }: UserBadgesProps) {
  if (!badges || badges.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader
        subheader="Badges earned through volunteering"
        subheaderTypographyProps={{ variant: "body2" }}
        title="Achievements"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {badges.map((badge) => (
            <Box key={badge.name} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: "primary.light",
                  borderRadius: "50%",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <EmojiEvents fontSize="small" sx={{ color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="subtitle2">{badge.name}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {badge.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
