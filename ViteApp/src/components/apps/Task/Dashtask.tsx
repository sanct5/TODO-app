import CardTask from "./CardTask"
import { ManageTaskService } from "../../../api/tasks"
import { useEffect, useState } from "react"
import axios from "axios"
import { UserState } from '../../../redux/users/userSlice';
import { useSelector } from 'react-redux';
import { Container, Grid, CircularProgress, Typography, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { format } from '@formkit/tempo';

interface Step {
    title: string;
    status: boolean;
}

interface TaskData {
    _id: number;
    description: string;
    title: string;
    endDate: string;
    startDate: string;
    steps: Step[];
}

interface ResponseData {
    message: {
        message: TaskData[];
    };
}

const Dashtask = () => {
    const [userTasks, setUserTasks] = useState<TaskData[]>([]);
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(true)

    const navigate = useNavigate();
    const userId = useSelector((state: { user: UserState }) => state.user.email);

    useEffect(() => {
        const getAllUserTasks = async (user: string) => {
            setLoading(true);
            const response = await axios.get<ResponseData>(`${ManageTaskService.baseUrl}${ManageTaskService.endpoints.getAllByUser}/${user}`);
            setUserTasks(response.data.message.message);
            console.log(response.data.message.message);
            setLoading(false);
        }
        getAllUserTasks(userId);
    }, []);

    useEffect(() => {
        const orderedTasks = [...userTasks].sort((a, b) => {
            if (order) {
                return a.endDate.localeCompare(b.endDate);
            } else {
                return b.endDate.localeCompare(a.endDate);
            }
        });
        setUserTasks(orderedTasks);
    }, [order]);

    return (
        <Container disableGutters className=" flex flex-col justify-center w-full max-w-full">
            {!loading && (
                <>
                    <Container disableGutters className="bg-white flex sm:flex-row flex-col justify-between w-full max-w-full p-5 rounded-lg space-y-2 sm:space-y-0 space-x-0 sm:space-x-2">
                        <TextField
                            className="max-w-3xl w-full sm:w2/5"
                            variant="outlined"
                            placeholder="Buscar tareas..."
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <Search />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            role="buttonOrder"
                            endIcon={order ? <ArrowDownward /> : <ArrowUpward />}
                            onClick={() => setOrder(!order)} // Solo cambia el estado order aquí
                        >
                            Ordenar por expiración
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={() => navigate('create')}
                        >
                            Crear tarea
                        </Button>
                    </Container>
                    <Typography variant="h4" className="sm:text-left text-center mt-5">Gestiona tus tareas</Typography>
                </>
            )}
            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <CircularProgress />
                    <Typography variant="h5" className="ml-4">Cargando...</Typography>
                </div>
            ) : (
                <Grid container className="p-8">
                    {userTasks.map(task => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                            <CardTask
                                id={task._id}
                                description={task.description}
                                title={task.title}
                                endDate={format(task.endDate, { date: "medium" })}
                                steps={task.steps}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default Dashtask