export const filterCountriesByName = (name, countries) => {
  const searchString = name.toLowerCase();
  const filtered = countries
    .filter(country => {
      const commonName = country.name?.common?.toLowerCase() || '';
      return commonName.includes(searchString);
    })
    .map(country => {
      const commonName = country.name?.common?.toLowerCase() || '';
      return {
        ...country,
        matchIndex: commonName.indexOf(searchString),
      };
    })
    .sort((a, b) => a.matchIndex - b.matchIndex);

  return filtered.map(country => {
    const { matchIndex, ...rest } = country;
    return rest;
  });
};

export const filterCountriesByPopulation = (limit, countries) => {
  const populationLimit = parseInt(limit, 10) * 1000000;
  return countries.filter(country => country.population < populationLimit);
};