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

const SignIn = () => {
    const Navigate = useNavigate();
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [detailError, setDetailError] = useState(false);
    const [valueError, setValueError] = useState(false);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const user = data.get('email');
        const password = data.get('password');

        fetch('http://localhost:3000/login', {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: user,
                password: password,
            })
        })

            .then((res) => res.status)
            .then((res) => {

                if (res === 200) {
                    console.log('Login successful', value, error);
                    Navigate('/dashtask');
                }

                if (res === 401) {
                    setDetailError(true);
                    setValueError(false);
                    console.log('Password incorrect');
                }

                if (res === 500) {
                    setValueError(true);
                    setDetailError(true);
                    console.log('User not found');
                }

            });

    }

    return (
        <Grid container component="main" sx={{ minHeight: '100vh', alignContent: 'center' }}>
            <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square >
                <Box
                    sx={{
                        my: 7,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: (t) => t.palette.primary.main }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
                        Iniciar sesión
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3, maxWidth: '70%', textAlign: 'justify' }}>
                        Descubre el poder de organizar, administrar y realizar un seguimiento eficiente de tus tareas y proyectos. ¡Haz que cada día cuente y lleva la productividad al siguiente nivel con nosotros!
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: '70%' }}>
                        <TextField
                            margin="normal"
                            required
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            error={valueError}
                            helperText={!value ? 'Requerido' : ''}
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            value={error}
                            onChange={(e) => setError(e.target.value)}
                            error={detailError}
                            helperText={!error ? 'Requerido' : ''}
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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