import { type AlertColor } from '~/design-system/components/alert/Alert'

export const HelpSpace = 'HelpSpace'

export const login = 'login'
export const signup = 'signup'

export const dismissedActivation = 'dismiss'

export const snackbarVariants: Record<string, AlertColor> = {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
}

export const defaultResponses = {
    array: [],
    object: {},
    itemsWithCount: { count: 0, items: [] }
}

export const itemsLoadLimit = {
    tablet: 10,
    mobile: 6,
    default: 12
}
