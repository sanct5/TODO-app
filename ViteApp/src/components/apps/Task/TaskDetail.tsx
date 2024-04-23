import { useParams } from "react-router-dom";
import data from './data.json';
import { Grid, Typography } from '@mui/material';
import logo from '../../../assets/Images/Logo.png';
import { CardMedia } from "@mui/material";
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { List, ListItem, ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { useState } from 'react';


const TaskDetail = () => {
    const {id} = useParams();
    const task = data.tasks.find(task => task.id === parseInt(id));
    const [stepStatus, setStepStatus] = useState(
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
                        onChange={(e) => {
                            const newStatus = [...stepStatus];
                            newStatus[index] = e.target.checked;
                            setStepStatus(newStatus);
                        }}
                        />
                    }
                    label={step.title} {...(stepStatus[index] ? { style: { textDecoration: 'line-through' } } : {})}
                />
            </ListItem>
        ));
    }

    return (
        <Grid container component="main" sx={{ minHeight: '10vh' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                        my: 12,
                        mx: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CardMedia
                        component="img"
                        style={{ height: "30vh" }}
                        image={logo}
                    />
                    {task ? (
                        <Grid container display={"flex"} flexDirection={"column"} justifyContent={"center"} pt={1} pl={2} pr={2}>
                            <Typography variant="h4" fontWeight="bold">
                                {task.title}
                            </Typography>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} pt={1}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" pl={1}>
                                        <CalendarMonthIcon />
                                        {task.startDate}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" pl={1}>
                                        <DateRangeIcon />
                                        {task.endDate}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography variant="h5" fontWeight="bold" pt={1}>
                                Description
                            </Typography>
                            <Typography variant="body1" pt={1}>
                                {task.description}
                            </Typography>
                            <Typography variant="h5" fontWeight="bold" pt={1}>
                                Steps
                            </Typography>
                            <List dense={true}>
                                {renderSteps()}
                            </List>
                        </Grid>
                    ) : (
                        <Typography variant="h1" fontWeight="bold">
                            Task not found
                        </Typography>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};
export default TaskDetail;
