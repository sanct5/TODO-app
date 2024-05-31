import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TaskDetail from '../TaskDetail';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store';
import axios from 'axios';
import { vi } from 'vitest';
import { renderSteps } from '../TaskDetail';
import { toast } from 'react-toastify';


// Mock de axios
vi.mock('axios');

vi.mock('react-toastify', () => ({
    toast: {
        error: vi.fn(),
        warn: vi.fn(),
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

    test('renders null when task is null', () => {
        const task = null;
        const result = renderSteps(task);
        expect(result).toBeNull();
    });

    test('renders list items for each step in task', () => {
        const { container } = render(renderSteps(taskData));
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(screen.getByText('Step 1')).toBeDefined();
        expect(screen.getByText('Step 2')).toBeDefined();
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
});