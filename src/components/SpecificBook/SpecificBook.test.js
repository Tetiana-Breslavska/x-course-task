import React from 'react';
import { render, screen, userEvent } from '@testing-library/react';
import '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpecificBook from "./SpecificBook";

describe('SpecificBook Component', () => {
    beforeEach(() => {
        const countInput = screen.getByTestId('countInput');
        userEvent.clear(countInput); 
        userEvent.type(countInput, '2'); 
    });

    test('should increase count on button click', () => {
        render(<SpecificBook />);
        const increaseCount = screen.getByTestId('increaseCount');
        const countInput = screen.getByTestId('countInput');
        userEvent.click(increaseCount);
        expect(countInput).toHaveValue('3');
    });

    test('should decrease count on button click', () => {
        render(<SpecificBook />);
        const decreaseCount = screen.getByTestId('decreaseCount');
        const countInput = screen.getByTestId('countInput');
        userEvent.click(decreaseCount);
        expect(countInput).toHaveValue('1');
    });
    
    // test('count should change the total price', () => {
    //     render(<SpecificBook />);
    //     const decreaseCount = screen.getByTestId('decreaseCount');
    //     const totalPrice = screen.getByTestId('totalPrice');
    //     userEvent.click(decreaseCount);
    //     expect(totalPrice).toHaveValue('0');
    // });
})


