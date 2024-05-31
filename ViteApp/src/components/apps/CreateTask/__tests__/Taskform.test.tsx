import { test, expect } from "vitest";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Taskform from '../Taskform';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

vi.mock('axios');

const historyBackSpy = vi.spyOn(window.history, 'back');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Taskform', () => {

  vi.mock('react-toastify', () => ({
    toast: {
      error: vi.fn(),
      success: vi.fn(),
    },
  }));

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('handles form submission correctly', async () => {
    // Configura el mock de axios.post para resolver una promesa
    mockedAxios.post.mockResolvedValue({ status: 200 });

    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );

    // Rellena los campos del formulario
    fireEvent.change(screen.getByLabelText(/Titulo/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Fecha de inicio/i), { target: { value: '01/01/2022' } });
    fireEvent.change(screen.getByLabelText(/Fecha de finalización/i), { target: { value: '01/02/2022' } });

    // Simula el clic en el botón "Agregar subtarea"
    fireEvent.click(screen.getByText('Agregar subtarea'));

    // Espera a que el campo de texto de la subtarea esté en el documento
    await waitFor(() => screen.getByLabelText(/Subtarea/i));

    // Rellena el campo de texto de la subtarea
    fireEvent.change(screen.getByLabelText(/Subtarea/i), { target: { value: 'Test Step' } });

    // Simula el envío del formulario
    fireEvent.click(screen.getByText('Guardar'));

    // Espera a que se muestre el toast de éxito
    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Tarea creada con éxito'));

    // Verifica que se haya llamado a window.history.back
    expect(historyBackSpy).toHaveBeenCalled();
  });

  test('handles form submission error correctly', async () => {
    // Configura el mock de axios.post para resolver una promesa
    mockedAxios.post.mockRejectedValue({ status: 500 });

    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );

    // Rellena los campos del formulario
    fireEvent.change(screen.getByLabelText(/Titulo/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Fecha de inicio/i), { target: { value: '01/01/2022' } });
    fireEvent.change(screen.getByLabelText(/Fecha de finalización/i), { target: { value: '01/02/2022' } });

    // Simula el clic en el botón "Agregar subtarea"
    fireEvent.click(screen.getByText('Agregar subtarea'));

    // Espera a que el campo de texto de la subtarea esté en el documento
    await waitFor(() => screen.getByLabelText(/Subtarea/i));

    // Rellena el campo de texto de la subtarea
    fireEvent.change(screen.getByLabelText(/Subtarea/i), { target: { value: 'Test Step' } });

    // Simula el envío del formulario
    fireEvent.click(screen.getByText('Guardar'));

    // Espera a que se muestre el toast de éxito
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('La solicitud no fue exitosa, verifica los campos e inténtalo más tarde'));
  });

  test('renders Taskform and checks initial state', () => {
    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );

    // Verifica que los campos iniciales estén vacíos
    expect(screen.getByLabelText(/Titulo/i)).toHaveValue('');
    expect(screen.getByLabelText(/Descripción/i)).toHaveValue('');
    expect(screen.getByLabelText(/Fecha de inicio/i)).toHaveValue('');
    expect(screen.getByLabelText(/Fecha de finalización/i)).toHaveValue('');
  });

  test('allows entering a task', async () => {
    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );

    // Simula la entrada de datos en los campos del formulario
    fireEvent.change(screen.getByLabelText(/Titulo/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Fecha de inicio/i), { target: { value: '01/01/2022' } });
    fireEvent.change(screen.getByLabelText(/Fecha de finalización/i), { target: { value: '01/02/2022' } });

    // Verifica que los campos del formulario se hayan actualizado
    expect(screen.getByLabelText(/Titulo/i)).toHaveValue('Test Title');
    expect(screen.getByLabelText(/Descripción/i)).toHaveValue('Test Description');
    expect(screen.getByLabelText(/Fecha de inicio/i)).toHaveValue('01/01/2022');
    expect(screen.getByLabelText(/Fecha de finalización/i)).toHaveValue('01/02/2022');
  });

  test('allows adding and removing a step', async () => {
    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );

    // Simula la adición de una subtarea
    fireEvent.click(screen.getByText(/Agregar subtarea/i));

    // Verifica que se haya agregado un campo de subtarea
    expect(screen.getByLabelText(/Subtarea/i)).toBeInTheDocument();

    // Simula la eliminación de una subtarea
    fireEvent.click(screen.getByText(/Eliminar/i));

    // Verifica que se haya eliminado el campo de subtarea
    expect(screen.queryByLabelText(/Subtarea/i)).not.toBeInTheDocument();
  });

  test('allows submitting a task', async () => {
    render(
      <Provider store={store}>
        <Taskform />
      </Provider>
    );

    // Simula la entrada de datos en los campos del formulario
    fireEvent.change(screen.getByLabelText(/Titulo/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Fecha de inicio/i), { target: { value: '01/01/2022' } });
    fireEvent.change(screen.getByLabelText(/Fecha de finalización/i), { target: { value: '01/02/2022' } });

    // Simula la adición de una subtarea
    fireEvent.click(screen.getByText(/Agregar subtarea/i));
    fireEvent.change(screen.getByLabelText(/Subtarea/i), { target: { value: 'Test Step' } });

    // Simula el envío del formulario
    fireEvent.click(screen.getByText(/Guardar/i));

  });
});