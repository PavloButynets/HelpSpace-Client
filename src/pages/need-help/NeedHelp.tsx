import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';
import Button from '~scss-components/button/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageWrapper from '~/containers/page-wrapper/PageWrapper';
import { EventService } from '~/services/event-service';
import { useForm, FormProvider } from 'react-hook-form';
import { EventInformationStep } from '~/containers/event-creating/EventInformationStep';
import { EventDetailsStep } from '~/containers/event-creating/EventDetailsStep';
import { EventReviewStep } from '~/containers/event-creating/EventReviewStep';
import { SubmissionSuccess } from '~/containers/event-creating/SubmissionSuccess';
import { eventInformationSchema, eventDetailsSchema, eventFormSchema, EventFormSchema } from '~/schemas/event-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
// Define our step configuration
const STEPS_CONFIG = [
  {
    labelKey: 'event.eventCreating.stepsLabels.eventInformation',
    schema: eventInformationSchema
  },
  {
    labelKey: 'event.eventCreating.stepsLabels.eventDetails',
    schema: eventDetailsSchema
  },
  {
    labelKey: 'event.eventCreating.stepsLabels.review',
    schema: null
  }
];

const NeedHelp: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { t } = useTranslation();
  const currentSchema = STEPS_CONFIG[activeStep].schema || eventFormSchema;

  const methods = useForm<EventFormSchema>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      city: '',
      address: '',
      startDate: undefined,
      endDate: undefined,
      categories: [],
      volunteerSlots: '',
      registrationDeadline: undefined,
      description: '',
      imageFile: null,
    },
    mode: 'onChange'
  });

  const { handleSubmit, setValue, trigger, watch } = methods;

  const formData = watch();

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['eventCategories'],
    queryFn: EventService.getEventCategories,
    staleTime: Infinity
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    setValue('imageFile', file, { shouldValidate: true });
  };

  const removeImage = () => {
    setValue('imageFile', null, { shouldValidate: true });
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof EventFormSchema)[] = [];

    if (activeStep === 0) {
      fieldsToValidate = ['title', 'city', 'address', 'startDate', 'endDate', 'categories', 'imageFile'];
    } else if (activeStep === 1) {
      fieldsToValidate = ['volunteerSlots', 'registrationDeadline', 'description'];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      setActiveStep(prevStep => prevStep + 1);
    } else {
      console.error('Validation failed for fields:', fieldsToValidate);
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const queryClient = useQueryClient();

const createEventMutation = useMutation({
  mutationFn: async (data: EventFormSchema) => {
    const submitData = new FormData();

    if (data.imageFile) {
      submitData.append('imageFile', data.imageFile);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'imageFile' && key !== 'categories' && value !== undefined && value !== null) {
        submitData.append(key, value instanceof Date ? value.toISOString() : String(value));
      }
    });

    data.categories.forEach((category, index) => {
      Object.entries(category).forEach(([key, value]) => {
        submitData.append(`categories[${index}][${key}]`, String(value));
      });
    });

    return await EventService.createEvent(submitData);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['events'],
      exact: false,
    });  },
});

const onSubmit = async (data: EventFormSchema) => {
  createEventMutation.mutate(data, {
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error) => {
      console.error('Error submitting event:', error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  setIsSubmitting(true);
};


  // Simplified step rendering with common props
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <EventInformationStep
            categories={categories}
            handleImageUpload={handleImageUpload}
            loadingCategories={loadingCategories}
            removeImage={removeImage}
          />
        );
      case 1:
        return <EventDetailsStep />;
      case 2:
        return <EventReviewStep data={formData} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  if (submitted) {
    return <SubmissionSuccess />;
  }

  return (
    <PageWrapper>
      <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
        <Typography component='h1' gutterBottom variant='h4'>
          {t('event.eventCreating.title')}
        </Typography>

        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <InfoOutlinedIcon sx={{ color: 'primary.main', mt: 0.5 }} />
            <Box>
              <Typography gutterBottom variant='h6'>
              {t('event.eventCreating.howItWorks')}
              </Typography>
              <Typography component='p' variant='body1'>
              {t('event.eventCreating.description')}
              </Typography>
              <Typography component='div' sx={{ mb: 1 }} variant='body2'>
              {t('event.eventCreating.process')}
              <ol style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {(t('event.eventCreating.steps', { returnObjects: true }) as string[]).map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {STEPS_CONFIG.map(({ labelKey }) => (
              <Step key={labelKey}>
                <StepLabel>{t(labelKey)}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant='text-primary'
              >
                  {t('event.eventCreating.backButton')}
                  </Button>
              <Box>
                {activeStep === STEPS_CONFIG.length - 1 ? (
                  <Button
                    color='primary'
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                    startIcon={isSubmitting && (
                      <CircularProgress color='inherit' size={20} />
                    )}
                    variant='primary'
                  >
                      {isSubmitting ? t('event.eventCreating.submittingButton') : t('event.eventCreating.submitButton')}
                      </Button>
                ) : (
                  <Button
                    color='primary'
                    onClick={handleNext}
                    variant='primary'
                  >
                      {t('event.eventCreating.nextButton')}
                      </Button>
                )}
              </Box>
            </Box>
          </form>
        </FormProvider>
        </Paper>
      </Box>
    </PageWrapper>
  );
};

export default NeedHelp;
