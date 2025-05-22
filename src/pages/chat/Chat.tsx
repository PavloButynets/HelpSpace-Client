import { useEffect } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ChatLayout from '~/containers/chat/chat-layout'
import PageWrapper from '~/containers/page-wrapper/PageWrapper'
import { useSocketIO } from '~/hooks/use-socketio'
import { useAppSelector } from '~/hooks/use-redux'
import { useQuery } from '@tanstack/react-query'
import { usersApi, conversationsApi } from '~/services/conversations-service'

export default function Chat() {
  const { userId } = useAppSelector((state) => state.appMain)
  const navigate = useNavigate()
  const location = useLocation()
  const { conversationId } = useParams<{ conversationId?: string }>()

  // Fetch all users
  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAllUsers,
    staleTime: 1000 * 60 * 5
  })

  // Fetch conversation details if conversationId is provided in URL
  const { data: initialConversation } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => conversationsApi.getConversationById(conversationId!),
    enabled: !!conversationId,
    staleTime: 1000 * 60 * 5,
    // Don't refetch on window focus to avoid disrupting the chat
    refetchOnWindowFocus: false
  })

  const { connect, disconnect, sendMessage, connectionStatus, lastMessage } =
    useSocketIO('http://localhost:5000')

  // Connect on mount
  useEffect(() => {
    if (userId) {
      connect(userId)
      return () => disconnect()
    }
  }, [userId, connect, disconnect])

  // Handle URL navigation
  const handleConversationChange = (conversationId: string | null) => {
    // Update URL when conversation changes without full reload
    if (conversationId) {
      // Check if we're already on this URL to avoid unnecessary navigation
      if (!location.pathname.endsWith(conversationId)) {
        navigate(`/chat/${conversationId}`, { replace: true })
      }
    } else {
      // If no conversation is selected, just show the main chat page
      navigate('/chat', { replace: true })
    }
  }

  // Loading state
  if (connectionStatus === 'idle' || connectionStatus === 'disconnected') {
    return (
      <PageWrapper>
        <Box
          sx={{
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      </PageWrapper>
    )
  }

  // Error state
  if (connectionStatus === 'error') {
    return (
      <PageWrapper>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color='error' variant='h5'>
            Could not connect to chat server
          </Typography>
        </Box>
      </PageWrapper>
    )
  }

  // Connected state
  return (
    <PageWrapper>
      <Box sx={{ height: 'calc(100vh - 64px)' }}>
        <ChatLayout
          allUsers={allUsers}
          connectionStatus={connectionStatus}
          initialConversationId={conversationId}
          initialConversation={initialConversation}
          currentUserName='User'
          lastMessage={lastMessage}
          sendMessage={(msg) => sendMessage('chat_message', msg)}
          onConversationChange={handleConversationChange}
        />
      </Box>
    </PageWrapper>
  )
}
