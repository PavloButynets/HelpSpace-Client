import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'

import AppSelect from '~/components/app-select/AppSelect'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'

import { styles } from '~/containers/events-bar-menu/FilterBarMenu.styles'

import {
  EventFilters,
  UpdateFiltersInQuery,
} from '~/types'
import { sortTranslationKeys } from '~/containers/event-filter-block/OfferFilterBlock.constants'

interface FilterBarMenuProps {
  chosenFiltersQty?: number
  toggleFilters: () => void
  additionalParams: Record<string, unknown>
  updateFilters: UpdateFiltersInQuery<EventFilters>
  filters: EventFilters
}

const FilterBarMenu = forwardRef<HTMLDivElement, FilterBarMenuProps>(
  (
    {
      chosenFiltersQty,
      toggleFilters,
    },
    ref
  ) => {
    const { isMobile } = useBreakpoints()

    const { t } = useTranslation()

    return (
      <Box ref={ref} sx={isMobile ? styles.mobileContainer : styles.container}>
        <FiltersToggle
          chosenFiltersQty={chosenFiltersQty}
          handleToggle={toggleFilters}
        />
      </Box>
    )
  }
)

FilterBarMenu.displayName = 'FilterBarMenu'

export default FilterBarMenu
