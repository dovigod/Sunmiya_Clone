import { useState, useContext, createContext } from 'react';
import MiyaContractABI from '@abi/MiyaContractABI.json';
import { getProvider } from '@utils/web3/provider';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ethers } from 'ethers';

export const SunmiyaContractContext = createContext();

/**
 * contract provider
 */
export function SunmiyaContractProvider({ children }) {
  const [contract] = useState(
    new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, MiyaContractABI, getProvider())
  );
  const [fetchIndicator, setFetchIndicator] = useState(0);

  return (
    <SunmiyaContractContext.Provider value={{ contract, fetchIndicator, setFetchIndicator }}>
      {children}
    </SunmiyaContractContext.Provider>
  );
}

export function useContract() {
  if (!SunmiyaContractContext) {
    throw new Error('Initialzation Error: Context not found');
  }
  const { contract, fetchIndicator, setFetchIndicator } = useContext(SunmiyaContractContext);

  async function getNFTData(tokenId) {
    try {
      const dataURI = await contract.tokenURI(tokenId);
      const nftData = await axios.get(dataURI, {
        params: {
          size: 512
        }
      });
      return nftData.data;
    } catch (error) {
      console.log(error);
    }
  }

  return { contract, getNFTData, fetchIndicator, setFetchIndicator };
}

export function useInitialQuery() {
  if (!SunmiyaContractContext) {
    throw new Error('Initialzation Error: Context not found');
  }
  const { contract } = useContext(SunmiyaContractContext);
  const { data, isLoading } = useQuery('NFTs', async () => {
    const data = new Array(40).fill(0).map(async (_, idx) => {
      const dataURI = await contract.tokenURI(idx);
      const nftData = await axios.get(dataURI);
      return nftData.data;
    });
    return await Promise.all(data);
  });

  return { data, isLoading };
}
