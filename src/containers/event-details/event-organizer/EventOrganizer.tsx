import React from 'react';
import {Box, Typography, Avatar} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import UserAvatar from "~scss-components/user-avatar/UserAvatar";

export const styles = {
    organizerContainer: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
    },
    organizerTitle: {
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: '1.5rem',
    },
    organizerContent: {
        display: 'flex',
        gap: '1.5rem',
        flexDirection: {xs: 'column', sm: 'row'},
        alignItems: {xs: 'center', sm: 'flex-start'},
        textAlign: {xs: 'center', sm: 'left'},
    },
    organizerLogo: {
        width: '100px',
        height: '100px',
        borderRadius: '8px',
    },
    organizerInfo: {
        flex: 1,
    },
    organizerName: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '0.5rem',
    },
    organizerDescription: {
        marginBottom: '1rem',
        color: '#444',
        lineHeight: 1.5,
    },
    organizerContact: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#3498db',
        justifyContent: {xs: 'center', sm: 'flex-start'},
    },
};

interface OrganizerProps {
    organizer: {
        id: string;
        firstName: string;
        lastName: string;
        photo?: string;
        email: string;
    };
}

const EventOrganizer: React.FC<OrganizerProps> = ({organizer}) => {
    return (
        <Box sx={styles.organizerContainer}>
            <Typography sx={styles.organizerTitle} variant="h3">Організатор</Typography>

            <Box sx={styles.organizerContent}>
                <UserAvatar
                    variant={'photo'}
                    firstName={organizer.firstName}
                    lastName={organizer.lastName}
                    src={organizer.photo}
                    sx={styles.organizerLogo}
                />

                <Box sx={styles.organizerInfo}>
                    <Typography sx={styles.organizerName}
                                variant="h4">{organizer.firstName} {organizer.lastName}</Typography>
                    <Box sx={styles.organizerContact}>
                        <EmailIcon/>
                        <Typography component="span">{organizer.email}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default EventOrganizer;