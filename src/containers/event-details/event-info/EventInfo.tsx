import React from 'react';
import {Box, Typography} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import {getFormattedDate} from '~/utils/helper-functions';

export const styles = {
    infoContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
    },
    infoTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '1.25rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #eee',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        lineHeight: 1.4,
        position: 'relative',
        paddingLeft: '2rem',
    },
    infoIcon: {
        position: 'absolute',
        left: 0,
        top: '0.2rem',
        color: '#3498db',
        fontSize: '1.25rem',
    },
    infoLabel: {
        fontWeight: 600,
        marginRight: '0.5rem',
    },
};

interface EventInfoProps {
    startDate: string;
    endDate: string;
    city: string;
    address: string;
    slots: number;
    participants: number;
}

const EventInfo: React.FC<EventInfoProps> = ({
                                                 startDate,
                                                 endDate,
                                                 city,
                                                 address,
                                                 slots,
                                                 participants
                                             }) => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    const isSameDay = startDateTime.toDateString() === endDateTime.toDateString();

    return (
        <Box sx={styles.infoContainer}>
            <Typography sx={styles.infoTitle} variant="h3">Інформація про подію</Typography>

            <Box sx={styles.infoItem}>
                <CalendarTodayIcon sx={styles.infoIcon}/>
                <Typography component="span" sx={styles.infoLabel}>Дата:</Typography>
                <Typography component="span">
                    {!isSameDay
                        ? `${getFormattedDate({date: startDate})} - ${getFormattedDate({date: endDate})}`
                        : getFormattedDate({date: startDate})}
                </Typography>
            </Box>

            {!isSameDay &&
                (<Box sx={styles.infoItem}>
                    <AccessTimeIcon sx={styles.infoIcon}/>
                    <Typography component="span" sx={styles.infoLabel}>Час:</Typography>
                    <Typography component="span">
                        {`${startDateTime.toLocaleTimeString()} - ${endDateTime.toLocaleTimeString()}`}
                    </Typography>
                </Box>)}

            <Box sx={styles.infoItem}>
                <LocationOnIcon sx={styles.infoIcon}/>
                <Typography component="span" sx={styles.infoLabel}>Місце:</Typography>
                <Typography component="span">{city}</Typography>
            </Box>

            <Box sx={styles.infoItem}>
                <HomeIcon sx={styles.infoIcon}/>
                <Typography component="span" sx={styles.infoLabel}>Адреса:</Typography>
                <Typography component="span">{address}</Typography>
            </Box>

            <Box sx={styles.infoItem}>
                <PeopleIcon sx={styles.infoIcon}/>
                <Typography component="span" sx={styles.infoLabel}>Волонтери:</Typography>
                <Typography component="span">{participants} з {slots}</Typography>
            </Box>
        </Box>
    );
};

export default EventInfo;