import { EventFilters } from '~/types'

export const defaultFilters = (): EventFilters => ({
    category: '',
    location: '',
    sort: 'createdAt',
    search: '',
    page: '1'
})

export const defaultResponse = { items: [], count: 0 }

export const itemsPerPage = 8
