import { useState, useContext } from 'react';
import { filterMap } from '@constants/filterMap';
import { FilterContext, FILTER_PROTO } from '@contexts/FilterManagerContext';

export const REFETCH_THRESHOLD_RATIO = 5 / 6;
export default function useFilterManager(_criteria) {
  if (!FilterContext) {
    throw new Error('Initialization Error: Filter context not defined.');
  }

  const { filter, setFilter, setSearchTarget, searchTarget, setFilterCnt, filterCnt } = useContext(FilterContext);
  const [criteria] = useState(_criteria);

  function _resetFilter() {
    setFilter(FILTER_PROTO);
    setFilterCnt(0);
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
      setFilterCnt((current) => current + 1);
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
      setFilterCnt((current) => {
        if (current <= 0) {
          return 0;
        } else {
          return current - 1;
        }
      });
    }
  }

  function filterData(datas) {
    const fData = datas?.filter((data) => {
      const { attributes } = data;
      for (let i = 0; i < attributes?.length; i++) {
        const { trait_type, value } = attributes[i];
        const key = filterMap[trait_type]?.indexOf(value);
        if (filter[trait_type][key]) {
          return data;
        }
      }
    });
    return fData;
  }

  //exporters
  const resetFilter = _resetFilter.bind(this);
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
    getCurrentFilterList,
    searchTarget,
    setSearchTarget,
    filterData,
    setFilterCnt,
    filterCnt
  };
}
