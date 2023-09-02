import { useState } from 'react';
import axios from 'axios';

export const useCountryForm = () => {
  const [formData, setFormData] = useState({
    countryName: '',
    population: '',
    capital: '',
    currency: ''
  });

  // New state to store the countries data
  const [countries, setCountries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const fetchData = async (filterKey, filterValue) => {
    try {
      let url;
      if (filterKey && filterValue) {
        url = `https://restcountries.com/v3/name/${filterValue}`;
      } else {
        url = `https://restcountries.com/v3/all`;
      }

      const response = await axios.get(url);

      // Update the countries state with the retrieved data
      setCountries(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filledFields = Object.keys(formData).filter((key) => formData[key]);

    if (filledFields.length > 0) {
      const firstFilledField = filledFields[0];
      fetchData(firstFilledField, formData[firstFilledField]);
    } else {
      fetchData();
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    countries // Returning the countries data
  };
};
