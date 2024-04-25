import { useParams } from "react-router-dom";
import data from './data.json';
import { Container, Typography } from '@mui/material';
import logo from '../../../assets/Images/Logo.png';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { List, ListItem } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

const TaskDetail = () => {
    const { id } = useParams();
    const task = data.tasks.find(task => task.id === parseInt(id));
    const [stepStatus] = useState(
        task.steps.map((step) => step.status)
    );
    // Función para renderizar la lista de pasos con íconos
    function renderSteps() {
        return task.steps.map((step, index) => (
            <ListItem key={index}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={stepStatus[index]}
                        /*onChange={(e) => {
                            const newStatus = [...stepStatus];
                            newStatus[index] = e.target.checked;
                            setStepStatus(newStatus);
                        }}
                        */
                        />
                    }
                    label={step.title} {...(stepStatus[index] ? { style: { textDecoration: 'line-through' } } : {})}
                />
            </ListItem>
        ));
    }
    return (
        <Container disableGutters className="bg-white flex flex-row justify-center max-w-3xl rounded-lg">
            <Box>
                <IconButton onClick={() => window.history.back()}>
                    <ArrowBackIcon color="primary" style={{ fontSize: 40 }} />
                </IconButton>
            </Box>
            <Box className="justify-center w-full">
                <img src={logo} alt="Logo" className="rounded-lg" style={{ width: '100%', maxHeight: '250px', objectFit: "cover" }} />
                <Box className="flex flex-col p-8">
                    <Box mb={2}>
                        <Typography variant="h4" fontWeight="bold">
                            {task.title}
                        </Typography>
                        <Box className="flex flex-col sm:flex-row">
                            <Typography variant="body1">
                                <CalendarMonthIcon color="primary" />
                                {task.startDate}
                            </Typography>
                            <Typography variant="body1" className="ml-0 mt-2 sm:mt-0 sm:ml-5 ">
                                <DateRangeIcon color="primary" />
                                {task.endDate}
                            </Typography>
                        </Box>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="h5" fontWeight="bold" pt={1}>
                            Descripción
                        </Typography>
                        <Typography variant="body1" pt={1}>
                            {task.description}
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="h5" fontWeight="bold" pt={1}>
                            Listado de pasos
                        </Typography>
                        <List dense={true}>
                            {renderSteps()}
                        </List>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
export default TaskDetail;
