import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Box, Grid, Fade, LinearProgress, Stack } from '@mui/material'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import UsersList from './users-list'
import ChatArea from './chat-area'
import { useAppSelector } from '~/hooks/use-redux'
import { Conversation, ChatUser, Message } from '~/types/chat-types'
import { conversationsApi, messagesApi } from '~/services/conversations-service'

interface ChatLayoutProps {
  connectionStatus: string
  currentUserName?: string
  sendMessage: (message: any) => void
  lastMessage: any
  allUsers: ChatUser[]
  // Нові параметри
  initialConversationId?: string
  initialConversation?: Conversation
  onConversationChange?: (conversationId: string | null) => void
}

export default function ChatLayout({
  connectionStatus,
  currentUserName,
  sendMessage,
  lastMessage,
  allUsers,
  initialConversationId,
  initialConversation,
  onConversationChange
}: ChatLayoutProps) {
  const queryClient = useQueryClient()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // State
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [showUsersList, setShowUsersList] = useState(!isMobile)
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null)
  const userId = useAppSelector((state) => state.appMain.userId)
  const shouldScrollToBottomRef = useRef(true)

  useEffect(() => {
    if (initialConversationId && initialConversation && !selectedUser) {
      // Знайти відповідного користувача з розмови
      const otherParticipant = initialConversation.participants.find(
        (p) => p.id !== userId
      )

      if (otherParticipant) {
        // Встановити користувача і ID розмови
        setSelectedUser(otherParticipant)
        setCurrentConversationId(initialConversationId)
      }
    }
  }, [initialConversationId, initialConversation, selectedUser, userId])

  // Сповіщення про зміну активної розмови для оновлення URL
  useEffect(() => {
    if (onConversationChange && currentConversationId !== undefined) {
      onConversationChange(currentConversationId)
    }
  }, [currentConversationId, onConversationChange])
  // Fetch conversations
  const { data: conversations = [], isLoading: isLoadingConversations } =
    useQuery({
      queryKey: ['conversations'],
      queryFn: conversationsApi.getUserConversations,
      enabled: !!userId,
      staleTime: 1000 * 60 * 5
    })

  // Extract unique users from conversations
  const users = useMemo(() => {
    const uniqueUsers: Record<string, ChatUser> = {}
    conversations.forEach((conv: Conversation) => {
      if (!conv.isGroup) {
        conv.participants.forEach((participant) => {
          if (participant.id !== userId) {
            uniqueUsers[participant.id] = participant
          }
        })
      }
    })
    return Object.values(uniqueUsers)
  }, [conversations, userId])

  const availableUsers = useMemo(() => {
    const existingUserMap: Record<string, boolean> = {}
    users.forEach((user) => {
      existingUserMap[user.id] = true
    })

    const additionalUsers = allUsers.filter(
      (user) => !existingUserMap[user.id] && user.id !== userId
    )

    return [...users, ...additionalUsers]
  }, [users, allUsers, userId])

  const { mutate: markAsRead } = useMutation({
    mutationFn: messagesApi.markAsRead,
    onSuccess: (_, variables) => {
      // Update messages cache
      queryClient.setQueryData(
        ['messages', currentConversationId, selectedUser?.id],
        (oldData: Message[] = []) =>
          oldData.map((msg) =>
            variables.includes(msg.id) ? { ...msg, isRead: true } : msg
          )
      )

      queryClient.setQueryData(
        ['conversations'],
        (oldData: Conversation[] = []) =>
          oldData.map((conv) => {
            const isCurrentConversation =
              (currentConversationId && conv.id === currentConversationId) ||
              (!currentConversationId &&
                selectedUser &&
                conv.participants.some((p) => p.id === selectedUser.id))

            return isCurrentConversation ? { ...conv, unreadCount: 0 } : conv
          })
      )
    }
  })
  // Замініть запит на отримання повідомлень (рядки 132-149):

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', currentConversationId, selectedUser?.id],
    queryFn: async () => {
      if (!selectedUser) return []

      try {
        if (currentConversationId) {
          console.log(
            `Fetching messages for conversation: ${currentConversationId}`
          )
          const fetchedMessages = await messagesApi.getConversationMessages(
            currentConversationId
          )
          return fetchedMessages
        } else {
          console.log(
            `Creating/finding conversation with user: ${selectedUser.id}`
          )
          const conversation = await conversationsApi.createOrFindConversation(
            selectedUser.id
          )
          setCurrentConversationId(conversation.id)
          return conversation.messages || []
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        return [] // Повертаємо пустий масив в разі помилки
      }
    },
    enabled: !!selectedUser,
    refetchOnWindowFocus: false,
    staleTime: 0
  })

  console.log('Messages:', messages)
  const { mutate: createConversation } = useMutation({
    mutationFn: conversationsApi.createOrFindConversation,
    onSuccess: (conversation) => {
      setCurrentConversationId(conversation.id)
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }
  })

  const handleNewMessage = useCallback(
    (messageData: any) => {
      console.log('Processing new message:', messageData)

      // Extract actual message data if wrapped in a payload
      const message = messageData.payload || messageData

      // Is message for current conversation?
      const isForCurrentConversation =
        (selectedUser && message.senderId === selectedUser.id) ||
        (currentConversationId &&
          message.conversationId === currentConversationId)

      if (isForCurrentConversation) {
        // If this is a message for the current conversation, add it to the messages
        queryClient.setQueryData(
          ['messages', currentConversationId, selectedUser?.id],
          (oldData: Message[] = []) => [...oldData, message]
        )

        // Mark as read if from other user
        if (message.senderId !== userId) {
          // Mark message as read in the database
          messagesApi.markAsRead([message.id])
        }
      }

      // Update conversations list with new message data
      queryClient.setQueryData(
        ['conversations'],
        (oldData: Conversation[] = []) =>
          oldData.map((conv) => {
            // Find the conversation this message belongs to
            const isRelatedConversation =
              conv.id === message.conversationId ||
              (!conv.isGroup &&
                conv.participants.some(
                  (p) =>
                    p.id === message.senderId || p.id === message.receiverId
                ))

            if (isRelatedConversation) {
              return {
                ...conv,
                lastMessage: message,
                updatedAt: message.timestamp || message.createdAt,
                // If this is the current conversation, mark it as read
                unreadCount: isForCurrentConversation
                  ? 0
                  : (conv.unreadCount || 0) + 1
              }
            }
            return conv
          })
      )

      // If this is a new conversation we don't have in the list yet, fetch all conversations
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['conversations'] })
      }, 500)
    },
    [selectedUser, currentConversationId, userId, queryClient]
  )

  useEffect(() => {
    if (!lastMessage) return

    try {
      console.log('Received message from socket:', lastMessage)

      // Обробка повідомлення на основі його формату
      if (lastMessage.type === 'new_message') {
        // Обробка структурованого повідомлення з payload
        handleNewMessage(lastMessage.payload)
      }
      // Пряме повідомлення без обгортки
      else if (lastMessage.id || lastMessage.content) {
        handleNewMessage(lastMessage)
      }
      // Pong response або службове повідомлення
      else if (lastMessage.timestamp) {
        console.log(
          'Received service message with timestamp:',
          lastMessage.timestamp
        )
      }
    } catch (error) {
      console.error('Error processing message:', error)
    }
  }, [lastMessage, handleNewMessage])

  // Send message handler
  const handleSendMessage = useCallback(
    async (content: string, attachments: File[] = []) => {
      if (!selectedUser || !content.trim()) return

      try {
        const processedAttachments = await Promise.all(
          attachments.map(async (file) => ({
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
            size: file.size
          }))
        )

        // Знаходимо отримувача повідомлення
        let receiverId

        // Спочатку намагаємося отримати зі створеної розмови
        if (currentConversationId) {
          const conversation = conversations.find(
            (c) => c.id === currentConversationId
          )
          if (conversation) {
            receiverId = conversation.participants.find(
              (p) => p.id !== userId
            )?.id
          }
        }

        // Якщо не знайдено, використовуємо ID обраного користувача
        if (!receiverId) {
          receiverId = selectedUser.id
        }

        console.log('Sending message with receiverId:', receiverId)

        sendMessage({
          content,
          receiverId, // Завжди передаємо receiverId
          conversationId: currentConversationId,
          attachments: processedAttachments,
          timestamp: new Date().toISOString() // Додаємо стандартний формат ISO
        })
      } catch (error) {
        console.error('Error sending message:', error)
      }
    },
    [selectedUser, currentConversationId, sendMessage, userId, conversations]
  )

  // Select user and create/find conversation
  const handleUserSelect = useCallback(
    async (user: ChatUser, conversationId?: string) => {
      setSelectedUser(user)

      if (conversationId) {
        setCurrentConversationId(conversationId)
      } else {
        try {
          const existingConversation = conversations.find(
            (conv: Conversation) =>
              !conv.isGroup &&
              conv.participants.some((p: ChatUser) => p.id === user.id)
          )

          if (existingConversation) {
            setCurrentConversationId(existingConversation.id)
          } else {
            createConversation(user.id)
          }
        } catch (error) {
          console.error('Error creating conversation:', error)
        }
      }

      shouldScrollToBottomRef.current = true

      // Hide users list on mobile when user selected
      if (isMobile) {
        setShowUsersList(false)
      }
    },
    [isMobile, conversations, createConversation]
  )

  const handleBackToUsersList = useCallback(() => {
    setShowUsersList(true)
  }, [])

  useEffect(() => {
    setShowUsersList(!isMobile || !selectedUser)
  }, [isMobile, selectedUser])

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {isLoadingConversations && (
        <Fade in={isLoadingConversations} style={{ transitionDelay: '300ms' }}>
          <LinearProgress
            sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}
          />
        </Fade>
      )}

      <Stack
        direction='row'
        sx={{ height: '100%', overflow: 'hidden', width: '100%' }}
      >
        {' '}
        {(!isMobile || showUsersList) && (
          <Box
            sx={{
              width: { xs: '100%', md: '30%', lg: '30%' },
              height: '100%',
              display: {
                xs: showUsersList ? 'flex' : 'none',
                md: 'flex'
              },
              flexDirection: 'column',
              borderRight: 1,
              borderColor: 'divider'
            }}
          >
            <UsersList
              availableUsers={availableUsers}
              conversations={conversations}
              onUserSelect={handleUserSelect}
              selectedUser={selectedUser}
              users={users}
            />
          </Box>
        )}
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: '100%', md: '70%', lg: '80%' },
            height: '100%',
            display: {
              xs: showUsersList ? 'none' : 'flex',
              md: 'flex'
            },
            flexDirection: 'column'
          }}
        >
          <ChatArea
            connectionStatus={connectionStatus}
            messages={messages}
            onBackClick={isMobile ? handleBackToUsersList : undefined}
            onSendMessage={handleSendMessage}
            selectedUser={selectedUser}
          />
        </Box>
      </Stack>
    </Box>
  )
}
