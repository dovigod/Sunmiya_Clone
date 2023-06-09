import { useContext } from 'react';
import { useQuery } from 'react-query';
import { SunmiyaContractContext } from '@contexts/SunmiyaContractContext';
import axios from 'axios';
const INDEX_LIST = new Array(1000).fill(0).map((_, idx) => idx.toString());

/**
 * interface of search flow, should be used inside component wrapped with FilterManagerContext(in general) & SunmiyaContractContext
 * @param {string} [search] - keyword to search for NFTs which matches
 */
export default function useSearch(search = null) {
  if (!SunmiyaContractContext) {
    throw new Error('Initialzation Error: Context not found');
  }
  const { contract, fetchIndicator, setFetchIndicator, queryClient } = useContext(SunmiyaContractContext);
  const { data: searchedDatas, isLoading, isError, refetch } = useQuery({
    queryKey: search && ['nftDatas_searched', search],
    queryFn: searchNFTDatas,
    onSuccess: () => {
      console.log('fin searching', search);
    },
    enabled: true,
    retry: 2,
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true
  });
  /**
   * returns tokenId collection which matches search condition
   * @returns [string] - collection of tokenId which matches search condition
   */
  function _getSearchTargets() {
    return search ? INDEX_LIST.filter((idx) => idx.includes(search)) : [];
  }

  /**
   * fetch NFTData which id matches search condition
   * @returns Promise< Array<FTData>>
   */
  async function searchNFTDatas() {
    try {
      let nftData = _getSearchTargets();
      nftData = nftData.map((idx) => contract.tokenURI(idx));
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

  return { contract, searchedDatas, isLoading, isError, refetch, fetchIndicator, setFetchIndicator, queryClient };
}
