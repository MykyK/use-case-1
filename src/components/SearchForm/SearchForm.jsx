import React from 'react';
import { useCountryForm } from './helpers'; // Make sure the path is correct
import './SearchForm.css'; // Import the CSS file

const SearchForm = () => {
  const { formData, handleChange, handleSubmit, countries } = useCountryForm();

  return (
    <div className="app-container">
      <h1>Country Information Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="countryName" className="form-group__label">Country Name: </label>
          <input
            type="text"
            id="countryName"
            name="countryName"
            value={formData.countryName}
            onChange={handleChange}
            className="form-group__input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="population" className="form-group__label">Population: </label>
          <input
            type="text"
            id="population"
            name="population"
            value={formData.population}
            onChange={handleChange}
            className="form-group__input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="capital" className="form-group__label">Capital: </label>
          <input
            type="text"
            id="capital"
            name="capital"
            value={formData.capital}
            onChange={handleChange}
            className="form-group__input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency" className="form-group__label">Currency: </label>
          <input
            type="text"
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="form-group__input"
          />
        </div>
        <button type="submit" className="form-group__button">Submit</button>
      </form>
      {/* Display the fetched countries data */}
      <div>
        <h2>Fetched Countries:</h2>
        <pre>{JSON.stringify(countries, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SearchForm;
