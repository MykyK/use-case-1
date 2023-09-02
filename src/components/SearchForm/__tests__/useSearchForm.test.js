import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import { useSearchForm } from '../useSearchForm'; 

jest.mock('axios');

const TestComponent = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    currentPage,
    handlePageChange,
    countries
  } = useSearchForm();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="countryName"
          type="text"
          name="countryName"
          value={formData.countryName}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button data-testid="changePage" onClick={() => handlePageChange(currentPage + 1)}>
        Change Page
      </button>
      <div data-testid="currentPage">{currentPage}</div>
      <div data-testid="countries">{countries.length}</div>
    </div>
  );
};

describe('useSearchForm custom hook', () => {
  it('should handle form change', async () => {
    render(<TestComponent />);
    const input = screen.getByTestId('countryName');
    fireEvent.change(input, { target: { value: 'India' } });
    expect(input.value).toBe('India');
  });

  it('should fetch countries on mount', async () => {
    axios.get.mockResolvedValue({ data: [{}, {}] });
    render(<TestComponent />);
    const countriesDiv = await screen.findByTestId('countries');
    expect(countriesDiv.textContent).toBe('0');
  });

  it('should handle page change', () => {
    render(<TestComponent />);
    const changePageButton = screen.getByTestId('changePage');
    const currentPageDiv = screen.getByTestId('currentPage');
    expect(currentPageDiv.textContent).toBe('1');
      fireEvent.click(changePageButton);
    expect(currentPageDiv.textContent).toBe('2');
  });
});
