import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ActionAreaCard from '../CardTask';
import { getProgress } from '../CardTask';

describe('ActionAreaCard', () => {
    const ActionAreaCardProps = {
        id: 1,
        title: 'Title',
        description: 'Description',
        endDate: '2024-05-30',
        steps: [
            { title: 'Step 1', status: true },
            { title: 'Step 2', status: false },
            { title: 'Step 3', status: true }
        ]
    };

    test('renders card with correct title and end date', () => {
        render(
            <Router>
                <ActionAreaCard {...ActionAreaCardProps} />
            </Router>
        );
        expect(screen.getByText('Title')).toBeDefined();
        expect(screen.getByText('2024-05-30')).toBeDefined();
    });

    test('calculates progress correctly when steps contain both completed and incomplete tasks', () => {
        const steps = [
            { title: 'Task 1', status: true },
            { title: 'Task 2', status: false },
            { title: 'Task 3', status: true },
            { title: 'Task 4', status: true },
            { title: 'Task 5', status: false },
        ];
        // Calculate expected progress manually based on the given steps
        const expectedProgress = (3 / steps.length) * 100;
        const progress = getProgress(steps);
        expect(progress).toBe(expectedProgress);
    });

    test('returns 0 when steps is null', () => {
        const progress = getProgress([]);
        expect(progress).toBe(0);
    });

});
