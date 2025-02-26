import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {useTranslation} from 'react-i18next'

//import GoogleLogin from '~/containers/google-login/GoogleLogin'
import LoginForm from '~/containers/auth/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import {useLoginMutation} from '~/services/auth-service'
import {useModalContext} from '~/context/modal-context.js'
import {useAppDispatch} from '~/hooks/use-redux'
import {email, logInPassword} from '~/utils/validations/login'
import loginImg from '~/assets/img/login-dialog/login.jpg'
import {login, snackbarVariants} from '~/constants/common.js'

import styles from '~/containers/auth/login-dialog/LoginDialog.styles'
import {useNavigate, useLocation} from 'react-router-dom'
import {guestRoutes} from '~/router/constants/guestRoutes.js'
import {openAlert} from '~/redux/features/snackbarSlice.js'
import {getErrorKey} from '~/utils/helper-functions.js'
import GoogleLogin from "~/containers/auth/google-login/GoogleLogin.js";

const LoginDialog = () => {
    const {t} = useTranslation()
    const {closeModal} = useModalContext()
    const dispatch = useAppDispatch()
    const [loginUser] = useLoginMutation()

    const {handleSubmit, handleInputChange, handleBlur, data, errors} = useForm(
        {
            onSubmit: async () => {
                try {
                    await loginUser(data).unwrap()
                    closeModal()

                } catch (e) {
                    dispatch(
                        openAlert({
                            severity: snackbarVariants.error,
                            message: getErrorKey(e.data)
                        })
                    )
                }
            },
            initialValues: {email: '', password: '', rememberMe: false},
            validations: {email, password: logInPassword}
        }
    )

    return (
        <Box sx={styles.root}>
            <Box sx={styles.imgContainer}>
                <Box alt='login' component='img' src={loginImg} sx={styles.img}/>
            </Box>

            <Box sx={styles.formContainer}>
                <Typography sx={styles.title} variant='h2'>
                    З поверненням
                </Typography>
                <Box sx={styles.form}>
                    <LoginForm
                        data={data}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                    <GoogleLogin buttonWidth={styles.form.minWidth} type={login}/>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginDialog
