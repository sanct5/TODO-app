import { useParams } from "react-router-dom";
import { Container, Dialog, Box, Typography, List, ListItem, CircularProgress, Button, IconButton, DialogContent, DialogContentText, DialogActions, Checkbox, FormControlLabel } from "@mui/material";
import logo from '../../../assets/Images/Logo.png';
import { Delete, ArrowBack, DateRange, CalendarMonth, Warning } from "@mui/icons-material";
import { useState } from 'react';
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

const TaskDetail = () => {
    const { id } = useParams();
    const [task, setTask] = useState<{ message: task } | null>(null);
    const [loading, setLoading] = useState(true);
    const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});
    const [updatingSteps, setUpdatingSteps] = useState<Record<string, boolean>>({});
    const [openModal, setOpenModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`${ManageTaskService.baseUrl}${ManageTaskService.endpoints.getTaskById}/${id}`);
                if (!response.data || !response.data.message) {
                    throw new Error('No se encontró la tarea');
                }
                const taskData = response.data.message;

                const initialCheckedStates = taskData.message.steps.reduce((acc: Record<string, boolean>, step: Step) => ({ ...acc, [step._id]: step.status }), {});

                setCheckedStates(initialCheckedStates); // Establecer el estado inicial
                setTask(taskData);
            } catch (error) {
                const res = (error as AxiosError).response?.status;
                if (res === 500) {
                    toast.error('Error interno del servidor, inténtalo de nuevo más tarde');
                } else {
                    toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleCheck = (stepId: string, status: boolean) => async () => {
        setUpdatingSteps(prev => ({ ...prev, [stepId]: true }));
        setCheckedStates(prev => ({ ...prev, [stepId]: !status }));

        try {
            const body = {
                taskId: id,
                stepId: stepId,
                status: !status
            };

            const response = await axios.post(`${ManageTaskService.baseUrl}${ManageTaskService.endpoints.updateTaskStep}`, body);

            if (response.status !== 200) {
                setCheckedStates(prev => ({ ...prev, [stepId]: status })); // Si la petición falla, revierte el estado del checkbox
                toast.error('Error al actualizar el estado de la tarea');
            } else {
                toast.success('Estado de la tarea actualizado');
            }

        } catch (error) {
            setCheckedStates(prev => ({ ...prev, [stepId]: status })); // Si la petición falla, revierte el estado del checkbox
            const res = (error as AxiosError).response?.status;
            if (res === 500) {
                toast.error('Error interno del servidor, inténtalo de nuevo más tarde');
            } else {
                toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
            }
        } finally {
            setUpdatingSteps(prev => ({ ...prev, [stepId]: false }));
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        /*try {
            const response = await axios.delete(`${ManageTaskService.baseUrl}${ManageTaskService.endpoints.deleteTask}/${id}`);
            if (response.status !== 200) {
                toast.error('Error al eliminar la tarea');
            } else {
                toast.success('Tarea eliminada');
                setOpenModal(false);
                window.history.back();
            }
        } catch (error) {
            const res = (error as AxiosError).response?.status;
            if (res === 500) {
                toast.error('Error interno del servidor, inténtalo de nuevo más tarde');
            } else {
                toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
            }
        } finally {
            setIsDeleting(false);
        } */


        // simular borrado exitoso
        /*setTimeout(() => {
            toast.success('Tarea eliminada');
            setOpenModal(false);
            window.history.back();
        }, 2000); */

        //Simular borrado fallido
        setTimeout(() => {
            toast.error('Error al eliminar la tarea');
            setIsDeleting(false);
        }, 2000);
    }

    return (
        <Box className="flex flex-row">
            <Box className="hidden sm:block">
                <IconButton onClick={() => window.history.back()}>
                    <ArrowBack color="primary" style={{ fontSize: 40 }} />
                </IconButton>
            </Box>
            <Container disableGutters className="bg-white flex flex-row justify-center max-w-3xl rounded-lg">
                {loading ? (
                    <Box className="flex flex-col justify-center items-center h-screen">
                        <CircularProgress />
                        <Typography variant="h5" className="ml-4">Cargando...</Typography>
                    </Box>
                ) : (
                    <Box className="justify-center w-full">
                        <img src={logo} alt="Logo" className="rounded-lg" style={{ width: '100%', maxHeight: '250px', objectFit: "cover" }} />
                        <Box className="flex flex-col p-8">
                            <Box mb={2}>
                                <Typography variant="h4" fontWeight="bold">
                                    {task!.message.title}
                                </Typography>
                                <Box className="flex flex-col sm:flex-row">
                                    <Typography variant="body1">
                                        <CalendarMonth color="primary" className="mr-2" />
                                        {format(task!.message.startDate, { date: "medium" })}
                                    </Typography>
                                    <Typography variant="body1" className="ml-0 mt-2 sm:mt-0 sm:ml-5 ">
                                        <DateRange color="primary" className="mr-2" />
                                        {format(task!.message.endDate, { date: "medium" })}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="h5" fontWeight="bold" pt={1}>
                                    Descripción
                                </Typography>
                                <Typography variant="body1" pt={1}>
                                    {task!.message.description}
                                </Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="h5" fontWeight="bold" pt={1}>
                                    Listado de pasos
                                </Typography>
                                <List dense={true}>
                                    {task!.message.steps.map((step: Step, index: number) => (
                                        <ListItem key={index}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checkedStates[step._id]}
                                                        onChange={handleCheck(step._id, checkedStates[step._id])}
                                                    />
                                                }
                                                label={
                                                    <Box display="flex" alignItems="center">
                                                        <Typography>{step.title}</Typography>
                                                        {updatingSteps[step._id] && <CircularProgress size={20} />}
                                                    </Box>
                                                }
                                                {...(checkedStates[step._id] ? { style: { textDecoration: 'line-through' } } : {})}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                            <IconButton className="flex w-fit self-end">
                                <Delete color="primary" onClick={() => setOpenModal(true)} fontSize="large" />
                            </IconButton>
                        </Box>
                    </Box>)}
            </Container>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogContent>
                    {!isDeleting ? (<Warning color="secondary" style={{ fontSize: 60, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />) : <CircularProgress style={{ fontSize: 50, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />}
                    <DialogContentText align="center" fontSize={20} sx={{ marginTop: "25px" }}>
                        ¿Estás seguro de que deseas eliminar la tarea: <b>{task?.message.title}</b>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default TaskDetail;