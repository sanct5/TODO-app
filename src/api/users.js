export const AuthService = {
    baseUrl: import.meta.env.VITE_OTASK_BACKEND_USER,
    endpoints: {
        login: '/login',
        register: '/register',
    },
};