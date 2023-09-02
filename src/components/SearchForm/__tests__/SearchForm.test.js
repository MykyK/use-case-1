import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm';
import { useSearchForm } from '../useSearchForm';

jest.mock('../useSearchForm', () => ({
  useSearchForm: jest.fn()
}));

describe('SearchForm', () => {
  beforeEach(() => {
    useSearchForm.mockReturnValue({
      formData: { countryName: '', sortOrder: 'ascend', population: '' },
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      currentPage: 1,
      handlePageChange: jest.fn(),
      totalPages: 10,
      currentCountries: []
    });
  });

  it('renders form fields', () => {
    render(<SearchForm />);
    expect(screen.getByLabelText('Country Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort Order:')).toBeInTheDocument();
    expect(screen.getByLabelText('Population (in millions):')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders a country table', () => {
    render(<SearchForm />);
    expect(screen.getByText('Filtered Countries:')).toBeInTheDocument();
  });

  it('handles form input', () => {
    const handleChange = jest.fn();
    useSearchForm.mockReturnValue({
      ...useSearchForm(),
      handleChange
    });
    
    render(<SearchForm />);
    fireEvent.change(screen.getByLabelText('Country Name:'), { target: { value: 'India' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles form submit', async () => {
    const handleSubmit = jest.fn();
    useSearchForm.mockReturnValue({
      ...useSearchForm(),
      handleSubmit
    });
    
    render(<SearchForm />);
    const form = screen.getByTestId('form');
  
    fireEvent.submit(form);
  
    expect(handleSubmit).toHaveBeenCalled();
  });
});
