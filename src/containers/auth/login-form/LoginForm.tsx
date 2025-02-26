import {useTranslation} from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'

import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import {useModalContext} from '~/context/modal-context'
//import ForgotPassword from '~/containers/auth/forgot-password/ForgotPassword'
import AppTextField from '~/components/app-text-field/AppTextField'
import Button from '~scss-components/button/Button'

import {styles} from '~/containers/auth/login-form/LoginForm.styles'
import {useAppSelector} from '~/hooks/use-redux'
import {ButtonTypeEnum} from '~/types'

interface LoginFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    handleChange: (
        field: string
    ) => (event: React.SyntheticEvent<Element, Event>) => void
    handleBlur: (
        field: string
    ) => (event: React.FocusEvent<HTMLInputElement>) => void
    data: {
        email: string
        password: string
        rememberMe: boolean
    }
    errors: {
        email?: string
        password?: string
    }
}

const LoginForm: React.FC<LoginFormProps> = ({
                                                 handleSubmit,
                                                 handleChange,
                                                 handleBlur,
                                                 data,
                                                 errors
                                             }) => {
    const {inputVisibility: passwordVisibility, showInputText: showPassword} =
        useInputVisibility(errors.password ?? '')

    const {authLoading} = useAppSelector((state) => state.appMain)

    const {openModal} = useModalContext()

    const {t} = useTranslation()

    const openForgotPassword = () => {
        //openModal({ component: <ForgotPassword /> })
        console.log('ForgotPassword')
    }

    const isDisabled =
        !data.email ||
        !data.password ||
        !Object.values(errors).every((elem) => elem === '')

    return (
        <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
            <AppTextField
                data-testid={'email'}
                errorMsg={t(errors.email ?? '')}
                fullWidth
                label={'Електронна пошта'}
                onBlur={handleBlur('email')}
                onChange={handleChange('email')}
                required
                size='medium'
                sx={{mb: '5px'}}
                type='email'
                value={data.email}
            />

            <AppTextField
                InputProps={passwordVisibility}
                errorMsg={t(errors.password ?? '')}
                fullWidth
                label={'Пароль'}
                onBlur={handleBlur('password')}
                onChange={handleChange('password')}
                required
                type={showPassword ? 'text' : 'password'}
                value={data.password}
            />

            <Box sx={styles.loginOptionsContainer}>
                <FormControlLabel
                    control={<Checkbox/>}
                    label={'Запам’ятати мене'}
                    labelPlacement='end'
                    onChange={(event) =>
                        handleChange('rememberMe')(
                            event as React.ChangeEvent<HTMLInputElement>
                        )
                    }
                    sx={styles.checkboxLabel}
                    value={data.rememberMe}
                />

                <Typography
                    component={ButtonBase}
                    onClick={openForgotPassword}
                    sx={styles.forgotPass}
                    variant='subtitle2'
                >
                    {'Забули пароль?'}
                </Typography>
            </Box>

            <Button
                variant={'primary'}
                disabled={isDisabled}
                loading={authLoading}
                sx={styles.loginButton}
                type={ButtonTypeEnum.Submit}
            >
                {'Увійти'}
            </Button>
        </Box>
    )
}

export default LoginForm