import { render, screen } from '@testing-library/react';
import Search from '../search.js';
import renderer from 'react-test-renderer';
import optionsList from '../search.js';


it('should render same text passed into button', () => {
    render(<Search />);
    const buttonElement = screen.getByRole("button", {name: 'Search'});
    expect(buttonElement).toBeInTheDocument();
});

it('should render all option properties', () => {
    const optionElement = renderer.create(<Search/>).toJSON();
    expect(optionElement).toMatchSnapshot();
});
    
