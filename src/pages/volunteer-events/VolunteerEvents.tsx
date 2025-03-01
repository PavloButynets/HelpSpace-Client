import EventContainer, {CardsView} from "~/containers/events-container/EventContainer";
import React, {useRef, useState} from "react";
import {Event} from "~/containers/event-card/EventCard";
import {Box} from "@mui/material";
import {styles} from "~/pages/volunteer-events/VolunteerEvents.styles";
import AppDrawer from "~/components/app-drawer/AppDrawer";
import PageWrapper from "~/containers/page-wrapper/PageWrapper";
import useBreakpoints from "~/hooks/use-breakpoints";
import {PositionEnum} from "~/types";
import {useDrawer} from "~/hooks/use-drawer";
import FilterBarMenu from "~/containers/events-bar-menu/FilterBarMenu";
import FiltersToggle from "~/components/filters-toggle/FiltersToggle";
import {useFilterQuery} from "~/hooks/use-filter-query";
import { defaultFilters } from "./VolunteerEvents.consts";

const events: Event[] = [
    {
        _id: "1",
        comment: "Чудова можливість допомогти!",
        rating: 4.9,
        title: "Прибирання парку",
        price: 0,
        description: "Допомагаємо прибирати парк у центрі міста.",
        location: "Київ, Україна",
        author: {
            _id: "101",
            photo: "https://th.bing.com/th/id/OIP.LI0PzWCpdX4WmL4HadkRcQHaJQ?rs=1&pid=ImgDetMain",
            firstName: "Іван",
            lastName: "Петров"
        },
        category: "ecology",
        createdAt: "2024-02-20T10:00:00Z",
        updatedAt: "2024-02-22T12:30:00Z"
    },
    {
        _id: "2",
        comment: "Цікаво та корисно",
        rating: 4.7,
        title: "Допомога в притулку для тварин",
        price: 0,
        description: "Годуємо та вигулюємо тварин у притулку.",
        location: "Львів, Україна",
        author: {
            _id: "102",
            firstName: "Марія",
            lastName: "Коваленко"
        },
        category: "animals",
        createdAt: "2024-02-18T09:30:00Z",
        updatedAt: "2024-02-19T15:00:00Z"
    },
    {
        _id: "3",
        comment: "Дуже важлива ініціатива!",
        rating: 5.0,
        title: "Збір речей для дітей",
        price: 0,
        description: "Організовуємо збір одягу та іграшок для дітей з інтернату.",
        location: "Одеса, Україна",
        author: {
            _id: "103",
            photo: "https://th.bing.com/th/id/OIP.Lh8YpLwIgPLU8l39Txt0nAHaJQ?rs=1&pid=ImgDetMain",
            firstName: "Олександр",
            lastName: "Мессі"
        },
        category: "charity",
        createdAt: "2024-02-15T14:45:00Z",
        updatedAt: "2024-02-16T18:20:00Z"
    },
    {
        _id: "4",
        comment: "Корисний досвід!",
        rating: 4.5,
        title: "Навчання комп'ютерній грамотності",
        price: 0,
        description: "Навчаємо літніх людей користуватись комп’ютером.",
        location: "Харків, Україна",
        author: {
            _id: "104",
            photo: "https://img.freepik.com/premium-photo/close-up-portrait-beautiful-asian-woman-against-plain-background-generative-ai_601748-44471.jpg?w=2000",
            firstName: "Ольга",
            lastName: "Семенюк"
        },
        category: "education",
        createdAt: "2024-02-10T11:20:00Z",
        updatedAt: "2024-02-12T09:00:00Z"
    }
];


const VolunteerEvents = () => {
    const [cardsView, setCardsView] = useState<CardsView>('inline')
    const { isMobile, isLaptopAndAbove } = useBreakpoints()
    const targetBlock = useRef<HTMLDivElement>(null)
    const toggleFiltersOpen = () => (isOpen ? closeDrawer() : openDrawer())

    const { filters, activeFilterCount, searchParams, filterQueryActions } =
        useFilterQuery({
            defaultFilters: defaultFilters()
        })
    const { openDrawer, closeDrawer, isOpen } = useDrawer()

    return (
        <PageWrapper>

            <Box ref={targetBlock} sx={isMobile ? styles.mobileContainer : styles.container}>
                <FiltersToggle
                    chosenFiltersQty={activeFilterCount}
                    handleToggle={toggleFiltersOpen}
                />
            </Box>
            <Box sx={styles.filterSection}>
                {/*<AppDrawer*/}
                {/*    anchor={isLaptopAndAbove ? PositionEnum.Left : PositionEnum.Right}*/}
                {/*    onClose={closeDrawer}*/}
                {/*    open={isOpen}*/}
                {/*>*/}
                {/*    <OfferFilterBlock*/}
                {/*        activeFilterCount={activeFilterCount}*/}
                {/*        additionalParams={defaultParams}*/}
                {/*        closeFilters={closeDrawer}*/}
                {/*        filterActions={filterQueryActions}*/}
                {/*        filters={filters}*/}
                {/*        onToggleTutorOffers={handleShowingTutorOffers}*/}
                {/*        open={isOpen}*/}
                {/*        price={price}*/}
                {/*    />*/}
                {/*</AppDrawer>*/}
                <EventContainer
                    eventCards={events}
                    updateEventsInfo={() => {
                    }}
                    viewMode={cardsView}
                />
            </Box>
        </PageWrapper>
    )
}
export default VolunteerEvents