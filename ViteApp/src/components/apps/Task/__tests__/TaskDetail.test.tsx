import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TaskDetail from '../TaskDetail';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import axios from 'axios';
import { vi } from 'vitest';
import { toast } from 'react-toastify';

vi.mock('axios');

vi.mock('react-toastify', () => ({
    toast: {
        error: vi.fn(),
        warn: vi.fn(),
        success: vi.fn(),
    },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TaskDetail', () => {
    const taskData = {
        message: {
            title: 'Test Task',
            startDate: '2022-01-01',
            endDate: '2022-01-02',
            description: 'This is a test task',
            steps: [
                { title: 'Step 1', status: false, _id: '1' },
                { title: 'Step 2', status: true, _id: '2' }
            ]
        }
    };

    beforeEach(() => {
        axios.get = vi.fn().mockResolvedValue({ data: { message: { message: taskData } } });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('renders correctly after loading', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks']}>
                    <TaskDetail />
                </MemoryRouter>
            </Provider>
        );
        await waitFor(() => {
            const button = screen.getByRole('buttonBack');
            expect(button).toBeDefined();
            expect('').toBeDefined();
        });
    });

    test('handles server error (500) correctly', async () => {
        mockedAxios.get.mockRejectedValue({
            response: { status: 500 }
        });
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error interno del servidor, inténtalo de nuevo más tarde');
        });
    });

    test('handles missing task correctly', async () => {
        mockedAxios.get.mockResolvedValue({ data: null });
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        await waitFor(() => {
            expect(toast.warn).toHaveBeenCalledWith('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
        });
    });

    test('click on back', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <TaskDetail />
                </BrowserRouter>
            </Provider>
        );
        await waitFor(() => {
            fireEvent.click(screen.getByRole('buttonBack'));
        });
    });

    test('handles task step status update correctly', async () => {
        mockedAxios.post.mockResolvedValue({ status: 200 });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const checkboxes = await screen.findAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Estado de la tarea actualizado');
        });
    });

    test('handles task step status update error correctly', async () => {
        mockedAxios.post.mockResolvedValue({ status: 405 });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const checkboxes = await screen.findAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error al actualizar el estado de la tarea');
        });
    });

    test('handles task step status update error 500 correctly', async () => {
        mockedAxios.post.mockRejectedValue({ response: { status: 500 } });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const checkboxes = await screen.findAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error interno del servidor, inténtalo de nuevo más tarde');
        });
    });

    test('handles non-500 error correctly', async () => {
        mockedAxios.post.mockRejectedValue({ response: { status: 400 } });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const checkboxes = await screen.findAllByRole('checkbox');
        fireEvent.click(checkboxes[0]);

        await waitFor(() => {
            expect(toast.warn).toHaveBeenCalledWith('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
        });
    });

    test('handles delete task correctly', async () => {
        mockedAxios.delete.mockResolvedValue({ status: 200 });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const deleteButton = await screen.findByLabelText('Eliminar');
        fireEvent.click(deleteButton);

        fireEvent.click(screen.getByText('Eliminar'));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Tarea eliminada');
        });
    });

    test('handles delete task error correctly', async () => {
        mockedAxios.delete.mockResolvedValue({ status: 400 });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const deleteButton = await screen.findByLabelText('Eliminar');
        fireEvent.click(deleteButton);

        fireEvent.click(screen.getByText('Eliminar'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error al eliminar la tarea');
        });
    });

    test('handles delete task error 500 correctly', async () => {
        mockedAxios.delete.mockRejectedValue({ response: { status: 500 } });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const deleteButton = await screen.findByLabelText('Eliminar');
        fireEvent.click(deleteButton);

        fireEvent.click(screen.getByText('Eliminar'));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error interno del servidor, inténtalo de nuevo más tarde');
        });
    });

    test('handles delete task non-error 500 correctly', async () => {
        mockedAxios.delete.mockRejectedValue({ status: 500 });
        mockedAxios.get.mockResolvedValue({ data: { message: taskData } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks/1']}>
                    <Routes>
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const deleteButton = await screen.findByLabelText('Eliminar');
        fireEvent.click(deleteButton);

        fireEvent.click(screen.getByText('Eliminar'));

        await waitFor(() => {
            expect(toast.warn).toHaveBeenCalledWith('Algo salió mal, no eres tu, somos nosotros, inténtalo de nuevo más tarde');
        });
    });
});