import { useState, useContext, createContext } from 'react';
import MiyaContractABI from '@abi/MiyaContractABI.json';
import { getProvider } from '@utils/web3/provider';
import { ethers } from 'ethers';

export const SunmiyaContractContext = createContext();

/**
 * contract provider
 *
 * @param {React.Component} children - child component
 * @param {QueryClient} queryclient - queryClient to access queryCahce if needed (currently not used)
 */
export function SunmiyaContractProvider({ children, queryClient }) {
  const [contract] = useState(
    new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, MiyaContractABI, getProvider())
  );
  // tracks latest fetched NFTChunk
  const [fetchIndicator, setFetchIndicator] = useState(0);
  return (
    <SunmiyaContractContext.Provider value={{ contract, fetchIndicator, setFetchIndicator, queryClient }}>
      {children}
    </SunmiyaContractContext.Provider>
  );
}
