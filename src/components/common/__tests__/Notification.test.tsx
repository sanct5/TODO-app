import { render } from '@testing-library/react';
import Notification from '../Notification';

test('renders Notification component', () => {
    // Renderiza el componente
    render(<Notification />);
    
    // Verifica que el ToastContainer esté presente en el DOM
    const toastContainer = document.querySelector('.Toastify__toast-container');
    expect(toastContainer).toBeDefined();
});
