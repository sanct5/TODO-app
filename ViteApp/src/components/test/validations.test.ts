import { describe, it, expect } from 'vitest';
import { validateTask } from '../utils/validations';
import { validateEmailFormat } from '../utils/validations';

describe('validateEmailFormat', () => {
  it('debe retornar true para un correo electrónico válido', () => {
    const email = 'test@example.com';
    expect(validateEmailFormat(email)).toBe(true);
  });

  it('debe retornar false para un correo electrónico sin @', () => {
    const email = 'testexample.com';
    expect(validateEmailFormat(email)).toBe(false);
  });

  it('debe retornar false para un correo electrónico sin dominio', () => {
    const email = 'test@';
    expect(validateEmailFormat(email)).toBe(false);
  });

  it('debe retornar false para un correo electrónico sin nombre de usuario', () => {
    const email = '@example.com';
    expect(validateEmailFormat(email)).toBe(false);
  });
});

describe('validateTask', () => {
  it('debe retornar false si el título está vacío', () => {
    const task = {
      title: '',
      description: 'Descripción de prueba',
      startDate: '01/01/2024',
      endDate: '01/02/2024',
      steps: [{ title: 'Paso 1', status: false }]
    };
    expect(validateTask(task)).toBe(false);
  });

  it('debe retornar false si la descripción está vacía', () => {
    const task = {
      title: 'Título de prueba',
      description: '',
      startDate: '01/01/2024',
      endDate: '01/02/2024',
      steps: [{ title: 'Paso 1', status: false }]
    };
    expect(validateTask(task)).toBe(false);
  });

  it('debe retornar false si las fechas no están en el formato correcto', () => {
    const task = {
      title: 'Título de prueba',
      description: 'Descripción de prueba',
      startDate: '2024-01-01',
      endDate: '01/02/2024',
      steps: [{ title: 'Paso 1', status: false }]
    };
    expect(validateTask(task)).toBe(false);
  });

  it('debe retornar false si la fecha de inicio es mayor que la fecha de finalización', () => {
    const task = {
      title: 'Título de prueba',
      description: 'Descripción de prueba',
      startDate: '01/03/2024',
      endDate: '01/02/2024',
      steps: [{ title: 'Paso 1', status: false }]
    };
    expect(validateTask(task)).toBe(false);
  });

  it('debe retornar false si alguna subtarea no tiene título', () => {
    const task = {
      title: 'Título de prueba',
      description: 'Descripción de prueba',
      startDate: '01/01/2024',
      endDate: '01/02/2024',
      steps: [{ title: '', status: false }]
    };
    expect(validateTask(task)).toBe(false);
  });

  it('debe retornar true si todos los campos son válidos', () => {
    const task = {
      title: 'Título de prueba',
      description: 'Descripción de prueba',
      startDate: '01/01/2024',
      endDate: '01/02/2024',
      steps: [{ title: 'Paso 1', status: false }]
    };
    expect(validateTask(task)).toBe(true);
  });

  it('debe retornar false si las fechas están vacías', () => {
    const task = {
      title: 'Título de prueba',
      description: 'Descripción de prueba',
      startDate: '',
      endDate: '',
      steps: [{ title: 'Paso 1', status: false }]
    };
    expect(validateTask(task)).toBe(false);
  });

  it('debe retornar false si no hay subtareas', () => {
    const task = {
      title: 'Título de prueba',
      description: 'Descripción de prueba',
      startDate: '01/01/2024',
      endDate: '01/02/2024',
      steps: []
    };
    expect(validateTask(task)).toBe(false);
  });
});


