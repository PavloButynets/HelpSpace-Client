import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import { baseService } from '~/services/base-service'
import { Conversation, Message, ChatUser } from '~/types/chat-types'

/**
 * Сервіс для роботи з бесідами
 */
export const conversationsApi = {
  /**
   * Отримати всі бесіди поточного користувача
   */
  getUserConversations: () => {
    const url = createUrlPath(URLs.chat.conversations.getAll)

    return baseService.get<Conversation[]>(url)
  },

  /**
   * Отримати інформацію про бесіду за ID
   */
  getConversationById: (id: string) => {
    const baseUrl = URLs.chat.conversations.getById.replace(':id', '')
    const url = createUrlPath(baseUrl, id)
    return baseService.get<Conversation>(url)
  },

  /**
   * Створити або знайти існуючу бесіду з користувачем
   */
  createOrFindConversation: (participantId: string) => {
    const url = createUrlPath(URLs.chat.conversations.createOrFind)
    return baseService.post<Conversation>(url, { participantId })
  },

  /**
   * Створити групову бесіду
   */
  createGroupConversation: (name: string, participantIds: string[]) => {
    const url = createUrlPath(URLs.chat.conversations.createGroup)
    return baseService.post<Conversation>(url, { name, participantIds })
  },

  /**
   * Додати користувачів до групової бесіди
   */
  addUsersToGroup: (conversationId: string, userIds: string[]) => {
    const baseUrl = URLs.chat.conversations.addUsers.replace(
      ':conversationId',
      conversationId
    )
    const url = createUrlPath(baseUrl)
    return baseService.post<Conversation>(url, { userIds })
  },

  /**
   * Вийти з групової бесіди
   */
  leaveGroup: (conversationId: string) => {
    const baseUrl = URLs.chat.conversations.leave.replace(
      ':conversationId',
      conversationId
    )
    const url = createUrlPath(baseUrl)
    return baseService.delete(url)
  },

  /**
   * Отримати непрочитані повідомлення для всіх бесід
   */
  getUnreadCounts: () => {
    const url = createUrlPath(URLs.chat.conversations.unreadCounts)
    return baseService.get<{ [conversationId: string]: number }>(url)
  }
}

/**
 * Сервіс для роботи з повідомленнями
 */
export const messagesApi = {
  /**
   * Отримати повідомлення бесіди
   */
  getConversationMessages: (conversationId: string) => {
    const baseUrl = URLs.chat.messages.getByConversation.replace(
      ':conversationId',
      conversationId
    )
    const url = createUrlPath(baseUrl)
    return baseService.get<Message[]>(url)
  },

  /**
   * Відправити нове повідомлення
   */
  sendMessage: (data: {
    content: string
    receiverId?: string
    conversationId?: string | null
    attachments?: any[]
  }) => {
    // Для текстових повідомлень
    if (!data.attachments || data.attachments.length === 0) {
      const url = createUrlPath(URLs.chat.messages.send)
      return baseService.post<Message>(url, data)
    }

    // Для повідомлень з вкладеннями
    const url = createUrlPath(URLs.chat.messages.sendWithAttachments)
    const formData = new FormData()
    formData.append('content', data.content)

    if (data.receiverId) {
      formData.append('receiverId', data.receiverId)
    }

    if (data.conversationId) {
      formData.append('conversationId', data.conversationId)
    }

    data.attachments.forEach((file, index) => {
      formData.append(`attachment_${index}`, file)
    })

    return baseService.post<Message>(url, formData)
  },

  /**
   * Позначити повідомлення як прочитані
   */
  markAsRead: (messageIds: string[]) => {
    const url = createUrlPath(URLs.chat.messages.markAsRead)
    return baseService.post<void>(url, { messageIds })
  },

  /**
   * Видалити повідомлення
   */
  deleteMessage: (messageId: string) => {
    const baseUrl = URLs.chat.messages.delete.replace(':id', messageId)
    const url = createUrlPath(baseUrl)
    return baseService.delete<void>(url)
  },

  /**
   * Редагувати повідомлення
   */
  editMessage: (messageId: string, content: string) => {
    const baseUrl = URLs.chat.messages.edit.replace(':id', messageId)
    const url = createUrlPath(baseUrl)
    return baseService.put<Message>(url, { content })
  }
}

/**
 * Сервіс для роботи з користувачами чату
 */
export const usersApi = {
  /**
   * Отримати всіх користувачів
   */
  getAllUsers: () => {
    const url = createUrlPath(URLs.users.get)
    return baseService.get<ChatUser[]>(url)
  },

  /**
   * Пошук користувачів за критерієм
   */
  searchUsers: (query: string) => {
    const url = createUrlPath(URLs.users.search, null, { query })
    return baseService.get<ChatUser[]>(url)
  },

  /**
   * Отримати інформацію про користувача за ID
   */
  getUserById: (userId: string) => {
    const baseUrl = URLs.users.getUserById.replace(':id', '')
    const url = createUrlPath(baseUrl, userId)
    return baseService.get<ChatUser>(url)
  },

  /**
   * Отримати статус онлайн для списку користувачів
   */
  getUsersOnlineStatus: (userIds: string[]) => {
    const url = createUrlPath(URLs.users.onlineStatus)
    return baseService.post<{ [userId: string]: boolean }>(url, { userIds })
  }
}

/**
 * Перевірка чи використовуються мокові дані
 * @returns true якщо використовуються моки
 */
export const isUsingMockData = () => {
  return (
    process.env.NODE_ENV === 'development' &&
    !process.env.NEXT_PUBLIC_USE_REAL_API
  )
}
