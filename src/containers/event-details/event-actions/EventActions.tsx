import React from 'react';
import { Box, Typography } from '@mui/material';
import { getFormattedDate } from '~/utils/helper-functions';
import Button from "~scss-components/button/Button";
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
export const styles = {
    actionsContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    registrationInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    infoItem: {
        fontSize: '1rem',
        '& strong': {
            fontWeight: 'bold',
        },
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    secondaryActions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
    },
};
interface EventActionsProps {
    onRegister: () => void;
    isRegistering: boolean;
    deadline: string;
    slots: number;
    participants: number;
}

const EventActions: React.FC<EventActionsProps> = ({
    onRegister,
    isRegistering,
    deadline,
    slots,
    participants
}) => {
    const availableSlots = slots - participants;
    const isRegistrationOpen = new Date(deadline) > new Date();

    return (
        <Box sx={styles.actionsContainer}>
            <Box sx={styles.registrationInfo}>
                <Box sx={styles.infoItem}>
                    <Typography component="span">Доступно місць: </Typography>
                    <Typography component="strong">{availableSlots > 0 ? availableSlots : 'Немає місць'}</Typography>
                </Box>
                <Box sx={styles.infoItem}>
                    <Typography component="span">Реєстрація відкрита до: </Typography>
                    <Typography component="strong">{getFormattedDate({ date: deadline })}</Typography>
                </Box>
            </Box>

            <Box sx={styles.actionButtons}>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={onRegister}
                    disabled={!isRegistrationOpen || availableSlots <= 0 || isRegistering}
                    loading={isRegistering}
                    fullWidth
                >
                    {isRegistering ? 'Реєстрація...' : 'Зареєструватися як волонтер'}
                </Button>

                <Box sx={styles.secondaryActions}>
                    <Button variant="primary" size="md" startIcon={<ShareIcon />}>
                        Поділитися
                    </Button>
                    <Button variant="primary" size="md" startIcon={<BookmarkIcon />}>
                        Зберегти
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EventActions;