import axios from 'axios'

// Mock volunteers data
export const mockVolunteers = [
  {
    id: 'vol-1',
    firstName: 'Олександр',
    lastName: 'Петренко',
    email: 'oleksandr.p@gmail.com',
    phone: '+380501234567',
    photo: 'https://i.pravatar.cc/150?img=11',
    rating: 4.8,
    hoursLogged: 12,
    hoursApproved: 10,
    feedback: 'Дуже відповідальний волонтер, завжди приходить вчасно.',
    attendedEvents: 5,
    joinedDate: '2023-09-15T14:30:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'vol-2',
    firstName: 'Марія',
    lastName: 'Коваленко',
    email: 'maria.k@gmail.com',
    phone: '+380679876543',
    photo: 'https://i.pravatar.cc/150?img=5',
    rating: 4.5,
    hoursLogged: 8,
    hoursApproved: 8,
    feedback: null,
    attendedEvents: 3,
    joinedDate: '2023-10-02T09:15:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'vol-3',
    firstName: 'Іван',
    lastName: 'Сидоренко',
    email: 'ivan.s@gmail.com',
    phone: '+380631112233',
    photo: 'https://i.pravatar.cc/150?img=15',
    rating: 3.9,
    hoursLogged: 4,
    hoursApproved: 2,
    feedback: 'Потребує більше уваги до деталей, але має хороший потенціал.',
    attendedEvents: 2,
    joinedDate: '2023-11-10T16:45:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'vol-4',
    firstName: 'Аліна',
    lastName: 'Мельник',
    email: 'alina.m@gmail.com',
    phone: '+380954445566',
    photo: 'https://i.pravatar.cc/150?img=9',
    rating: 5.0,
    hoursLogged: 20,
    hoursApproved: 20,
    feedback: 'Відмінний волонтер, проявляє ініціативу та лідерські якості.',
    attendedEvents: 7,
    joinedDate: '2023-08-05T11:30:00Z',
    status: 'ACTIVE'
  },
  {
    id: 'vol-5',
    firstName: 'Сергій',
    lastName: 'Грищенко',
    email: 'serhiy.g@gmail.com',
    phone: '+380977778899',
    photo: 'https://i.pravatar.cc/150?img=12',
    rating: 4.2,
    hoursLogged: 15,
    hoursApproved: 13,
    feedback: null,
    attendedEvents: 4,
    joinedDate: '2023-09-22T10:00:00Z',
    status: 'ACTIVE'
  }
]

// Mock logged hours data
export const mockLoggedHours = [
  {
    id: 'hours-1',
    volunteerId: 'vol-1',
    volunteerName: 'Олександр Петренко',
    volunteerPhoto: 'https://i.pravatar.cc/150?img=11',
    hoursLogged: 5,
    date: '2023-12-15T14:00:00Z',
    description: 'Допомога в організації реєстрації учасників',
    status: 'PENDING',
    submittedAt: '2023-12-15T19:30:00Z'
  },
  {
    id: 'hours-2',
    volunteerId: 'vol-2',
    volunteerName: 'Марія Коваленко',
    volunteerPhoto: 'https://i.pravatar.cc/150?img=5',
    hoursLogged: 4,
    date: '2023-12-15T14:00:00Z',
    description: 'Робота на інформаційному стенді',
    status: 'APPROVED',
    submittedAt: '2023-12-15T18:45:00Z',
    approvedAt: '2023-12-16T10:20:00Z'
  },
  {
    id: 'hours-3',
    volunteerId: 'vol-3',
    volunteerName: 'Іван Сидоренко',
    volunteerPhoto: 'https://i.pravatar.cc/150?img=15',
    hoursLogged: 3,
    date: '2023-12-15T14:00:00Z',
    description: 'Прибирання після заходу',
    status: 'REJECTED',
    submittedAt: '2023-12-15T20:10:00Z',
    rejectedAt: '2023-12-16T11:05:00Z',
    rejectionReason: 'Надано невірний час роботи'
  },
  {
    id: 'hours-4',
    volunteerId: 'vol-4',
    volunteerName: 'Аліна Мельник',
    volunteerPhoto: 'https://i.pravatar.cc/150?img=9',
    hoursLogged: 7,
    date: '2023-12-15T14:00:00Z',
    description: 'Координація волонтерів та допомога учасникам',
    status: 'APPROVED',
    submittedAt: '2023-12-15T21:30:00Z',
    approvedAt: '2023-12-16T09:45:00Z'
  },
  {
    id: 'hours-5',
    volunteerId: 'vol-5',
    volunteerName: 'Сергій Грищенко',
    volunteerPhoto: 'https://i.pravatar.cc/150?img=12',
    hoursLogged: 6,
    date: '2023-12-15T14:00:00Z',
    description: 'Технічна підтримка та налаштування обладнання',
    status: 'PENDING',
    submittedAt: '2023-12-15T22:15:00Z'
  }
]

