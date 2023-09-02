import { filterCountriesByName, filterCountriesByPopulation, sortCountriesByName } from '../helpers';

describe('Country utility functions', () => {
  const mockCountries = [
    { name: { common: 'United States' }, population: 331883986 },
    { name: { common: 'India' }, population: 1393409038 },
    { name: { common: 'China' }, population: 1444216107 },
    { name: { common: 'Brazil' }, population: 213993437 },
  ];

  describe('filterCountriesByName function', () => {
    it('should filter countries based on a substring, case insensitive, and sort based on match index', () => {  
      const result = filterCountriesByName('in', mockCountries);
      const expectedResult = [
        { name: { common: 'India' }, population: 1393409038 },
        { name: { common: 'China' }, population: 1444216107 }
      ];
  
      expect(result).toEqual(expectedResult);
    });
  });

  describe('filterCountriesByPopulation', () => {
    it('should filter countries by population limit', () => {
      const result = filterCountriesByPopulation('1000', mockCountries);
      expect(result).toEqual([
        { name: { common: 'United States' }, population: 331883986 },
        { name: { common: 'Brazil' }, population: 213993437 },
      ]);
    });

    it('should return an empty array if no countries meet the population criteria', () => {
      const result = filterCountriesByPopulation('50', mockCountries);
      expect(result).toEqual([]);
    });
  });

  describe('sortCountriesByName', () => {
    it('should sort countries by name in ascending order', () => {
      const result = sortCountriesByName('ascend', [...mockCountries]);
      expect(result).toEqual([
        { name: { common: 'Brazil' }, population: 213993437 },
        { name: { common: 'China' }, population: 1444216107 },
        { name: { common: 'India' }, population: 1393409038 },
        { name: { common: 'United States' }, population: 331883986 },
      ]);
    });

    it('should sort countries by name in descending order', () => {
      const result = sortCountriesByName('descend', [...mockCountries]);
      expect(result).toEqual([
        { name: { common: 'United States' }, population: 331883986 },
        { name: { common: 'India' }, population: 1393409038 },
        { name: { common: 'China' }, population: 1444216107 },
        { name: { common: 'Brazil' }, population: 213993437 },
      ]);
    });

    it('should return the original array if the order is not specified', () => {
      const result = sortCountriesByName('', [...mockCountries]);
      expect(result).toEqual(mockCountries);
    });
  });
});
