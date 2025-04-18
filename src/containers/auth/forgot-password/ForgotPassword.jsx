import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useAppDispatch } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import { useModalContext } from '~/context/modal-context'

import AppTextField from '~/components/app-text-field/AppTextField'
import LoginDialog from '~/containers/auth/login-dialog/LoginDialog'
import Button from '~scss-components/button/Button'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import NotificationModal from '~/containers/notification-modal/NotificationModal'
import { styles } from '~/containers/auth/forgot-password/ForgotPassword.styles'

import info from '~/assets/img/info.svg'
//import { AuthService } from '~/services/auth-service'
import { snackbarVariants } from '~/constants'
import { email } from '~/utils/validations/login'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { ButtonTypeEnum } from '~/types'

const ForgotPassword = () => {
  const { t } = useTranslation()
  const { openModal, closeModal } = useModalContext()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const backToLogin = () => {
    openModal({ component: <LoginDialog /> })
  }

  const sendEmail = async (data) => {
    try {
      setLoading(true)
      await AuthService.forgotPassword(data)
      openModal(
        {
          component: (
            <NotificationModal
              buttonTitle={t('common.confirmButton')}
              description={description}
              img={info}
              onClose={closeModal}
              title={t('login.passwordReset')}
            />
          )
        },
        5000
      )
    } catch (e) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: getErrorKey(e.response.data)
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const { handleSubmit, handleInputChange, handleBlur, errors, data } = useForm(
    {
      onSubmit: async () => sendEmail(data),
      initialValues: { email: '' },
      validations: { email }
    }
  )

  const description = (
    <Typography component='span'>
      {t('login.weSentEmail')}
      <Typography component='span' variant='subtitle2'>
        {data.email}
      </Typography>
      {t('login.emailArrive')}
    </Typography>
  )

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t('login.enterEmail')}
        style={styles.titleWithDescription}
        title={t('login.forgotPassword')}
      />

      <Box component='form' onSubmit={handleSubmit}>
        <AppTextField
          autoFocus
          errorMsg={t(errors.email)}
          fullWidth
          label={t('common.labels.email')}
          onBlur={handleBlur('email')}
          onChange={handleInputChange('email')}
          required
          size='large'
          sx={{ mb: '16px', mt: '32px' }}
          type='email'
          value={data.email}
        />
        <Button loading={loading} sx={styles.sentPassword} type={ButtonTypeEnum.Submit}>
          {t('login.sendPassword')}
        </Button>
      </Box>

      <Button
        onClick={backToLogin}
        size='md'
        sx={styles.backButton}
        variant='text-secondary'
      >
        {t('login.backToLogin')}
      </Button>
    </Box>
  )
}

export default ForgotPassword
