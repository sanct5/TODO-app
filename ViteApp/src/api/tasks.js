export const ManageTaskService = {
    baseUrl: import.meta.env.VITE_OTASK_BACKEND_TASKS,
    endpoints: {
        createTask: '/addTask',
        getAllByUser: '/getTasks',
        getTaskById: '/getTaskById',
    },
};