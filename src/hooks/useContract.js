import { useContext } from 'react';
import { useQuery } from 'react-query';
import { SunmiyaContractContext } from '@contexts/SunmiyaContractContext';
import axios from 'axios';

export const COUNT_PER_FETCH = 33;

export default function useContract(chunkId = 0) {
  if (!SunmiyaContractContext) {
    throw new Error('Initialzation Error: Context not found');
  }
  const { contract, fetchIndicator, setFetchIndicator, queryClient } = useContext(SunmiyaContractContext);
  const { data: nftDatas, isLoading, isError, refetch } = useQuery({
    queryKey: ['nftDatas', chunkId],
    queryFn: getNFTDatas,
    onSuccess: () => {
      console.log('fin1', fetchIndicator, nftDatas);
    },
    enabled: true,
    retry: 2,
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true
  });

  async function getNFTDatas() {
    try {
      let nftData = new Array(COUNT_PER_FETCH)
        .fill(false)
        .map((_, idx) => contract.tokenURI(idx + chunkId * COUNT_PER_FETCH));
      nftData = await Promise.all(nftData);
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
