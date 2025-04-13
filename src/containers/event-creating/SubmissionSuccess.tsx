import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PageWrapper from '~/containers/page-wrapper/PageWrapper';
import {userRoutes} from "~/router/constants/userRoutes";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SubmissionSuccess: React.FC = () => {
  const { t } = useTranslation(); 
    const navigate = useNavigate();

    const handleRedirect = () => {
        void navigate(userRoutes.navBar.eventsPage.path);
    };

  return (
    <PageWrapper>
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 60, color: 'success.main', mb: 2 }}
          />
          <Typography sx={{ mb: 2 }} variant='h5'>
          {t('event.eventCreating.success.title')}
          </Typography>
          <Typography sx={{ mb: 3 }} variant='body1'>
          {t('event.eventCreating.success.message')}

          </Typography>
            <Button onClick={handleRedirect} variant="contained">
            {t('event.eventCreating.success.viewEventsButton')}
            </Button>
        </Paper>
      </Box>
    </PageWrapper>
  );
};