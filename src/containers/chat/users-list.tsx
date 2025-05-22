import { useState, useCallback, useMemo } from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material'
import {
  Search as SearchIcon,
  PersonAdd,
  MoreVert,
  GroupAdd,
  Settings,
  FilterList,
  AccessTime
} from '@mui/icons-material'
import { formatDistanceToNow } from 'date-fns'
import { uk } from 'date-fns/locale'
import { ChatUser } from '~/types'
import userAvatarImage from '~/assets/img/user-avatar.png'

interface UsersListProps {
  users: ChatUser[]
  conversations: any[]
  onUserSelect: (user: ChatUser) => void
  selectedUser: ChatUser | null
  availableUsers?: ChatUser[]
}

export default function UsersList({
  users,
  conversations,
  onUserSelect,
  selectedUser,
  availableUsers = []
}: UsersListProps) {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ChatUser[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)

  // Menu handlers
  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      setMenuAnchorEl(event.currentTarget),
    []
  )
  const handleCloseMenu = useCallback(() => setMenuAnchorEl(null), [])
  const handleOpenFilter = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      setFilterAnchorEl(event.currentTarget),
    []
  )
  const handleCloseFilter = useCallback(() => setFilterAnchorEl(null), [])
  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue),
    []
  )

  // Search users
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value
      setSearchQuery(query)

      if (query.length > 2) {
        setIsSearching(true)
        setIsSearchLoading(true)

        // Local search implementation
        setTimeout(() => {
          const results = availableUsers.filter((user) => {
            const fullName =
              `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase()
            const email = (user.email || '').toLowerCase()
            const searchLower = query.toLowerCase()
            return fullName.includes(searchLower) || email.includes(searchLower)
          })

          setSearchResults(results)
          setIsSearchLoading(false)
        }, 300)
      } else {
        setIsSearching(false)
        setSearchResults([])
      }
    },
    [availableUsers]
  )

  // Start a chat with selected user
  const handleStartNewChat = useCallback(
    (user: ChatUser) => {
      onUserSelect(user)
      setIsSearching(false)
      setSearchQuery('')
    },
    [onUserSelect]
  )

  // Filter conversations based on search and tab
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) {
      return [...conversations].sort((a, b) => {
        const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(0)
        const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(0)
        return dateB.getTime() - dateA.getTime()
      })
    }

    return conversations.filter((conv) => {
      if (conv.isGroup) {
        return (conv.name || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      }

      return conv.participants.some((p: any) => {
        const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim()
        const nameInMock = p.name || ''
        const email = p.email || ''
        const searchLower = searchQuery.toLowerCase()

        return (
          fullName.toLowerCase().includes(searchLower) ||
          nameInMock.toLowerCase().includes(searchLower) ||
          email.toLowerCase().includes(searchLower)
        )
      })
    })
  }, [conversations, searchQuery])

  // Helper functions
  const getConversationDisplayName = useCallback((conversation: any) => {
    if (conversation.isGroup) return conversation.name

    const otherParticipant = conversation.participants[0]
    if (!otherParticipant) return 'Невідомий користувач'

    return otherParticipant.first_name && otherParticipant.last_name
      ? `${otherParticipant.first_name} ${otherParticipant.last_name}`
      : otherParticipant.name || 'Невідомий користувач'
  }, [])

  const getLastMessage = useCallback((conversation: any) => {
    if (conversation.lastMessage?.content) {
      return conversation.lastMessage.content
    }

    if (conversation.lastMessage?.attachments?.length > 0) {
      return `📎 ${conversation.lastMessage.attachments[0].name || 'Вкладення'}`
    }

    return 'Немає повідомлень'
  }, [])

  // Render search results
  const renderSearchResults = () => (
    <Box>
      <Typography
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: 'background.default',
          fontWeight: 600
        }}
        variant='subtitle2'
      >
        Результати пошуку
      </Typography>

      <List disablePadding>
        {isSearchLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : searchResults.length > 0 ? (
          searchResults.map((user) => (
            <ListItemButton
              key={user.id}
              onClick={() => handleStartNewChat(user)}
              selected={selectedUser?.id === user.id}
              sx={{
                '&.Mui-selected': { bgcolor: 'action.selected' },
                '&:hover': { bgcolor: 'action.hover' },
                borderRadius: 1,
                mx: 1,
                my: 0.5
              }}
            >
              <ListItemAvatar>
                <Badge
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  invisible={!user.isActive}
                  overlap='circular'
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#44b700',
                      boxShadow: '0 0 0 2px white'
                    }
                  }}
                  variant='dot'
                >
                  <Avatar
                    alt={`${user.first_name} ${user.last_name}`}
                    src={user.photo || userAvatarImage}
                  />
                </Badge>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: 500 }} variant='body1'>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                }
                secondary={
                  <Typography color='text.secondary' noWrap variant='body2'>
                    {user.isActive
                      ? 'Онлайн'
                      : user.lastActive
                        ? `Був(ла) ${formatDistanceToNow(
                            new Date(user.lastActive),
                            {
                              addSuffix: true,
                              locale: uk
                            }
                          )}`
                        : 'Офлайн'}
                  </Typography>
                }
              />
            </ListItemButton>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color='text.secondary'>
              Користувачів не знайдено
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  )

  // Render conversations list
  const renderConversations = () => (
    <List disablePadding>
      {filteredConversations.length > 0 ? (
        filteredConversations
          .filter((conv) => {
            if (activeTab === 0) return true // Всі
            if (activeTab === 1) return !conv.isGroup // Особисті
            if (activeTab === 2) return conv.isGroup // Групи
            return true
          })
          .map((conversation) => {
            const displayName = getConversationDisplayName(conversation)
            const lastMessage = getLastMessage(conversation)
            const unreadCount = conversation.unreadCount || 0
            const otherParticipant = conversation.isGroup
              ? null
              : conversation.participants[0]

            return (
              <ListItemButton
                key={conversation.id}
                onClick={() =>
                  otherParticipant && onUserSelect(otherParticipant)
                }
                selected={
                  otherParticipant && selectedUser?.id === otherParticipant.id
                }
                sx={{
                  '&.Mui-selected': { bgcolor: 'action.selected' },
                  '&:hover': { bgcolor: 'action.hover' },
                  borderLeft: unreadCount > 0 ? 4 : 0,
                  borderLeftColor: 'primary.main',
                  pl: unreadCount > 0 ? 1.4 : 2,
                  borderBottom: 1,
                  borderBottomColor: 'divider'
                }}
              >
                <ListItemAvatar>
                  <Badge
                    badgeContent={unreadCount}
                    color='primary'
                    invisible={unreadCount === 0}
                    overlap='circular'
                  >
                    <Badge
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      invisible={!otherParticipant?.isActive}
                      overlap='circular'
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#44b700',
                          boxShadow: '0 0 0 2px white'
                        }
                      }}
                      variant='dot'
                    >
                      <Avatar
                        alt={displayName}
                        src={
                          conversation.isGroup
                            ? null
                            : otherParticipant?.photo ||
                              otherParticipant?.avatar
                        }
                        sx={{
                          bgcolor: conversation.isGroup
                            ? 'primary.main'
                            : undefined
                        }}
                      >
                        {conversation.isGroup &&
                          displayName.charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                  </Badge>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        noWrap
                        sx={{
                          fontWeight: unreadCount > 0 ? 600 : 400,
                          maxWidth: '70%'
                        }}
                        variant='body1'
                      >
                        {displayName}
                      </Typography>

                      <Typography color='text.secondary' variant='caption'>
                        {conversation.lastMessage?.timestamp &&
                          formatDistanceToNow(
                            new Date(conversation.lastMessage.timestamp),
                            {
                              addSuffix: false,
                              locale: uk
                            }
                          )}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      noWrap
                      sx={{
                        color:
                          unreadCount > 0 ? 'text.primary' : 'text.secondary',
                        fontWeight: unreadCount > 0 ? 500 : 400,
                        display: 'flex',
                        mt: 0.5
                      }}
                      variant='body2'
                    >
                      {conversation.lastMessage?.senderId ===
                        'current-user' && (
                        <span style={{ marginRight: 4 }}>Ви: </span>
                      )}
                      {lastMessage}
                    </Typography>
                  }
                />
              </ListItemButton>
            )
          })
      ) : (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color='text.secondary'>Немає розмов</Typography>
        </Box>
      )}
    </List>
  )

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper'
      }}
    >
      {/* Header and actions */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Typography sx={{ fontWeight: 600 }} variant='h6'>
          Повідомлення
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={() => setIsSearching(true)} size='medium'>
            <PersonAdd />
          </IconButton>

          <IconButton onClick={() => {}} size='medium'>
            <GroupAdd />
          </IconButton>

          <IconButton onClick={handleOpenMenu}>
            <MoreVert />
          </IconButton>

          <Menu
            PaperProps={{ elevation: 3, sx: { mt: 1, minWidth: 180 } }}
            anchorEl={menuAnchorEl}
            onClose={handleCloseMenu}
            open={Boolean(menuAnchorEl)}
          >
            <MenuItem onClick={handleCloseMenu}>
              <Settings fontSize='small' sx={{ mr: 1.5 }} />
              Налаштування
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <AccessTime fontSize='small' sx={{ mr: 1.5 }} />
              Архівовані чати
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMenu}>
              <GroupAdd fontSize='small' sx={{ mr: 1.5 }} />
              Створити групу
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ p: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='action' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleOpenFilter} size='small'>
                  <FilterList fontSize='small' />
                </IconButton>
              </InputAdornment>
            )
          }}
          fullWidth
          onChange={handleSearch}
          placeholder='Пошук...'
          size='small'
          value={searchQuery}
          variant='outlined'
        />

        <Menu
          PaperProps={{ elevation: 3, sx: { mt: 1, minWidth: 200 } }}
          anchorEl={filterAnchorEl}
          onClose={handleCloseFilter}
          open={Boolean(filterAnchorEl)}
        >
          <MenuItem onClick={handleCloseFilter}>Тільки онлайн</MenuItem>
          <MenuItem onClick={handleCloseFilter}>Непрочитані</MenuItem>
          <Divider />
          <MenuItem onClick={handleCloseFilter}>Скинути фільтри</MenuItem>
        </Menu>
      </Box>

      {/* Tabs */}
      <Tabs
        indicatorColor='primary'
        onChange={handleTabChange}
        textColor='primary'
        value={activeTab}
        variant='fullWidth'
      >
        <Tab label='Усі' />
        <Tab label='Особисті' />
        <Tab label='Групи' />
      </Tabs>

      {/* Content area */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {isSearching ? renderSearchResults() : renderConversations()}
      </Box>
    </Box>
  )
}
