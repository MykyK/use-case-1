import React from 'react';
import './CountryTable.css';

const CountryTable = ({ filteredCountries, currentPage, handlePageChange, totalPages }) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="country-table-container">
      <table className="country-table">
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Population</th>
            <th>Capital</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((country, index) => (
            <tr key={index}>
              <td>{country.name?.common}</td>
              <td>{country.population}</td>
              <td>{country.capital}</td>
              <td>{country.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage <= 1}>←</button>
        <span>{`${currentPage}/${totalPages}`}</span>
        <button onClick={goToNextPage} disabled={currentPage >= totalPages}>→</button>
      </div>
    </div>
  );
};

export default CountryTable;
