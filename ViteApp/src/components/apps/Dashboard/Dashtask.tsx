import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { UserState } from '../../../redux/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { setUser } from '../../../redux/users/userSlice';
import { getWithExpiry } from '../../utils/localStorage';
import { useDispatch } from 'react-redux';
import { deleteLocalStorage } from '../../utils/localStorage';

const Dashtask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: { user: UserState }) => state.user);

    //Este useEffect se debe poner en la navbar (Cuando esté implementada) la cual estará visible en todas las páginas
    //Si el usuario no está logueado y no marcó la casilla de "recuerdame", se redirige al login
    useEffect(() => {
        const loggedUser = getWithExpiry('user');
        if (loggedUser) {
            dispatch(setUser(loggedUser));
        }

        if (!user.isLogin && !loggedUser) {
            toast.error('Por favor inicia sesión nuevamente');
            navigate('/login');
        } else {
            toast.success(`Bienvenido ${user.name}`);
        }
    }, []);

    return (
        <div className='bg-gradient-to-r from-purple-800 to-pink-500 flex items-center justify-center h-screen'>
            <div className="flex flex-col items-center">
                <h1 className="text-9xl font-bold text-white">Usuario {user.name}</h1>
                <h2 className="text-4xl font-bold text-white mt-10">Se inició sesión, aquí se presentará el Dashboard</h2>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteLocalStorage('user')}
                >
                    Eliminar recuerdame
                </Button>
            </div>
        </div>
    )
}

export default Dashtask