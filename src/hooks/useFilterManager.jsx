import { useState, useContext } from 'react';
import { filterMap } from '@constants/filterMap';
import { FilterContext, FILTER_PROTO } from '@contexts/FilterManagerContext';

export const REFETCH_THRESHOLD = 9;

/**
 * @typedef {Object} NFTData
 * @property {string} trait_type
 * @property {[string]} values
 */

/**
 * interface of FilterManagerContext, mainly to handle filtering flows
 * @param { string }  _criteria - Should be one of Key of filterMap('@constants/filterMap')
 */
export default function useFilterManager(_criteria) {
  if (!FilterContext) {
    throw new Error('Initialization Error: Filter context not defined.');
  }

  const { filter, setFilter, setSearchTarget, searchTarget, setFilterCnt, filterCnt } = useContext(FilterContext);
  const [criteria] = useState(_criteria);

  /**
   * resets currently selected filter as FILTER_PROTO
   * @returns void
   */
  function _resetFilter() {
    setFilter(FILTER_PROTO);
    setFilterCnt(0);
  }

  /**
   *
   * @param {*} criteria - Should be one of Key of filterMap('@constants/filterMap')
   * @param {number} value - index of filterMap[criteria] which will be considered as added to filter
   */
  function _addFilterOption(criteria, value) {
    if (!criteria) {
      throw new Error('Validation Error: criteria not selected.');
    } else {
      // consider true as value added to filter,
      setFilter((current) => {
        const newFilterObj = { ...current };
        newFilterObj[criteria][value] = true;
        return newFilterObj;
      });
      setFilterCnt((current) => current + 1);
    }
  }
  /**
   *
   * @param {*} criteria - Should be one of Key of filterMap('@constants/filterMap')
   * @param {number} value - index of filterMap[criteria] which will be considered as removed from filter
   */
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
  /**
   * @param {[NFTData]} datas - NFTData collection
   * @returns [NFTData] - filtered NFTData Collection
   */
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
