import { useState, useContext, createContext } from 'react';
import { filterMap } from '@constants/filterMap';
export const FilterContext = createContext();

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
  const [filterCnt, setFilterCnt] = useState(0);
  const [searchTarget, setSearchTarget] = useState('');

  return (
    <FilterContext.Provider value={{ filter, setFilter, setSearchTarget, searchTarget, setFilterCnt, filterCnt }}>
      {children}
    </FilterContext.Provider>
  );
};
