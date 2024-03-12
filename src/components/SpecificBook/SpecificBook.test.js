import React from 'react';
// import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import SpecificBook from './SpecificBook';

jest.mock('../Navbar/Navbar', () => {
    return () => <div>Mocked Navbar</div>;
});

jest.mock('../../context/use-books', () => ({
    useBooks: jest.fn(() => ({
        books: [
            {
                id: 1,
                title: 'Sample Book',
                author: 'Sample Author',
                level: 'Intermediate',
                tags: ['tag1', 'tag2'],
                price: 10,
                image: 'sample_image.png',
                description: 'Sample description',
            },
        ],
        addedBooks: [],
        setAddedBooks: jest.fn(),
    })),
}));


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        bookId: '1', 
    }),
}));

describe('SpecificBook Component', () => {
    test('should increase count on button click', () => {
        render(<SpecificBook />);
        const increaseButton = screen.getByTestId('increaseCount');
        const countInput = screen.getByTestId('countInput');
        const totalPrice = screen.getByTestId('totalPrice');
        fireEvent.click(increaseButton);
        expect(countInput).toHaveValue('1'); 
        expect(totalPrice).toHaveTextContent('10.00$'); 
    });

    test('should decrease count on button click', () => {
        render(<SpecificBook />);
        const decreaseButton = screen.getByTestId('decreaseCount');
        const countInput = screen.getByTestId('countInput');
        const totalPrice = screen.getByTestId('totalPrice');
        fireEvent.click(decreaseButton);
        expect(countInput).toHaveValue('0'); 
        expect(totalPrice).toHaveTextContent('0.00$'); 
    });

    test('should update total price on count input change', () => {
        render(<SpecificBook />);
        const countInput = screen.getByTestId('countInput');
        const totalPrice = screen.getByTestId('totalPrice');
        fireEvent.change(countInput, { target: { value: '2' } });
        // userEvent.type(countInput, '2');
        expect(totalPrice).toHaveTextContent('20.00$');    
    });
});