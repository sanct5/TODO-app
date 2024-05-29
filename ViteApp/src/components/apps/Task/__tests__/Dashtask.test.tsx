// Dashtask.test.tsx
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashtask from '../Dashtask';
import { test, expect } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../../../redux/store';
import { vi } from 'vitest';
import axios from 'axios';
import '@testing-library/jest-dom';


vi.mock('axios');

const tasks = [
    {
        _id: 1,
        title: 'tarea 1 pruebaFix1',
        description: 'tarea 1',
        endDate: '2022-01-01',
        startDate: '2022-01-01',
        steps: [
            {
                title: 'step1',
                status: false
            }
        ]
    },
    {
        _id: 2,
        title: 'tarea 1 pruebaFix2',
        description: 'tarea 1',
        endDate: '2022-01-01',
        startDate: '2022-01-01',
        steps: [
            {
                title: 'step1',
                status: false
            }
        ]
    },
    {
        _id: 3,
        title: 'tarea 1 pruebaFix3',
        description: 'tarea 1',
        endDate: '2022-01-01',
        startDate: '2022-01-01',
        steps: [
            {
                title: 'step1',
                status: false
            }
        ]
    }
];

describe('Dashtask', () => {

    beforeEach(() => {
        axios.get = vi.fn().mockResolvedValue({ data: { message: { message: tasks } } });
    });

    test('after login render dashboard', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashtask />
                </BrowserRouter>
            </Provider>
        );
    });

    test('renders tasks correctly after loading', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/tasks']}>
                    <Dashtask />
                </MemoryRouter>
            </Provider>
        );
        await waitFor(() => {
            const sortButton = screen.getByText(/Ordenar por expiración/i);
            const createButton = screen.getByText(/Crear tarea/i);
            expect(sortButton).toBeDefined();
            expect(createButton).toBeDefined();
        });
    });

    test('order ascending', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Dashtask />
                </BrowserRouter>
            </Provider>
        );
        await waitFor(() => {
            fireEvent.click(screen.getByText(/Ordenar por expiración/i));
        });
    });
});