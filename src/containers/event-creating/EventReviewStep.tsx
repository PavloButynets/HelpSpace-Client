import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  Alert
} from '@mui/material';
import { EventFormSchema } from '~/schemas/event-schema';
import { useTranslation } from 'react-i18next';

interface EventReviewStepProps {
  data: EventFormSchema;
}

export const EventReviewStep: React.FC<EventReviewStepProps> = ({ data }) => {
  const {t} = useTranslation();
  const renderImagePreviews = () => {
    if (!data.imageFile) return null;

    const previewUrl = URL.createObjectURL(data.imageFile);
      return (
        <Box key={data.imageFile.name} sx={{ position: 'relative', display: 'inline-block', margin: 1 }}>
          <img
          alt={t('event.eventCreating.review.imagePreviewAlt', { fileName: data.imageFile.name })}
          src={previewUrl}
            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
          />
        </Box>
      );
  };
  return (
    <Stack spacing={3}>
      <Box>
        <Typography gutterBottom variant='h6'>
        {t('event.eventCreating.fields.checkInformation')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography fontWeight='bold' variant='subtitle1'>
          {data.title}
        </Typography>

        <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
          {data.categories.map((category) => (
            <Chip key={category.id}               label={t(`event.categories.${category.name}`, category.name)}
            size='small' />
          ))}
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography color='text.secondary' variant='body2'>
          <strong>{t('event.eventDetails.eventLocation')}:</strong> {data.city} - {data.address}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
          <strong>{t('event.eventDetails.eventDate')}:</strong>  {data.startDate?.toLocaleString()} -{' '}
            {data.endDate?.toLocaleString()}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
          <strong>{t('event.eventCreating.fields.volunteerSlots')}:</strong> {data.volunteerSlots}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
          <strong>{t('event.eventCreating.fields.registrationDeadline')}:</strong>{' '}
            {data.registrationDeadline?.toLocaleString()}
          </Typography>
        </Box>

        <Typography sx={{ mt: 2, mb: 1 }} variant='subtitle1'>
        {t('event.eventCreating.fields.description')}:
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </Paper>

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {renderImagePreviews()}
        </Box>

        <Alert severity='info' sx={{ mt: 3 }}>
        {t('event.eventCreating.description')}

        </Alert>
      </Box>
    </Stack>
  );
};