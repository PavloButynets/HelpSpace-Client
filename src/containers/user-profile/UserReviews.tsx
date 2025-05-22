import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Typography
} from '@mui/material'
import { UserService } from '~/services/user-service'
import { useQuery } from '@tanstack/react-query'

// Mock data for reviews
const MOCK_REVIEWS = [
  {
    id: '1',
    author: {
      name: 'Maria Kovalenko',
      avatar: '/placeholder.svg'
    },
    rating: 5,
    date: '2023-08-15',
    content:
      'Oleksandr was an amazing volunteer at our community cleanup event. He showed great initiative and leadership skills, helping to organize other volunteers and ensure the project was completed efficiently.',
    eventTitle: 'City Park Cleanup'
  },
  {
    id: '2',
    author: {
      name: 'Ivan Melnyk',
      avatar: '/placeholder.svg'
    },
    rating: 5,
    date: '2023-06-22',
    content:
      'Very dedicated and reliable. Oleksandr arrived early and stayed late to help with our food distribution event. Would definitely work with him again!',
    eventTitle: 'Food Bank Distribution'
  },
  {
    id: '3',
    author: {
      name: 'Natalia Shevchenko',
      avatar: '/placeholder.svg'
    },
    rating: 4,
    date: '2023-04-10',
    content:
      'Great communication skills and very helpful with the children at our educational workshop. The kids loved his energy and enthusiasm.',
    eventTitle: "Children's Educational Workshop"
  },
  {
    id: '4',
    author: {
      name: 'Dmytro Boyko',
      avatar: '/placeholder.svg'
    },
    rating: 5,
    date: '2023-02-05',
    content:
      'Oleksandr brought excellent technical skills to our digital literacy program. He was patient with seniors and explained complex concepts in an accessible way.',
    eventTitle: 'Digital Literacy for Seniors'
  }
]

interface UserReviewsProps {
  userId: string
}

export default function UserReviews({ userId }: UserReviewsProps) {
  const [visibleReviews, setVisibleReviews] = useState(3)

  const {
    data: feedbacks,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userFeedbacks', userId],
    queryFn: async () => {
      const response = await UserService.getUserFeedbacks(userId)
      return response
    },
    enabled: !!userId
  })

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }
  if (error) {
    return <Typography color='error'>Error loading reviews</Typography>
  }
  if (!feedbacks || feedbacks.length === 0) {
    return <Typography>No reviews available</Typography>
  }
  const showMoreReviews = () => {
    setVisibleReviews(feedbacks.length)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom variant='h6'>
        Відгуки від організаторів подій
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {feedbacks.slice(0, visibleReviews).map((feedback) => (
          <Card key={feedback.eventId} variant='outlined'>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                  alt={`${feedback.author.firstName} ${feedback.author.lastName}`}
                  src={feedback.author.photo}
                />

                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      mb: 1
                    }}
                  >
                    <Box>
                      <Typography variant='subtitle1'>{`${feedback.author.firstName} ${feedback.author.lastName}`}</Typography>
                      <Typography color='text.secondary' variant='body2'>
                        Подія: {feedback.eventTitle}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: { xs: 1, sm: 0 }
                      }}
                    >
                      <Rating readOnly size='small' value={feedback.stars} />
                      <Typography
                        color='text.secondary'
                        sx={{ ml: 1 }}
                        variant='body2'
                      >
                        {new Date(feedback.joinedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant='body2'>{feedback.feedback}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {visibleReviews < feedbacks.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button onClick={showMoreReviews} variant='outlined'>
            Show More Reviews
          </Button>
        </Box>
      )}
    </Box>
  )
}
