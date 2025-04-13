import { FC, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CircularProgress from '@mui/material/CircularProgress'
import { debounce } from 'lodash'

import Button from '~scss-components/button/Button'
import { EventFilters, FiltersActions } from '~/types'
import { LocationService } from '~/services/location-service'
import { EventService } from '~/services/event-service'
import { styles } from '~/containers/events/event-filter-block/EventFilterBlock.styles'
import { normalizeArrayValue } from '~/utils/helper-functions'
import { useQuery } from '@tanstack/react-query'

interface EventFilterBlockProps {
  filters: EventFilters
  filterActions: FiltersActions<EventFilters>
  closeFilters: () => void
  additionalParams: Record<string, unknown>
  open: boolean
  activeFilterCount?: number
}

const UKRAINE_CODE = 'UA'

const POPULAR_CITIES = [
  'Київ',
  'Львів',
  'Харків',
  'Одеса',
  'Дніпро',
  'Запоріжжя',
  'Вінниця',
  'Житомир',
  'Полтава',
  'Чернівці'
]

const EventFilterBlock: FC<EventFilterBlockProps> = ({
  filters,
  filterActions,
  closeFilters,
  additionalParams,
  open
}) => {
  const { t } = useTranslation()
  const { updateFiltersInQuery, resetFilters, updateQueryParams } =
    filterActions

  const [cities, setCities] = useState<string[]>(POPULAR_CITIES)
  const [cityInput, setCityInput] = useState<string>(filters.city || '')

  const [draftFilters, setDraftFilters] = useState<EventFilters>({ ...filters })

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['eventCategories'],
    queryFn: EventService.getEventCategories,
    staleTime: Infinity
  })

  const debouncedSearch = useCallback(
    debounce(async (searchText: string) => {
      if (!searchText || searchText.length < 2) {
        setCities(POPULAR_CITIES)
        return
      }
      try {
        const citiesData = await LocationService.getCities(
          searchText,
          UKRAINE_CODE
        )
        setCities(
          Array.isArray(citiesData) && citiesData.length > 0
            ? citiesData
            : POPULAR_CITIES
        )
      } catch (error) {
        console.error('Error fetching cities:', error)
        setCities(POPULAR_CITIES)
      }
    }, 400),
    []
  )

  const handleCityInputChange = async (value: string) => {
    setCityInput(value)
    if (value && value.length >= 2) {
      await debouncedSearch(value)
    } else if (value.length === 0) {
      setCities(POPULAR_CITIES)
    }
  }

  const handleApplyFilters = () => {
    updateQueryParams()
    updateFiltersInQuery(draftFilters)
    closeFilters()
  }

  const handleResetFilters = () => {
    setDraftFilters({ ...filters })
    resetFilters()
  }

  const handleDraftFilterChange = (key: keyof EventFilters, value: any) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Stack spacing={3} sx={styles.root(open)}>
      <Typography sx={{ mb: 2 }} variant='h6'>
        {t('event.filters.title')}
      </Typography>

      <Divider />

      <Stack spacing={1}>
        <Typography variant='subtitle2'>
          {t('event.filters.location')}
        </Typography>
        <Autocomplete
          freeSolo
          fullWidth
          getOptionLabel={(option) => option}
          inputValue={cityInput}
          onChange={(_, newValue) =>
            handleDraftFilterChange('city', newValue)
          }
          onInputChange={(_, newInputValue) => {
            void handleCityInputChange(newInputValue)
          }}
          options={cities}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('event.filters.cityInUkraine', 'Місто')}
              placeholder={t('event.filters.enterCity', 'Введіть місто')}
              size='small'
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: <>{params.InputProps.endAdornment}</>
                }
              }}
            />
          )}
          slotProps={{
            listbox: {
              style: {
                maxHeight: '200px',
                overflow: 'auto'
              }
            }
          }}
          value={filters.city}
        />
      </Stack>

      <Divider />

      {/* Categories Filter */}
      <Stack spacing={1}>
        <Typography variant='subtitle2'>
          {t('event.filters.categories')}
        </Typography>
        <Autocomplete
          disabled={loadingCategories}
          fullWidth
          loading={loadingCategories}
          multiple
          onChange={(_, category) => {
            handleDraftFilterChange('categories', category)
          }}
          options={categories.map((item => item.name))}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t('event.filters.selectCategories')}
              size='small'
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingCategories ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }
              }}
            />
          )}
          renderOption={(props, option) => {
            const { key, ...restProps } = props; 
            return (
              <li key={key} {...restProps}>
                {t(`event.categories.${option}`, option)}
              </li>
            );
          }}
          renderTags={(value, getTagProps) => {
            const safeValue = normalizeArrayValue(value.map((item => item)))

            return safeValue.map((option, index) => {
              const tagProps = getTagProps({ index })
              const { key, ...restTagProps } = tagProps
              return (
                <Chip
                  key={key}
                  label={t(`event.categories.${option}`, option)}
                  {...restTagProps}
                  size='small'
                />
              )
            })
          }}
          slotProps={{
            listbox: {
              style: {
                maxHeight: '200px',
                overflow: 'auto'
              }
            }
          }}
          value={normalizeArrayValue(draftFilters.categories)}
        />
      </Stack>

      <Divider />

      {/* Date Filter */}
      <Stack spacing={1}>
        <Typography variant='subtitle2'>
          {t('event.filters.eventDate')}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            onChange={(newValue) => {
              const dateString = newValue ? newValue.toISOString() : ''
              handleDraftFilterChange('eventDate', dateString)
            }}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                placeholder: t('event.filters.selectDate')
              }
            }}
            value={
              draftFilters.eventDate ? new Date(draftFilters.eventDate) : null
            }
          />
        </LocalizationProvider>
      </Stack>

      <Divider />

      {/* Show Completed Events */}
      <FormControlLabel
        control={
          <Checkbox
            checked={draftFilters.showCompleted}
            onChange={(e) =>
              handleDraftFilterChange('showCompleted', e.target.checked)
            }
          />
        }
        label={t('event.filters.showCompleted')}
      />

      {/* Action Buttons */}
      <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
        <Button fullWidth onClick={handleApplyFilters}>
          {t('button.applyFilters')}
        </Button>
        <Button fullWidth onClick={handleResetFilters} variant='tonal'>
          {t('button.clearFilters')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default EventFilterBlock
