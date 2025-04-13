import EventContainer from "~/containers/events/events-container/EventContainer";
import React, { ChangeEvent, useCallback, useRef } from "react";
import { Box } from "@mui/material";
import { styles } from "~/pages/volunteer-events/VolunteerEvents.styles";
import AppDrawer from "~/components/app-drawer/AppDrawer";
import PageWrapper from "~/containers/page-wrapper/PageWrapper";
import useBreakpoints from "~/hooks/use-breakpoints";
import { PositionEnum, SizeEnum } from "~/types";
import { useDrawer } from "~/hooks/use-drawer";
import FiltersToggle from "~/components/filters-toggle/FiltersToggle";
import { useFilterQuery } from "~/hooks/use-filter-query";
import { defaultFilters, itemsPerPage } from "./VolunteerEvents.consts";
import EventFilterBlock from "~/containers/events/event-filter-block/EventFilterBlock";
import { useQuery } from "@tanstack/react-query";
import Loader from "~/components/loader/Loader";
import AppPagination from "~/components/pagination/AppPagination";
import usePagination from "~/hooks/use-pagination";
import { EventService } from "~/services/event-service";
import { Event } from "~/types";

const VolunteerEvents = () => {
    const { isMobile, isLaptopAndAbove } = useBreakpoints()
    const { openDrawer, closeDrawer, isOpen } = useDrawer()

    const targetBlock = useRef<HTMLDivElement>(null)
    const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

    const defaultParams = { page: defaultFilters().page }

    const { filters, activeFilterCount, filterQueryActions, searchParams } =
        useFilterQuery({
            defaultFilters: defaultFilters(),
        })
    const currentPage = Number(filters.page || 1);

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
        filterQueryActions.updateFiltersInQuery({
            ...filters,
            page 
        })

        if (targetBlock.current) {
            targetBlock.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const getEvents = useCallback(() => {
        return EventService.getAllEvents({
            ...filters,
            limit: itemsPerPage,
            page: currentPage,
        })
    }, [filters, currentPage])

    const {
        data: eventsResponse,
        isLoading: eventsLoading,
    } = useQuery({
        queryKey: ['events', filters],
        queryFn: getEvents,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    const eventItems = (eventsResponse?.items || []);
    const eventsCount = eventsResponse?.total || 0;

    const { pageCount } = usePagination({
        itemsCount: eventsCount,
        itemsPerPage
    })


    return (
        <PageWrapper>
            <Box ref={targetBlock} sx={isMobile ? styles.mobileContainer : styles.container}>
                <FiltersToggle
                    chosenFiltersQty={activeFilterCount}
                    handleToggle={toggleFiltersOpen}
                />
            </Box>
            <Box sx={styles.filterSection}>
                <AppDrawer
                    anchor={isLaptopAndAbove ? PositionEnum.Left : PositionEnum.Right}
                    onClose={closeDrawer}
                    open={isOpen}
                >
                    <EventFilterBlock
                        activeFilterCount={activeFilterCount}
                        additionalParams={defaultParams}
                        closeFilters={closeDrawer}
                        filterActions={filterQueryActions}
                        filters={filters}
                        open={isOpen}
                    />
                </AppDrawer>
                {eventsLoading || !eventItems ? (
                    <Loader />
                )
                    : (
                        <EventContainer
                            eventCards={eventItems}
                            updateEventsInfo={() => {
                            }}
                        />)}
            </Box>
            <AppPagination
                onChange={handlePageChange}
                page={Number(filters.page)}
                pageCount={pageCount}
                size={isMobile ? SizeEnum.Small : SizeEnum.Medium}
                sx={styles.pagination(eventsLoading || !eventsCount)}
            />
        </PageWrapper>
    )
}
export default VolunteerEvents