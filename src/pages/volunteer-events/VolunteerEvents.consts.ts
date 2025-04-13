import { EventFilters } from '~/types'

export const defaultFilters = (): EventFilters => ({
    categories: [],
    eventDate: '',
    showCompleted: false,
    city: '',
    sort: 'createdAt',
    search: '',
    page: '1'
})

export const defaultResponse = { items: [], count: 0 }

export const itemsPerPage = 10
