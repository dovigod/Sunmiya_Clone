import { useState, useContext, createContext } from 'react';
import { filterMap } from '@constants/filterMap';
const FilterContext = createContext();

export const FILTER_PROTO = {
  Background: new Array(filterMap['Background'].length).fill(false),
  Wing: new Array(filterMap['Wing'].length).fill(false),
  Hand: new Array(filterMap['Hand'].length).fill(false),
  Gloves: new Array(filterMap['Gloves'].length).fill(false),
  Weapon: new Array(filterMap['Weapon'].length).fill(false),
  Body: new Array(filterMap['Body'].length).fill(false),
  Dress: new Array(filterMap['Dress'].length).fill(false),
  Face: new Array(filterMap['Face'].length).fill(false),
  Eyes: new Array(filterMap['Eyes'].length).fill(false),
  Hair: new Array(filterMap['Hair'].length).fill(false),
  Mask: new Array(filterMap['Mask'].length).fill(false),
  Earring: new Array(filterMap['Earring'].length).fill(false),
  Head: new Array(filterMap['Head'].length).fill(false)
};
export const FilterContextProvider = ({ children }) => {
  const [filter, setFilter] = useState(FILTER_PROTO);

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
};

export const useFilterManager = (_criteria) => {
  if (!FilterContext) {
    throw new Error('Initialization Error: Filter context not defined.');
  }

  const { filter, setFilter } = useContext(FilterContext);
  const [criteria] = useState(_criteria);

  function _resetFilter(criteria) {
    if (!criteria) {
      setFilter(FILTER_PROTO);
    } else {
      setFilter((current) => {
        current[criteria] = new Array(filterMap[criteria].length).fill(false);
        return current;
      });
    }
  }
  function _addFilterOption(criteria, value) {
    if (!criteria) {
      throw new Error('Validation Error: criteria not selected.');
    } else {
      setFilter((current) => {
        const newFilterObj = { ...current };
        newFilterObj[criteria][value] = true;
        return newFilterObj;
      });
    }
  }
  function _removeFilterOption(criteria, value) {
    if (!criteria) {
      throw new Error('Validation Error: criteria not selected.');
    } else {
      setFilter((current) => {
        const newFilterObj = { ...current };
        newFilterObj[criteria][value] = false;
        return newFilterObj;
      });
    }
  }

  //exporters
  const resetFilter = _resetFilter.bind(this, criteria);
  const addFilterOption = _addFilterOption.bind(this, criteria);
  const removeFilterOption = _removeFilterOption.bind(this, criteria);
  function getCurrentFilterList() {
    return filter[criteria];
  }
  return {
    filter,
    resetFilter,
    addFilterOption,
    removeFilterOption,
    getCurrentFilterList
  };
};
