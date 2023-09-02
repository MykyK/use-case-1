import { useState, useEffect } from 'react';
import axios from 'axios';
import { filterCountriesByName, filterCountriesByPopulation, sortCountriesByName } from './helpers';

export const useCountryForm = () => {
  const [formData, setFormData] = useState({
    countryName: '',
    population: '',
    sortOrder: 'ascend',
    capital: '',
    currency: ''
  });
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [limit, setLimit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3/all');
        let limitedCountries = response.data;
  
        if (limit !== null) {
          limitedCountries = limitedCountries.slice(0, limit);
        }
  
        setCountries(limitedCountries);
        setFilteredCountries(limitedCountries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [limit]);

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
    let filtered = [...countries];
  
    if (formData.countryName) {
      filtered = filterCountriesByName(formData.countryName, filtered);
    }
    if (formData.population) {
      filtered = filterCountriesByPopulation(formData.population, filtered);
    }

    filtered = sortCountriesByName(formData.sortOrder, filtered);
  
    setFilteredCountries(filtered);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    countries,
    filteredCountries,
    setLimit
  };
};