// Mock volunteer applications data
export const mockVolunteerApplications = [
  {
    id: 'app-1',
    userId: 'user-1',
    firstName: 'Дмитро',
    lastName: 'Василенко',
    email: 'dmytro.v@gmail.com',
    phone: '+380501112233',
    photo: 'https://i.pravatar.cc/150?img=20',
    motivation:
      'Маю досвід у організації подібних заходів і хочу допомогти вашій команді.',
    experience: 'Працював волонтером на 3 марафонах та 2 фестивалях.',
    skills: ['комунікабельність', 'організованість', 'перша допомога'],
    status: 'PENDING',
    appliedAt: '2023-12-01T15:45:00Z'
  },
  {
    id: 'app-2',
    userId: 'user-2',
    firstName: 'Віктор',
    lastName: 'Лисенко',
    email: 'victor.l@gmail.com',
    phone: '+380679998877',
    photo: 'https://i.pravatar.cc/150?img=30',
    motivation: 'Бажаю розвиватися у волонтерстві та допомагати громаді.',
    experience: 'Вперше хочу спробувати себе як волонтер.',
    skills: ['відповідальність', 'пунктуальність'],
    status: 'APPROVED',
    appliedAt: '2023-12-02T10:30:00Z',
    approvedAt: '2023-12-03T14:20:00Z'
  },
  {
    id: 'app-3',
    userId: 'user-3',
    firstName: 'Анна',
    lastName: 'Ткаченко',
    email: 'anna.t@gmail.com',
    phone: '+380631234567',
    photo: 'https://i.pravatar.cc/150?img=25',
    motivation:
      'Хочу долучитися до важливої для міста події та познайомитися з новими людьми.',
    experience: 'Волонтерила на двох міських заходах минулого року.',
    skills: ['комунікабельність', 'робота в команді', 'знання англійської'],
    status: 'REJECTED',
    appliedAt: '2023-12-01T18:15:00Z',
    rejectedAt: '2023-12-03T16:40:00Z',
    rejectionReason:
      'На жаль, усі позиції, що відповідають вашому профілю, вже заповнені.'
  },
  {
    id: 'app-4',
    userId: 'user-4',
    firstName: 'Юлія',
    lastName: 'Бондаренко',
    email: 'yulia.b@gmail.com',
    phone: '+380954567890',
    photo: 'https://i.pravatar.cc/150?img=32',
    motivation: 'Маю великий досвід у організації заходів та прагну допомогти.',
    experience:
      'Працювала координатором волонтерів на 5 заходах різного масштабу.',
    skills: [
      'лідерство',
      'організація',
      'вирішення конфліктів',
      'перша допомога'
    ],
    status: 'PENDING',
    appliedAt: '2023-12-03T09:45:00Z'
  },
  {
    id: 'app-5',
    userId: 'user-5',
    firstName: 'Максим',
    lastName: 'Федоренко',
    email: 'maxim.f@gmail.com',
    phone: '+380977654321',
    photo: 'https://i.pravatar.cc/150?img=17',
    motivation:
      'Хочу набути досвіду волонтерства та внести свій вклад у громаду.',
    experience: 'Досвіду волонтерства не маю, але дуже мотивований.',
    skills: ['технічні навички', 'фотографія', 'соціальні медіа'],
    status: 'APPROVED',
    appliedAt: '2023-12-02T14:20:00Z',
    approvedAt: '2023-12-04T11:15:00Z'
  }
]

