import { setUser, addUser } from "./userSlice";
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { validateEmailFormat } from "../../components/utils/validations";
import { AuthService } from '../../api/users';
import { saveWithExpiry } from "../../components/utils/localStorage";

// POST
//LoginUser es un thunk que se encarga de realizar la petición POST al backend para iniciar sesión
export const LoginUser = (data: any) => {
    return async (dispatch: any, getState: any) => {
        const email = (data.get('email') as string).trim().toLowerCase();
        const password = (data.get('password') as string).trim();

        //Validaciones de los campos del formulario
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

        //Petición POST al backend
        try {
            const response = await axios.post(`${AuthService.baseUrl}${AuthService.endpoints.login}`, {
                user: email,
                password: password,
            });

            const name = response.data.userName;

            dispatch(setUser({ name: name, email: email, isLogin: true }));
            const { stayLogged } = getState().user;

            if (stayLogged) {
                saveWithExpiry('user', { name: name, email: email, isLogin: true }, 30);
            }

            toast.success(`Bienvenid@ ${name}`);
        } catch (error) {
            const res = (error as AxiosError).response?.status;
            if (res === 401) {
                toast.error('Contraseña o correo electrónico incorrecto');
            } else if (res === 404) {
                toast.info('No se encontró el recurso solicitado');
            } else {
                toast.warn('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
            }
        }
    };
};

export const RegisterUser = (data: any) => {
    //TODO: Implementar la lógica para registrar un nuevo usuario
}

// GET