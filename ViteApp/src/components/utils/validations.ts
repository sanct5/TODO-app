import { toast } from "react-toastify";

export const validateEmailFormat = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
        return toast.warn('El correo electrónico ingresado no es válido');;
    }
    return true;
}