// Mock feedback data
export const mockFeedbackResponses = [
  {
    id: 'feedback-1',
    volunteerId: 'vol-1',
    volunteerName: 'Олександр Петренко',
    rating: 5,
    comment: 'Чудова робота! Олександр проявив ініціативу та відповідальність.',
    createdAt: '2023-12-17T14:30:00Z'
  },
  {
    id: 'feedback-2',
    volunteerId: 'vol-2',
    volunteerName: 'Марія Коваленко',
    rating: 4,
    comment: "Гарно виконала свої обов'язки, була привітною з гостями.",
    createdAt: '2023-12-17T15:45:00Z'
  },
  {
    id: 'feedback-3',
    volunteerId: 'vol-3',
    volunteerName: 'Іван Сидоренко',
    rating: 3,
    comment:
      'Потребує покращення у дотриманні розкладу, але в цілому впорався із завданнями.',
    createdAt: '2023-12-17T16:20:00Z'
  }
]

// Mock event statistics
export const mockEventStats = {
  totalVolunteers: 5,
  totalApplications: 8,
  approvedApplications: 5,
  pendingApplications: 2,
  rejectedApplications: 1,
  totalHoursLogged: 25,
  totalHoursApproved: 19,
  averageRating: 4.5,
  applicationConversionRate: 62.5, // percentage of applications that were approved
  volunteerRetentionRate: 80, // percentage of volunteers who have volunteered before
  topSkills: [
    { skill: 'комунікабельність', count: 4 },
    { skill: 'організованість', count: 3 },
    { skill: 'перша допомога', count: 2 }
  ]
}
const API_BASE_URL = 'http://localhost:8000'

// For development, use mock data instead of actual API calls
const USE_MOCKS = true

