import { VisibilityEnum } from '~/types'

const container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}

export const styles = {
    filterSection: {
        display: 'flex'
    },
    container,
    selectContainer: { marginRight: '50px' },
    mobileContainer: { ...container, justifyContent: 'center' },
    titleWithDescription: {
        wrapper: {
            my: { xs: '20px', sm: '30px' },
            textAlign: 'center'
        },
        title: {
            typography: { sm: 'h4', xs: 'h5' }
        },
        description: {
            typography: { sm: 'body1', xs: 'body2' },
            color: 'primary.500'
        }
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    pagination: (hide: boolean) => ({
        visibility: hide ? VisibilityEnum.Hidden : VisibilityEnum.Visible
    })
}
