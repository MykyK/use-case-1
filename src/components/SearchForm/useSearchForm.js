import { useState, useEffect } from 'react';
import axios from 'axios';
import { filterCountriesByName } from './helpers';

export const useCountryForm = () => {
  const [formData, setFormData] = useState({
    countryName: '',
    population: '',
    capital: '',
    currency: ''
  });
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = filterCountriesByName(formData.countryName, countries);
    setFilteredCountries(filtered);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    countries,
    filteredCountries  // Expose filteredCountries
  };
};
