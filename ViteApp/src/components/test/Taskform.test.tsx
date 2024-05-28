import { test, expect } from "vitest";
import { render, fireEvent, screen } from '@testing-library/react';
import Taskform from '../apps/CreateTask/Taskform';
import { Provider } from 'react-redux';
import store from '../../redux/store';

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
