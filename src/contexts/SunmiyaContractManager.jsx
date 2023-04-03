import { useState, useContext, createContext } from 'react';
import MiyaContractABI from '@abi/MiyaContractABI.json';
import { getProvider } from '@utils/web3/provider';
import { ethers } from 'ethers';

export const SunmiyaContractContext = createContext();

export function SunmiyaContractProvider({ children }) {
  const [contract] = useState(
    new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, MiyaContractABI, getProvider())
  );

  return <SunmiyaContractContext.Provider value={{ contract }}>{children}</SunmiyaContractContext.Provider>;
}

export function useContract() {
  if (!SunmiyaContractContext) {
    throw new Error('Initialzation Error: Context not found');
  }
  const { contract } = useContext(SunmiyaContractContext);

  return { contract };
}
