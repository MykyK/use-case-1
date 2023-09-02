import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CountryTable from '../CountryTable';

describe('<CountryTable />', () => {
  const mockHandlePageChange = jest.fn();
  const filteredCountries = [
    {
      name: { common: 'United States' },
      population: 331883986,
      capital: 'Washington D.C.',
      region: 'Americas',
    },
    {
      name: { common: 'India' },
      population: 1393409038,
      capital: 'New Delhi',
      region: 'Asia',
    },
  ];

  it('should render countries correctly', () => {
    render(
      <CountryTable
        filteredCountries={filteredCountries}
        currentPage={1}
        handlePageChange={mockHandlePageChange}
        totalPages={5}
      />
    );

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
    expect(screen.getByText('331883986')).toBeInTheDocument();
    expect(screen.getByText('1393409038')).toBeInTheDocument();
  });

  it('should go to the next page', () => {
    render(
      <CountryTable
        filteredCountries={filteredCountries}
        currentPage={1}
        handlePageChange={mockHandlePageChange}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText('→'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(2);
  });

  it('should go to the previous page', () => {
    render(
      <CountryTable
        filteredCountries={filteredCountries}
        currentPage={2}
        handlePageChange={mockHandlePageChange}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText('←'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(1);
  });

  it('should disable the previous button on the first page', () => {
    render(
      <CountryTable
        filteredCountries={filteredCountries}
        currentPage={1}
        handlePageChange={mockHandlePageChange}
        totalPages={5}
      />
    );

    expect(screen.getByText('←')).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    render(
      <CountryTable
        filteredCountries={filteredCountries}
        currentPage={5}
        handlePageChange={mockHandlePageChange}
        totalPages={5}
      />
    );

    expect(screen.getByText('→')).toBeDisabled();
  });

  it('should display the correct current page and total pages', () => {
    render(
      <CountryTable
        filteredCountries={filteredCountries}
        currentPage={2}
        handlePageChange={mockHandlePageChange}
        totalPages={5}
      />
    );

    expect(screen.getByText('2/5')).toBeInTheDocument();
  });
});
