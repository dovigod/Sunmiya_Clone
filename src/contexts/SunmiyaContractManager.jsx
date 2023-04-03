import { useContext, createContext } from 'react';
import MiyaContractABI from '@abi/MiyaContractABI.json';
import ethers from 'ethers';
export const SunmiyaContractContext = createContext();

export function SunmiyaContractProvider({ children }) {
  const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, MiyaContractABI);
  return <SunmiyaContractContext.Provider value={}>{children}</SunmiyaContractContext.Provider>;
}
