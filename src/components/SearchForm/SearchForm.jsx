import React from 'react';
import { useCountryForm } from './useSearchForm';
import './SearchForm.css';
import CountryTable from '../CountryTable/CountryTable';

const SearchForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    currentPage,
    handlePageChange,
    totalPages,
    currentCountries
  } = useCountryForm();

  return (
    <div className="app-container">
      <h1>Country Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='form-group__label'  htmlFor="countryName">Country Name: </label>
          <input type="text" id="countryName" name="countryName" value={formData.countryName} onChange={handleChange} className="form-group__input" />
        </div>
        <div className="form-group">
          <label className='form-group__label' htmlFor="sortOrder">Sort Order: </label>
          <select id="sortOrder" name="sortOrder" value={formData.sortOrder} onChange={handleChange} className="form-group__input">
            <option value="ascend">Ascending</option>
            <option value="descend">Descending</option>
          </select>
        </div>
        <div className="form-group">
          <label className='form-group__label' htmlFor="population">Population (in millions): </label>
          <input type="text" id="population" name="population" value={formData.population} onChange={handleChange} className="form-group__input" />
        </div>
        <button type="submit" className="form-group__button">Submit</button>
      </form>
      <div>
        <h2>Filtered Countries:</h2>
        <CountryTable 
          filteredCountries={currentCountries} 
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default SearchForm;
