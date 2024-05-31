import React, { ReactNode, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NavOptions from './NavOptions';
import { AccountCircle, Menu, ChevronLeft, Notifications, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser, UserState, resetUser } from '../../redux/users/userSlice';
import { getWithExpiry, deleteLocalStorage } from '../../components/utils/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '.././../assets/Images/IconNoBackGroundNoLine.png';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const Navbar = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    //Estado para almacenar los datos del usuario
    const user = useSelector((state: { user: UserState }) => state.user);

    //Estado para manejar el estado del Drawer
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    //Función para cerrar sesión
    const handleOnLogout = () => {
        deleteLocalStorage('user');
        dispatch(resetUser());
        navigate("/login");
    }

    //Si el usuario no está logueado y no marcó la casilla de "recuerdame", se redirige al login
    const loggedUser = getWithExpiry('user');
    if (loggedUser) {
        dispatch(setUser(loggedUser));
    }

    if (!user.isLogin && !loggedUser) {
        toast.error('Por favor inicia sesión nuevamente');
        navigate('/login');
    }

    //Función para obtener el título de la página
    let title;
    switch (location.pathname) {
        case '/app/dashboard':
            title = 'Dashboard';
            break;
        case '/app/task':
            title = 'Tareas';
            break;
        case '/app/profile':
            title = 'Perfil';
            break;
        case '/app/task/create':
            title = 'Agregar tareas';
            break;
        default:
            title = 'Dashboard';
    }
    return (
        <Box sx={{ display: 'flex' }}>
            {/* TopBar */}
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Typography color="inherit" noWrap>{user.name}</Typography>
                    <IconButton color="inherit" onClick={handleOnLogout}>
                        <Logout />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* SideBar */}
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        px: [1],
                    }}
                >
                    <img src={Logo} alt="Logo" width="50" height="50" />
                    <Typography variant="h6" color="inherit" noWrap> O'Task</Typography>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>

                </Toolbar>
                <Divider />
                <List component="nav">
                    <NavOptions />
                </List>
            </Drawer>
            {/* Contenedor de renderizado de Apps */}
            <Box
                component="main"
                sx={{
                    backgroundColor: '#F0F0F0',
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <div className='p-0 sm:p-7'>
                    {children}
                </div>
            </Box>
        </Box>
    )
}

export default Navbar