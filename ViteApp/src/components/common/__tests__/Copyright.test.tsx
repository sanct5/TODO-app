import { render, screen } from '@testing-library/react';
import { Copyright } from '../Copyright';

test('renders copyright text with current year', () => {
    // Renderiza el componente
    render(<Copyright />);

    // Obtiene el elemento de texto
    const copyrightElement = screen.getByText(`Copyright © OurTask ${new Date().getFullYear()}`);

    // Verifica que el elemento esté presente en el DOM
    expect(copyrightElement).toBeDefined();
});
