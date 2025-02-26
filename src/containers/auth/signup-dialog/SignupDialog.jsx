import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
//import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useAppDispatch } from '~/hooks/use-redux'

import {
  firstName,
  lastName,
  confirmPassword,
  email,
  password
} from '~/utils/validations/login'
import { signup, snackbarVariants } from '~/constants/common.js'
import GoogleLogin from '~/containers/auth/google-login/GoogleLogin'
import NotificationModal from '~/containers/notification-modal/NotificationModal'

import signupImg from '~/assets/img/signup-dialog/signup.jpg'
import info from '~/assets/img/guest-home-page/info.svg'


import { styles } from '~/containers/auth/signup-dialog/SignupDialog.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/helper-functions.js'
import {useSignUpMutation} from "~/services/auth-service.js";


const SignupDialog = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { openModal, closeModal } = useModalContext()
  const dispatch = useAppDispatch()
  const [signUp] = useSignUpMutation()


  const { handleSubmit, handleInputChange, handleBlur, data, isDirty, errors } =
    useForm({
      onSubmit: async () => {
        try {
          await signUp(data).unwrap()
          openModal(
            {
              component: (
                <NotificationModal
                  buttonTitle={t('common.confirmButton')}
                  description={description}
                  img={info}
                  onClose={closeModal}
                  title={t('signup.confirmEmailTitle')}
                />
              )
            },
            5000
          )
        } catch (e) {
            console.log(e)
          dispatch(
            openAlert({
              severity: snackbarVariants.error,
              message: getErrorKey(e.data)
            })
          )
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: { firstName, lastName, email, password, confirmPassword }
    })

  const description = (
    <Typography component='span'>
      {t('signup.confirmEmailMessage')}
      <Typography component='span' variant='subtitle2'>
        {data.email}
      </Typography>
      {t('signup.confirmEmailDesc')}
    </Typography>
  )
  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={signupImg}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t('signup.head')}
        </Typography>
        <Box sx={styles.form}>
          <SignupForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
