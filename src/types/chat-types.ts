/**
 * Інтерфейс користувача для чату
 */
export interface ChatUser {
  id: string
  first_name: string
  last_name: string
  email?: string
  photo?: string
  isActive?: boolean
  lastActive?: string
  role?: string
}

/**
 * Інтерфейс для вкладення повідомлення
 */
export interface Attachment {
  id?: string
  name: string
  type: string
  url: string
  size: number
  previewUrl?: string // URL для перегляду (наприклад, для зображень)
}

/**
 * Інтерфейс повідомлення
 */
export interface Message {
  id: string
  content: string
  senderId: string
  receiverId?: string
  conversationId?: string
  timestamp: string
  createdAt: string
  updatedAt?: string
  isRead: boolean
  attachments?: Attachment[]
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  isEdited?: boolean
  editedAt?: string
}

/**
 * Статус повідомлення для відображення в UI
 */
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed'

/**
 * Інтерфейс бесіди
 */
export interface Conversation {
  id: string
  isGroup: boolean
  name?: string
  participants: ChatUser[]
  lastMessage: Message | null
  unreadCount: number
  createdAt: string
  updatedAt?: string
  messages?: Message[]
  isActive?: boolean
  typing?: {
    userId: string
    timestamp: string
  }[]
}

/**
 * Тип для повідомлень стану набору тексту
 */
export interface TypingStatus {
  userId: string
  conversationId: string
  isTyping: boolean
  timestamp: string
}

/**
 * Параметри для запиту повідомлень
 */
export interface MessagesQueryParams {
  limit?: number
  before?: string // ID повідомлення для пагінації
  after?: string // ID повідомлення для пагінації
}

/**
 * Опції для створення повідомлення
 */
export interface CreateMessageOptions {
  content: string
  receiverId?: string
  conversationId?: string | null
  attachments?: File[] | Attachment[]
  replyToMessageId?: string
}

/**
 * Параметри для пошуку бесід
 */
export interface ConversationQueryParams {
  query?: string
  type?: 'all' | 'personal' | 'group'
  status?: 'active' | 'archived'
  limit?: number
  offset?: number
}

/**
 * Тип для нових повідомлень з сокету
 */
export interface WebSocketMessage {
  type: 'new_message' | 'typing_status' | 'read_receipts' | 'user_status'
  payload: any
}

/**
 * Інформація про онлайн-статус користувача
 */
export interface UserPresence {
  userId: string
  isOnline: boolean
  lastActive: string
  status?: 'online' | 'away' | 'busy' | 'offline'
}
