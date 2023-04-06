import { useContext } from 'react';
import { useQuery } from 'react-query';
import { SunmiyaContractContext } from '@contexts/SunmiyaContractContext';
import axios from 'axios';

export const COUNT_PER_FETCH = 33;

/**
 * interface for SunmiyaContract Context, mainly to handle Progressive fetching flow
 * !(note)! - component which uses this hook must be wrapped with SunmiyaContractContext
 * @param {number} [chunkId] - unique identifier of specific chunck to fetch SunmiyaContractContext
 */
export default function useContract(chunkId = 0) {
  if (!SunmiyaContractContext) {
    throw new Error('Initialzation Error: Context not found');
  }
  const { contract, fetchIndicator, setFetchIndicator, queryClient } = useContext(SunmiyaContractContext);
  const { data: nftDatas, isLoading, isError, refetch } = useQuery({
    queryKey: ['nftDatas', chunkId],
    queryFn: getNFTDatas,
    onSuccess: () => {
      console.log('fin1', fetchIndicator);
    },
    enabled: true,
    retry: 2,
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true
  });

  /**
   * fetch NFT chunk (NFT * 33)
   * @returns Promise<NFTData>
   */
  async function getNFTDatas() {
    try {
      //1. call tokenURI with appropriate id(idx + chunkId * COUNT_PER_FETCH)
      let nftData = new Array(COUNT_PER_FETCH)
        .fill(false)
        .map((_, idx) => contract.tokenURI(idx + chunkId * COUNT_PER_FETCH));
      nftData = await Promise.all(nftData);

      //2. fetch to URI which was returned by step 1.
      nftData = await Promise.all(
        nftData.map(async (dataURI) => {
          const data = await axios.get(dataURI, {
            params: {
              size: 512
            }
          });
          return data.data;
        })
      );
      return nftData;
    } catch (error) {
      throw error;
    }
  }
  /**
   * get specific NFT data (not for general purpose)
   * currently not used.
   * @param {number} tokenId - 0 ~ 999
   */
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

  return { contract, nftDatas, isLoading, isError, refetch, fetchIndicator, setFetchIndicator, queryClient };
}
