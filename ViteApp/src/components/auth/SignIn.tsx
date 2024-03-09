import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Copyright } from '../common/Copyright';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SloganLogo from '../../assets/Images/SloganLogoNoBackGround.png';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { validateEmailFormat } from '../common/validations';

const SignIn = () => {
    const Navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [validEmail, setValidEmail] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = (data.get('email') as string).trim().toLowerCase();
        const password = (data.get('password') as string).trim();

        if (!email) {
            toast.warn('El campo de correo electrónico no puede estar vacío');
            return;
        }

        if (!validateEmailFormat(email as string)) {
            return;
        }

        if (!password) {
            toast.warn('El campo de contraseña no puede estar vacío');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_OTASK_BACKEND}/user/login`, {
                user: email,
                password: password,
            });

            console.log(response);
            const emailId = "poshito123"

            Navigate(`/dashtask/${emailId}`);
            toast.success(`Bienvenido ${emailId}!`);

        } catch (error) {
            const res = (error as AxiosError).response?.status;

            if (res === 401) {
                setValidPassword(true);
                setValidEmail(true);
                toast.error('Contraseña o correo electrónico incorrecto');
            } else if (res === 404) {
                setValidPassword(false);
                setValidEmail(false);
                toast.info('No se encontró el recurso solicitado');
            } else {
                setValidPassword(false);
                setValidEmail(false);
                toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
            }
        }
    }

    return (
        <Grid container component="main" sx={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: (t) => t.palette.primary.main }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
                        Iniciar sesión
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3, maxWidth: { xs: '90%', sm: '70%' }, textAlign: 'justify' }}>
                        Descubre el poder de organizar, administrar y realizar un seguimiento eficiente de tus tareas y proyectos. ¡Haz que cada día cuente y lleva la productividad al siguiente nivel con nosotros!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: { xs: '90%', sm: '70%' } }}>
                        <TextField
                            margin="normal"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            error={validEmail}
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{ backgroundColor: '#f4f4f4' }}
                        />
                        <TextField
                            margin="normal"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            error={validPassword}
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{ backgroundColor: '#f4f4f4' }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recuérdame"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 4, height: '50px' }}
                        >
                            Acceder
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    ¿Olvidó su contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"¿No tienes una cuenta? Regístrate"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
            <Grid
                item
                xs={0}
                sm={0}
                md={6}
                sx={{
                    backgroundImage: `url(${SloganLogo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) => t.palette.primary.main,
                    backgroundPosition: 'center',
                }}
            />
        </Grid>
    )
}

export default SignIn