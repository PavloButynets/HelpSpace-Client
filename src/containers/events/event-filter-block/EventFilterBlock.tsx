import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'

import Button from '~scss-components/button/Button'
import {
    EventFilters,
    FiltersActions,
} from '~/types'

import { styles } from '~/containers/events/event-filter-block/EventFilterBlock.styles'

interface OfferFilterBlockProps {
  filters: EventFilters
  filterActions: FiltersActions<EventFilters>
  closeFilters: () => void
  additionalParams: Record<string, unknown>
  open: boolean
  activeFilterCount?: number
}

const EventFilterBlock: FC<OfferFilterBlockProps> = ({
  filterActions,
  closeFilters,
  additionalParams,
  open,
}) => {
  const { t } = useTranslation()
  const { updateFiltersInQuery, resetFilters, updateQueryParams } =
    filterActions



  // const updateFilterByKey =
  //   <K extends keyof EventFilters>(key: K) =>
  //   (value: EventFilters[K]) => {
  //     updateFiltersInQuery({ [key]: value })
  //   }

  const handleApplyFilters = () => {
    updateQueryParams()
    updateFiltersInQuery(additionalParams)
    closeFilters()
  }



  return (
    <Stack spacing={2} sx={styles.root(open)}>

      <Button onClick={handleApplyFilters}>{t('button.applyFilters')}</Button>
      <Button onClick={resetFilters} variant='tonal'>
        {t('button.clearFilters')}
      </Button>
    </Stack>
  )
}

export default EventFilterBlock