export class EventManagementService {
  fetchVolunteers = async (eventId: string) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockVolunteers), 300)
      })
    }

    const response = await axios.get(
      `${API_BASE_URL}/events/${eventId}/volunteers`
    )
    return response.data
  }

  submitFeedback = async (
    eventId: string,
    volunteerId: string,
    feedback: { rating: number; comment: string }
  ) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        const newFeedback = {
          id: `feedback-${Date.now()}`,
          volunteerId,
          volunteerName:
            mockVolunteers.find((v) => v.id === volunteerId)?.firstName +
            ' ' +
            mockVolunteers.find((v) => v.id === volunteerId)?.lastName,
          rating: feedback.rating,
          comment: feedback.comment,
          createdAt: new Date().toISOString()
        }
        setTimeout(() => resolve(newFeedback), 300)
      })
    }

    const response = await axios.post(
      `${API_BASE_URL}/events/${eventId}/volunteers/${volunteerId}/feedback`,
      feedback
    )
    return response.data
  }

  fetchLoggedHours = async (eventId: string) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockLoggedHours), 300)
      })
    }

    const response = await axios.get(
      `${API_BASE_URL}/events/${eventId}/logged-hours`
    )
    return response.data
  }

  approveHours = async (eventId: string, hoursId: string) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        const updatedHours = mockLoggedHours.map((hours) => {
          if (hours.id === hoursId) {
            return {
              ...hours,
              status: 'APPROVED',
              approvedAt: new Date().toISOString()
            }
          }
          return hours
        })

        setTimeout(() => {
          const approvedHour = updatedHours.find((h) => h.id === hoursId)
          resolve(approvedHour)
        }, 300)
      })
    }

    const response = await axios.post(
      `${API_BASE_URL}/events/${eventId}/logged-hours/${hoursId}/approve`
    )
    return response.data
  }

  rejectHours = async (
    eventId: string,
    hoursId: string,
    rejectionReason?: string
  ) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        const updatedHours = mockLoggedHours.map((hours) => {
          if (hours.id === hoursId) {
            return {
              ...hours,
              status: 'REJECTED',
              rejectedAt: new Date().toISOString(),
              rejectionReason: rejectionReason || 'Години не підтверджено'
            }
          }
          return hours
        })

        setTimeout(() => {
          const rejectedHour = updatedHours.find((h) => h.id === hoursId)
          resolve(rejectedHour)
        }, 300)
      })
    }

    const response = await axios.post(
      `${API_BASE_URL}/events/${eventId}/logged-hours/${hoursId}/reject`
    )
    return response.data
  }

  fetchVolunteerApplications = async (eventId: string) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockVolunteerApplications), 300)
      })
    }

    const response = await axios.get(
      `${API_BASE_URL}/events/${eventId}/applications`
    )
    return response.data
  }

  approveApplication = async (eventId: string, applicationId: string) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        const updatedApplications = mockVolunteerApplications.map((app) => {
          if (app.id === applicationId) {
            return {
              ...app,
              status: 'APPROVED',
              approvedAt: new Date().toISOString()
            }
          }
          return app
        })

        setTimeout(() => {
          const approvedApp = updatedApplications.find(
            (a) => a.id === applicationId
          )
          resolve(approvedApp)
        }, 300)
      })
    }

    const response = await axios.post(
      `${API_BASE_URL}/events/${eventId}/applications/${applicationId}/approve`
    )
    return response.data
  }

  rejectApplication = async (
    eventId: string,
    applicationId: string,
    rejectionReason?: string
  ) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        const updatedApplications = mockVolunteerApplications.map((app) => {
          if (app.id === applicationId) {
            return {
              ...app,
              status: 'REJECTED',
              rejectedAt: new Date().toISOString(),
              rejectionReason: rejectionReason || 'Не відповідає вимогам'
            }
          }
          return app
        })

        setTimeout(() => {
          const rejectedApp = updatedApplications.find(
            (a) => a.id === applicationId
          )
          resolve(rejectedApp)
        }, 300)
      })
    }

    const response = await axios.post(
      `${API_BASE_URL}/events/${eventId}/applications/${applicationId}/reject`
    )
    return response.data
  }

  fetchEventStats = async (eventId: string) => {
    if (USE_MOCKS) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockEventStats), 300)
      })
    }

    const response = await axios.get(`${API_BASE_URL}/events/${eventId}/stats`)
    return response.data
  }
  static getLoggedHours = async () => {
    // Create an instance of the service to use instance methods
    const service = new EventManagementService()
    // Default event ID for testing purposes
    const defaultEventId = 'event-1'
    return service.fetchLoggedHours(defaultEventId)
  }

  // Static method to approve logged hours (simpler signature)
  static approveLoggedHours = async (hoursId: string) => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.approveHours(defaultEventId, hoursId)
  }

  // Static method to reject logged hours (simpler signature)
  static rejectLoggedHours = async (hoursId: string, reason?: string) => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.rejectHours(defaultEventId, hoursId, reason)
  }

  // Static method to get volunteers
  static getVolunteers = async () => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.fetchVolunteers(defaultEventId)
  }

  // Static method to provide feedback
  static provideFeedback = async (
    volunteerId: string,
    feedbackData: { rating: number; comment: string }
  ) => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.submitFeedback(defaultEventId, volunteerId, feedbackData)
  }

  // Static method to get applications
  static getApplications = async () => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.fetchVolunteerApplications(defaultEventId)
  }

  // Static method to approve application
  static approveApplication = async (applicationId: string) => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.approveApplication(defaultEventId, applicationId)
  }

  // Static method to reject application
  static rejectApplication = async (applicationId: string, reason?: string) => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.rejectApplication(defaultEventId, applicationId, reason)
  }

  // Static method to get event statistics
  static getEventStats = async () => {
    const service = new EventManagementService()
    const defaultEventId = 'event-1'
    return service.fetchEventStats(defaultEventId)
  }
}
