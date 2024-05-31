import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, Box, Container, IconButton, Typography } from '@mui/material';
import { validateTask } from '../../utils/validations';
import ImageIcon from '@mui/icons-material/Image';
import { toast } from 'react-toastify';
import { UserState } from '../../../redux/users/userSlice';
import { ManageTaskService } from '../../../api/tasks';
import axios from 'axios';


interface Step {
  title: string;
  status: boolean;
}

interface Task {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  steps: Step[];
}

const Taskform = () => {
  const user = useSelector((state: { user: UserState }) => state.user);
  const [image, setImage] = useState<File | null>(null);
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    steps: [],
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files ? event.target.files[0] : null);
  };

  const handleAddStep = () => {

    setTask({ ...task, steps: [...task.steps, { title: '', status: false }] });
  };

  const handleStepChange = (index: number, title: string) => {
    setTask({
      ...task,
      steps: task.steps.map((step, i) => i === index ? { title, status: step.status } : step)
    });
  };

  const handleRemoveStep = (index: number) => {
    setTask({ ...task, steps: task.steps.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateTask(task)) {
      const startDate = new Date(task.startDate);
      const endDate = new Date(task.endDate);
      const output = {
        user: user.email,
        task: {
          ...task,
          startDate,
          endDate,
        },
      };

      try {
        await axios.post(`${ManageTaskService.baseUrl}${ManageTaskService.endpoints.createTask}`, output);
        toast.success('Tarea creada con éxito');
        window.history.back();
      } catch (error) {
        toast.error('La solicitud no fue exitosa, verifica los campos e inténtalo más tarde');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Agregar una nueva tarea</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ width: '100%', height: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid gray', borderRadius: 1, marginBottom: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <ImageIcon style={{ fontSize: 60 }} />
            </IconButton>
          </label>
        </Box>
        <TextField label="Titulo" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} size="medium" fullWidth />
        <TextField label="Descripción" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} multiline rows={4} size="medium" fullWidth />
        <TextField label="Fecha de inicio (mm/dd/aaaa)" value={task.startDate} onChange={e => setTask({ ...task, startDate: e.target.value })} size="medium" fullWidth />
        <TextField label="Fecha de finalización (mm/dd/aaaa)" value={task.endDate} onChange={e => setTask({ ...task, endDate: e.target.value })} size="medium" fullWidth />
        {task.steps.map((step, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <TextField label="Subtarea" value={step.title} onChange={e => handleStepChange(index, e.target.value)} size="medium" sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" color="secondary" onClick={() => handleRemoveStep(index)} sx={{ flex: '0 0 auto' }}>Eliminar</Button>
          </Box>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', gap: 2, marginTop: 3 }}>
          <Button variant="contained" onClick={handleAddStep}>Agregar subtarea</Button>
          <Button variant="contained" type="submit">Guardar</Button>
          <Button variant="contained" onClick={() => window.history.back()}>Cancelar</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Taskform;
