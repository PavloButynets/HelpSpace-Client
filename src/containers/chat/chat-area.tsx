import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Menu,
  MenuItem,
  Chip
} from '@mui/material'
import {
  Send,
  AttachFile,
  InsertEmoticon,
  ArrowBack,
  MoreVert,
  Image as MuiImage,
  PictureAsPdf,
  Description,
  InsertDriveFile
} from '@mui/icons-material'
import { Message, Attachment, ChatUser } from '~/types'
import { formatDistanceToNow } from 'date-fns'
import userAvatarImage from '~/assets/img/user-avatar.png'
import { formatMessageTime } from '~/utils/helper-functions'
import { useAppSelector } from '~/hooks/use-redux'
import { useTheme } from '@mui/system'

interface ChatAreaProps {
  selectedUser: ChatUser | null
  messages: Message[]
  onSendMessage: (content: string, attachments: File[]) => void
  onBackClick?: () => void
  connectionStatus: string
}

export default function ChatArea({
  selectedUser,
  messages,
  onSendMessage,
  onBackClick,
  connectionStatus
}: ChatAreaProps) {
  const [messageText, setMessageText] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const currentUserId = useAppSelector((state) => state.appMain.userId)
  const theme = useTheme()
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handlers
  const handleSendMessage = () => {
    if (messageText.trim() || attachments.length > 0) {
      onSendMessage(messageText, attachments)
      setMessageText('')
      setAttachments([])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])
    }
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  // UI helpers
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <MuiImage />
    if (type === 'application/pdf') return <PictureAsPdf />
    if (type.includes('document') || type.includes('word'))
      return <Description />
    return <InsertDriveFile />
  }
  const sortedMessages = [...messages].sort((a, b) => {
    const timeA = new Date(a.timestamp || a.createdAt || 0).getTime()
    const timeB = new Date(b.timestamp || b.createdAt || 0).getTime()
    return timeA - timeB
  })

  const getFilePreview = (attachment: Attachment) => {
    if (attachment.type.startsWith('image/')) {
      return (
        <Box
          alt={attachment.name}
          component='img'
          src={attachment.url}
          sx={{
            maxWidth: '200px',
            maxHeight: '200px',
            borderRadius: 1,
            display: 'block',
            mb: 1
          }}
        />
      )
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          bgcolor: 'background.default',
          borderRadius: 1,
          mb: 1
        }}
      >
        {getFileIcon(attachment.type)}
        <Typography sx={{ ml: 1 }} variant='body2'>
          {attachment.name} ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
        </Typography>
      </Box>
    )
  }

  // No selected user message
  if (!selectedUser) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          bgcolor: 'background.default',
          p: 3,
          width: '100%'
        }}
      >
        <Typography align='center' color='textSecondary' variant='h6'>
          Select a conversation or search for a user to start chatting
        </Typography>
        <Typography
          align='center'
          color='textSecondary'
          sx={{ mt: 1 }}
          variant='body2'
        >
          Connection status: {connectionStatus}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
      }}
    >
      {/* Chat header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        {onBackClick && (
          <IconButton edge='start' onClick={onBackClick} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
        )}

        <Avatar
          alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
          src={selectedUser.photo || userAvatarImage}
        />

        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography variant='subtitle1'>
            {`${selectedUser.first_name} ${selectedUser.last_name}`}
          </Typography>
          <Typography color='textSecondary' variant='body2'>
            {selectedUser.isActive
              ? 'Online'
              : selectedUser.lastActive
                ? `Last active ${formatDistanceToNow(new Date(selectedUser.lastActive), { addSuffix: true })}`
                : 'Offline'}
          </Typography>
        </Box>

        <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>

        <Menu
          anchorEl={menuAnchorEl}
          onClose={() => setMenuAnchorEl(null)}
          open={Boolean(menuAnchorEl)}
        >
          <MenuItem onClick={() => setMenuAnchorEl(null)}>
            View Profile
          </MenuItem>
          <MenuItem onClick={() => setMenuAnchorEl(null)}>Clear Chat</MenuItem>
        </Menu>
      </Box>

      {/* Messages area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default'
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Typography color='textSecondary' variant='body1'>
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        ) : (
          sortedMessages.map((message) => {
            const isMe = message.senderId === currentUserId
            return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  mb: 1.5, // Зменшуємо відстань між повідомленнями
                  width: '100%',
                  position: 'relative'
                }}
              >
                {!isMe && (
                  <Avatar
                    alt={`${selectedUser.first_name} ${selectedUser.last_name}`}
                    src={selectedUser.photo || userAvatarImage}
                    sx={{
                      width: 32, // Менший розмір аватарки
                      height: 32,
                      mr: 1,
                      mt: 0.5, // Вирівнювання зверху
                      display: { xs: 'none', sm: 'block' } // Приховати на мобільних
                    }}
                  />
                )}

                <Box
                  sx={{
                    maxWidth: { xs: '85%', sm: '75%' }, // Ширше на мобільних
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {message?.attachments && message.attachments?.length > 0 && (
                    <Box sx={{ mb: message.content ? 1 : 0 }}>
                      {message.attachments.map((attachment, index) => (
                        <Box key={attachment.id || index}>
                          {getFilePreview(attachment)}
                        </Box>
                      ))}
                    </Box>
                  )}

                  {message.content && (
                    <Paper
                      elevation={0} // Без тіні
                      sx={{
                        p: 2,
                        bgcolor: isMe ? 'primary.light' : 'background.paper',
                        color: isMe ? 'primary.contrastText' : 'text.primary',
                        borderRadius: 2,
                        // Стиль як у Telegram
                        borderTopRightRadius: isMe ? 0 : 2,
                        borderTopLeftRadius: isMe ? 2 : 0,
                        position: 'relative',
                        boxShadow: `0 1px 2px rgba(0,0,0,0.05)`,
                        '&::before': isMe
                          ? {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              right: -8,
                              width: 0,
                              height: 0,
                              borderStyle: 'solid',
                              borderWidth: '0 0 8px 8px',
                              borderColor: `transparent transparent ${theme.palette.primary.light} transparent`,
                              transform: 'rotate(90deg)'
                            }
                          : {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: -8,
                              width: 0,
                              height: 0,
                              borderStyle: 'solid',
                              borderWidth: '0 0 8px 8px',
                              borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
                              transform: 'rotate(0deg)'
                            }
                      }}
                    >
                      <Typography variant='body1'>{message.content}</Typography>
                    </Paper>
                  )}

                  <Typography
                    color='textSecondary'
                    sx={{
                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                      mt: 0.3,
                      fontSize: '0.7rem',
                      opacity: 0.7
                    }}
                    variant='caption'
                  >
                    {formatMessageTime(message.timestamp || message.createdAt)}
                  </Typography>
                </Box>
              </Box>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Attachment preview */}
      {attachments.length > 0 && (
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Typography sx={{ mb: 1 }} variant='subtitle2'>
            Attachments ({attachments.length})
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {attachments.map((file, index) => (
              <Chip
                icon={getFileIcon(file.type)}
                key={index}
                label={file.name}
                onDelete={() => handleRemoveAttachment(index)}
                variant='outlined'
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Message input */}
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <IconButton
            color='primary'
            onClick={() => fileInputRef.current?.click()}
          >
            <AttachFile />
          </IconButton>

          <input
            multiple
            onChange={handleFileSelect}
            ref={fileInputRef}
            style={{ display: 'none' }}
            type='file'
          />

          <IconButton color='primary'>
            <InsertEmoticon />
          </IconButton>

          <TextField
            fullWidth
            maxRows={4}
            multiline
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Type a message...'
            sx={{ mx: 1 }}
            value={messageText}
            variant='outlined'
          />

          <IconButton
            color='primary'
            disabled={!messageText.trim() && attachments.length === 0}
            onClick={handleSendMessage}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
