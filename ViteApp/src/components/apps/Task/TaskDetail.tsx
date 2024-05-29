import { useParams } from "react-router-dom";
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
import axios from 'axios';
import { useEffect } from 'react';
import { ManageTaskService } from '../../../api/tasks';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { format } from '@formkit/tempo';

interface task {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    steps: Step[];
}

interface Step {
    title: string;
    status: boolean;
    _id: string;
}

export function renderSteps(task: { message: task } | null) {
    if (!task || !task.message || !task.message.steps || !('message' in task)) {
        return null;
    }
    return task.message.steps.map((step: Step, index: number) => (
        <ListItem key={index}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={step.status.toString() === 'true'}
                    />
                }
                label={step.title} {...(step.status.toString() === 'true' ? { style: { textDecoration: 'line-through' } } : {})}
            />
        </ListItem>
    ));
}

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState<{ message: task } | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${ManageTaskService.baseUrl}${ManageTaskService.endpoints.getTaskById}/${id}`);
                if (!response.data || !response.data.message) {
                    throw new Error('No se encontró la tarea');
                }
                const taskData = response.data.message; // Actualizado para reflejar la estructura del objeto de respuesta
                console.log(taskData);
                setTask(taskData);
            } catch (error) {
                const res = (error as AxiosError).response?.status;
                if (res === 500) {
                    toast.error('Error interno del servidor, inténtalo de nuevo más tarde');
                } else {
                    toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
                }
            }
        };
        fetchTask();
    }, [id]);

    // Función para renderizar la lista de pasos
    
    if (!task) {
        return; //indicador de carga aquí
    }
    return (
        <Box className="flex flex-row">
            <Box className="hidden sm:block">
                <IconButton 
                role="buttonBack"
                onClick={() => window.history.back()}>
                    <ArrowBackIcon color="primary" style={{ fontSize: 40 }} />
                </IconButton>
            </Box>
            <Container disableGutters className="bg-white flex flex-row justify-center max-w-3xl rounded-lg">
                <Box className="justify-center w-full">
                    <img src={logo} alt="Logo" className="rounded-lg" style={{ width: '100%', maxHeight: '250px', objectFit: "cover" }} />
                    <Box className="flex flex-col p-8">
                        <Box mb={2}>
                            <Typography variant="h4" fontWeight="bold">
                                {task && task.message && task.message.title}
                            </Typography>
                            <Box className="flex flex-col sm:flex-row">
                                <Typography variant="body1">
                                    <CalendarMonthIcon color="primary" className="mr-2" />
                                    {format(task && task.message && task.message.startDate, { date: "medium" })}
                                </Typography>
                                <Typography variant="body1" className="ml-0 mt-2 sm:mt-0 sm:ml-5 ">
                                    <DateRangeIcon color="primary" className="mr-2" />
                                    {format(task && task.message && task.message.endDate, { date: "medium" })}
                                </Typography>
                            </Box>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h5" fontWeight="bold" pt={1}>
                                Descripción
                            </Typography>
                            <Typography variant="body1" pt={1}>
                                {task && task.message && task.message.description}
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h5" fontWeight="bold" pt={1}>
                                Listado de pasos
                            </Typography>
                            <List dense={true}>
                                {renderSteps(task)}
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
export default TaskDetail;