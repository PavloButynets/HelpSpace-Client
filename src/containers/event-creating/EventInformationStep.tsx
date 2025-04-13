// src/containers/event-creating/EventInformationStep.tsx
import React, { useState, useCallback } from 'react'
import {
  Box,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Chip
} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { EventCategory } from '~/types/event'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Button from '~scss-components/button/Button'
import { LocationService } from '~/services/location-service'
import { uk, enUS } from 'date-fns/locale'; 
import { getFromLocalStorage } from '~/services/local-storage-service'

const UKRAINE_CODE = 'UA'

interface EventInformationStepProps {
  categories: EventCategory[]
  loadingCategories: boolean
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeImage: () => void
}

export const EventInformationStep: React.FC<EventInformationStepProps> = ({
  categories,
  loadingCategories,
  handleImageUpload,
  removeImage
}) => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>('')

  const { t } = useTranslation()
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext()

  const imageFile = watch('imageFile')

  const debouncedSearch = useCallback(
    debounce(async (searchText: string) => {
      if (!searchText || searchText.length < 2) {
        return
      }
      try {
        const citiesData = await LocationService.getCities(
          searchText,
          UKRAINE_CODE
        )
        setCities(citiesData)
      } catch (error) {
        console.error('Error fetching cities:', error)
        setCities([])
      }
    }, 400),
    []
  )

  const handleCityInputChange = (value: string) => {
    setCityInput(value)
    if (value && value.length >= 2) {
      debouncedSearch(value)
    }
  }

  const renderImagePreview = () => {
    if (!imageFile) return null

    const previewUrl = URL.createObjectURL(imageFile)

    return (
      <Box
        sx={{
          position: 'relative',
          width: 100,
          height: 100,
          marginTop: 2,
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2
        }}
      >
        <img
          alt='Preview'
          src={previewUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: '0 0 0 8px',
            cursor: 'pointer',
            p: 0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={removeImage}
        >
          <Typography color='white' variant='caption'>
            Remove
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Stack spacing={3}>
      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title}
            helperText={errors.title?.message?.toString()}
            label={t('event.eventCreating.fields.title')}
            required
            fullWidth
          />
        )}
      />

      <Controller
        name='city'
        control={control}
        render={({ field }) => (
          <Autocomplete
            freeSolo
            options={cities}
            inputValue={cityInput}
            value={field.value || ''}
            getOptionLabel={(option) => String(option)}
            onInputChange={(_, newInputValue, reason) => {
              setCityInput(newInputValue)
              if (reason === 'input') {
                handleCityInputChange(newInputValue)
              }
            }}
            onChange={(_, newValue) => {
              field.onChange(newValue || '')
              setCityInput(newValue || '')
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errors.city}
                helperText={errors.city?.message?.toString()}
                label={t('event.eventCreating.fields.city')}
                required
                fullWidth
              />
            )}
          />
        )}
      />

      <Controller
        name='address'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={() => field.onBlur()}
            error={!!errors.address}
            helperText={errors.address?.message?.toString()}
            label={t('event.eventCreating.fields.address')}
            required
            fullWidth
          />
        )}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name='startDate'
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={getFromLocalStorage('language') === 'uk' ? uk : enUS}>
              <DateTimePicker
                label={t('event.eventCreating.fields.startDate')}
                onChange={field.onChange}
                value={field.value || null}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.registrationDeadline,
                    helperText:
                      errors.registrationDeadline?.message?.toString(),
                    onBlur: field.onBlur // Додайте onBlur
                  }
                }}
                inputRef={field.ref} // Передайте ref
              />
            </LocalizationProvider>
          )}
        />

        <Controller
          name='endDate'
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={getFromLocalStorage('language') === 'uk' ? uk : enUS}>
              <DateTimePicker
                label={t('event.eventCreating.fields.endDate')}
                onChange={field.onChange}
                value={field.value || null}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    error: !!errors.registrationDeadline,
                    helperText:
                      errors.registrationDeadline?.message?.toString(),
                    onBlur: field.onBlur 
                  }
                }}
                inputRef={field.ref} 
              />
            </LocalizationProvider>
          )}
        />
      </Stack>
      <Controller
        name='categories'
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            disabled={loadingCategories}
            options={categories}
            getOptionLabel={(option) => {
              const translated = t(
                `event.categories.${option.name}`,
                option.name
              )
              return String(translated) 
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={String(
                    t(`event.categories.${option.name}`, option.name)
                  )}
                  {...getTagProps({ index })}
                  size='small'
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!errors.categories}
                helperText={errors.categories?.message?.toString()}
                label={t('event.eventCreating.fields.categories')}
                placeholder={t('event.filters.selectCategories')}
                required
              />
            )}
            onChange={(_, newValue) => {
              field.onChange(newValue)
            }}
            value={field.value || []}
          />
        )}
      />

      <Box>
        <Typography gutterBottom variant='subtitle1'>
        {t('event.eventCreating.fields.coverImage')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            component='label'
            startIcon={<InfoOutlinedIcon />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
            variant='primary'
          >
            {t('event.eventCreating.fields.uploadImage')}
            <input
              accept='image/*'
              hidden
              onChange={handleImageUpload}
              type='file'
            />
          </Button>

          {renderImagePreview()}

          <Typography color='text.secondary' variant='caption'>
          {t('event.eventCreating.fields.imageRecommendations')}
          </Typography>
        </Box>
      </Box>
    </Stack>
  )
}
