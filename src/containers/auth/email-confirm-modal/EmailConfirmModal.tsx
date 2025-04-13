import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'

import Box from '@mui/material/Box'

import Loader from '~/components/loader/Loader'
import Button from '~scss-components/button/Button'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

import LoginDialog from '~/containers/auth/login-dialog/LoginDialog'
import {styles} from '~/containers/auth/email-confirm-modal/EmailConfirmModal.styles'

import imgSuccess from '~/assets/img/success-icon.svg'
import imgReject from '~/assets/img/not-success-icon.svg'

import {AuthService} from '~/services/auth-service'
import {Component, useModalContext} from '~/context/modal-context'
import {ResponseError} from "~/utils/response-error";
import {useQuery} from "@tanstack/react-query";

interface EmailConfirmModalProps {
    confirmToken: string
    openModal: (component: Component, delayToClose?: number) => void
}

const EmailConfirmModal = ({
                               confirmToken,
                               openModal
                           }: EmailConfirmModalProps) => {
    const {t} = useTranslation()
    const {closeModal} = useModalContext()

    const confirmEmail = useCallback(
        () => AuthService.confirmEmail(confirmToken),
        [confirmToken]
    )

    const {data: response, error: error, isLoading: loading} = useQuery<unknown,ResponseError>({
        queryFn: confirmEmail,
        queryKey: ['confirmEmail', confirmToken],
        retry: false,
    })
    const openLoginDialog = () => {
        openModal({component: <LoginDialog/>})
    }

    if (loading) {
        return <Loader size={100}/>
    }

    if (
        (error && error.code === 'BAD_CONFIRM_TOKEN') ||
        (error && error.code === 'DOCUMENT_NOT_FOUND' && response === null)
    ) {
        return (
            <Box sx={styles.box}>
                <ImgTitleDescription
                    description={t('modals.emailReject.badToken')}
                    img={imgReject}
                    style={styles}
                    title={t('modals.emailNotConfirm')}
                />
                <Button onClick={closeModal} size='lg' sx={styles.button}>
                    {t('common.confirmButton')}
                </Button>
            </Box>
        )
    }

    if (error && error.code === 'EMAIL_ALREADY_CONFIRMED') {
        return (
            <Box sx={styles.box}>
                <ImgTitleDescription
                    description={t('modals.emailReject.alreadyConfirmed')}
                    img={imgReject}
                    style={styles}
                    title={t('modals.emailAlreadyConfirm')}
                />
                <Button onClick={openLoginDialog} size='lg' sx={styles.button}>
                    {t('button.goToLogin')}
                </Button>
            </Box>
        )
    }

    if (response !== null) {
        return (
            <Box sx={styles.box}>
                <ImgTitleDescription
                    img={imgSuccess}
                    style={styles}
                    title={t('modals.emailConfirm')}
                />
                <Button onClick={openLoginDialog} size='lg' sx={styles.button}>
                    {t('button.goToLogin')}
                </Button>
            </Box>
        )
    }
}

export default EmailConfirmModal
