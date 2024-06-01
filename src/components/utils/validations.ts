import { toast } from "react-toastify";

export const validateEmailFormat = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
        toast.warn('El correo electrónico ingresado no es válido');
        return false;
    }
    return true;
}

export const validateTask = (task: any) => {
    const formatPattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!task.title.trim()) {
        toast.error('El título es requerido');
        return false;
    }

    if (!task.description.trim()) {
        toast.error('La descripción es requerida');
        return false;
    }

    if (!task.startDate.trim() || !task.endDate.trim()) {
        toast.error('Las fechas son requeridas');
        return false;
    }

    if (!formatPattern.test(task.startDate) || !formatPattern.test(task.endDate)) {
        toast.error('Las fechas deben tener el formato mm/dd/yyyy');
        return false;
    }

    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);

    if (startDate > endDate) {
        toast.error('La fecha de inicio no puede ser mayor que la fecha de finalización');
        return false;
    }

    if (task.steps.some((step: any) => !step.title.trim())) {
        toast.error('Todos las subtareas deben tener un nombre');
        return false;
    }

    if (task.steps.length === 0) {
        toast.error('La tarea debe tener al menos una subtarea');
        return false;
    }

    return true;
};