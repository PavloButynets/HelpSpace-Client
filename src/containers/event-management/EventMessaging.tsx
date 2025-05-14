import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Divider,
  Grid,
  IconButton,
  Chip,
} from '@mui/material'
import {
  Send,
  AttachFile,
} from '@mui/icons-material'

const styles = {
  container: {
    padding: '1rem',
  },
  header: {
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagesContainer: {
    height: '500px',
    overflowY: 'auto',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  incomingMessage: {
    backgroundColor: 'white',
    padding: '0.75rem',
    borderRadius: '8px',
    maxWidth: '80%',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  outgoingMessage: {
    backgroundColor: 'primary.light',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '8px',
    maxWidth: '80%',
    marginLeft: 'auto',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  messageForm: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  timestamp: {
    fontSize: '0.75rem',
    color: 'text.secondary',
  },
  avatar: {
    marginRight: '0.5rem',
    width: 32,
    height: 32,
  },
  messageWrapper: {
    display: 'flex',
    marginBottom: '1rem',
    alignItems: 'flex-start',
  },
  messageInfo: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '85%',
  },
  authorName: {
    fontWeight: 500,
    fontSize: '0.875rem',
    marginBottom: '0.25rem',
  },
}

interface EventMessagingProps {
  eventId: string
}

// Mock data for the event chat
const mockEventChat = [
  {
    id: 'msg-1',
    authorId: 'user-1',
    authorName: 'Олександр Петренко',
    authorAvatar: 'https://i.pravatar.cc/150?img=11',
    text: 'Привіт всім! Хотів уточнити деталі завтрашнього заходу. О котрій годині мені потрібно бути на місці?',
    timestamp: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: 'msg-2',
    authorId: 'current-user',
    authorName: 'Ви (Організатор)',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    text: 'Доброго дня! Будь ласка, прибудьте о 9:30 для короткого інструктажу. Паркування доступне позаду будівлі, вхід з вулиці Шевченка.',
    timestamp: new Date(Date.now() - 2.5 * 3600000).toISOString(),
  },
  {
    id: 'msg-3',
    authorId: 'user-2',
    authorName: 'Марія Коваленко',
    authorAvatar: 'https://i.pravatar.cc/150?img=5',
    text: 'Доброго дня! А чи можу я прийти на годину раніше, щоб допомогти з підготовкою?',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: 'msg-4',
    authorId: 'current-user',
    authorName: 'Ви (Організатор)',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    text: 'Так, звісно, будемо раді вашій допомозі з підготовкою.',
    timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString(),
  },
  {
    id: 'msg-5',
    authorId: 'user-3',
    authorName: 'Іван Сидоренко',
    authorAvatar: 'https://i.pravatar.cc/150?img=15',
    text: 'Мені потрібна додаткова інформація про обов\'язки волонтерів. Який дрес-код на події?',
    timestamp: new Date(Date.now() - 1 * 3600000).toISOString(),
  },
  {
    id: 'msg-6',
    authorId: 'current-user',
    authorName: 'Ви (Організатор)',
    authorAvatar: 'https://i.pravatar.cc/150?img=12',
    text: 'Щодо дрес-коду: зручний повсякденний одяг. Якщо можливо, одягніть футболку синього кольору для легкої ідентифікації волонтерів. Детальніше про обов\'язки розкажемо на інструктажі.',
    timestamp: new Date(Date.now() - 0.5 * 3600000).toISOString(),
  },
]

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (date.toDateString() === now.toDateString()) {
    return 'Сьогодні'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчора'
  } else {
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })
  }
}

const EventMessaging = ({ eventId }: EventMessagingProps) => {
  const [messages, setMessages] = useState(mockEventChat)
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = React.useRef<null | HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageText.trim()) return
    
    const newMessage = {
      id: `msg-new-${Date.now()}`,
      authorId: 'current-user',
      authorName: 'Ви (Організатор)',
      authorAvatar: 'https://i.pravatar.cc/150?img=12',
      text: messageText,
      timestamp: new Date().toISOString(),
    }
    
    // Update messages
    setMessages([...messages, newMessage])
    
    // Clear input
    setMessageText('')
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h5">Чат події</Typography>
        <Typography color="text.secondary" variant="subtitle1">
          {messages.length} повідомлень
        </Typography>
      </Box>

      <Grid container spacing={0}>
          <Grid {...{ item: true, md: 3, sm: 6, xs: 12 } as any}>
          <Paper elevation={1}>
            <Box sx={styles.messagesContainer}>
              {messages.map((message, index) => {
                // Check if this message is on a different day than the previous one
                const showDateSeparator = index === 0 || 
                  formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)
                
                return (
                  <React.Fragment key={message.id}>
                    {showDateSeparator && (
                      <Box 
                        sx={{ 
                          textAlign: 'center', 
                          my: 2,
                          position: 'relative',
                        }}
                      >
                        <Divider>
                          <Chip label={formatDate(message.timestamp)} size="small" />
                        </Divider>
                      </Box>
                    )}
                    
                    <Box sx={styles.messageWrapper}>
                      {message.authorId !== 'current-user' && (
                        <Avatar 
                          alt={message.authorName} 
                          src={message.authorAvatar}
                          sx={styles.avatar}
                        />
                      )}
                      <Box sx={styles.messageInfo}>
                        {message.authorId !== 'current-user' && (
                          <Typography color="primary" sx={styles.authorName}>
                            {message.authorName}
                          </Typography>
                        )}
                        <Box 
                          sx={message.authorId === 'current-user' 
                            ? styles.outgoingMessage 
                            : styles.incomingMessage
                          }
                        >
                          <Typography variant="body1">{message.text}</Typography>
                          <Typography 
                            align="right" 
                            display="block" 
                            sx={styles.timestamp} 
                            variant="caption"
                          >
                            {formatTime(message.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </React.Fragment>
                )
              })}
              <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <form onSubmit={handleSendMessage} style={styles.messageForm as React.CSSProperties}>
                <IconButton size="small">
                  <AttachFile />
                </IconButton>
                <TextField
                  fullWidth
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Введіть повідомлення..."
                  size="small"
                  value={messageText}
                  variant="outlined"
                />
                <Button
                  color="primary"
                  disabled={!messageText.trim()}
                  endIcon={<Send />}
                  type="submit"
                  variant="contained"
                >
                  Надіслати
                </Button>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EventMessaging