import React, { useEffect, useState } from 'react';
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
import SloganLogo from '../../assets/Images/SloganLogoNoBackGround.png';
import { useSelector, useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/users/userThunks';
import { UserState, setUser, setStayLogged } from '../../redux/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { getWithExpiry } from '../utils/localStorage';

const SignIn = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    //Estos estados se utilizan para manejar los inputs del formulario
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [checkedRemember, setCheckedRemember] = useState(false);

    //Estados para almacenar si el usuario está autenticado y si se debe recordar
    const { isLogin, stayLogged } = useSelector((state: { user: UserState }) => state.user);

    //Verifica si el checkbox de recordar está marcado
    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedRemember(event.target.checked);
    };

    //Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setStayLogged(checkedRemember));
        const data = new FormData(e.currentTarget);
        // @ts-ignore
        dispatch(LoginUser(data));
    }

    //Si el usuario ya está logueado, o marcó la casilla de recordar previamente, se redirige al dashboard
    useEffect(() => {
        const loggedUser = getWithExpiry('user');
        if (loggedUser) {
            dispatch(setUser(loggedUser));
        }

        if (isLogin) {
            Navigate('/app/task');
        }
    }, [isLogin, stayLogged]);

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
                        ¡Bienvenido!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 3, maxWidth: { xs: '90%', sm: '70%' }, textAlign: 'justify' }}>
                        Descubre el poder de organizar, administrar y realizar un seguimiento eficiente de tus tareas y proyectos. ¡Haz que cada día cuente y lleva la productividad al siguiente nivel con nosotros!
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: { xs: '90%', sm: '70%' } }}>
                        <TextField
                            margin="normal"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
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
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{ backgroundColor: '#f4f4f4' }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChecked}
                                    color="primary"
                                />
                            }
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