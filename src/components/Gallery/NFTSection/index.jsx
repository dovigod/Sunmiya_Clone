import styled from 'styled-components';
import NFT from './NFT';
import Header from './Header';
import useContract, { COUNT_PER_FETCH } from '@hooks/useContract';
import useFilterManager from '@hooks/useFilterManager';
import useSearch from '@hooks/useSearch';
import { isIncluded } from '@utils/string';
import { useEffect, useRef } from 'react';

/**
 * !! note !!
 * ---- Terminology ----
 * nftChunk = nftPaginationChunck
 * tokenId = specific NFT Id
 * FetchIndicator = latest fetched chuck, refer SunmiyaContractContext.jsx for declaration
 */

// Root component, where Fetching occurs
const NFTSection = () => {
  const { fetchIndicator } = useContract();
  const { searchTarget, filterData, filterCnt, filter } = useFilterManager();
  const { searchedDatas } = useSearch(searchTarget);
  const contentRef = useRef();
  //render NFTchunks based on fetchIndicator
  //FetchIndicator points latest fetch NFTChunk id(index = idx)
  return (
    <Container>
      <Header />
      <Content ref={contentRef}>
        {searchedDatas && searchTarget && filter
          ? filterCnt
            ? filterData(searchedDatas).map((item, idx) => {
                const id = Number(item.name.split('#')[1]);
                return <NFT data={item} key={item + id} idx={id} />;
              })
            : searchedDatas.map((item, idx) => {
                const id = Number(item.name.split('#')[1]);
                return <NFT data={item} key={item + id} idx={id} />;
              })
          : new Array(fetchIndicator + 1)
              .fill(0)
              .map((_, idx) => (
                <NFTPaginationChunk
                  key={'NFTPaginationChunk' + idx}
                  chunkId={idx}
                  isLast={idx === fetchIndicator}
                  contentRef={contentRef}
                />
              ))}
      </Content>
    </Container>
  );
};

const NFTPaginationChunk = ({ isLast = false, chunkId, contentRef }) => {
  const { nftDatas, isLoading, isError, setFetchIndicator, fetchIndicator } = useContract(chunkId);
  const { searchTarget, filterData, filterCnt, filter } = useFilterManager();
  // on mount,
  // sets threshold point when to fetch next NFTChunk using intersectionObserver Api
  // currently, threshold is 9th visulized component from rear.
  useEffect(() => {
    // initialize register intersection event when certain condition matches.
    // e.g , latest NFTPaginationChunck, + current fetching should be fulfiled.
    if (isLast && nftDatas && !isLoading && !isError && contentRef?.current) {
      //1. caclulate threshold point, 9th from rear
      const nftCollections = contentRef.current.children;
      const visulalizedNFTCnt = nftCollections.length;
      const thresholdIdx = visulalizedNFTCnt - 9 > 0 ? visulalizedNFTCnt - 9 : 0;

      // when Content doesn't have any nfts, registering intersection event is useless,
      // a) so fetch more nftChunks by increasing fetchIndicator
      // e.g )  when nftChunck 0 is only fetched , and user is trying to search tokenId 999
      // => try retriving datas by increasing fetchIndicator (a.k.a fetch nftChunk )
      // b) register intersection event , when intersected => fetch next nftChunk

      if (nftCollections.length > 0) {
        //b
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                if (fetchIndicator < 31) {
                  setFetchIndicator((current) => current + 1);
                }
              }
            });
          },
          { threshold: 0, rootMargin: '0px' }
        );
        observer.observe(nftCollections[thresholdIdx]);
      } else {
        //a
        if (fetchIndicator < 32) {
          setFetchIndicator((current) => current + 1);
        }
      }
    }
  }, [nftDatas, isLoading, isError, contentRef, isLast, searchTarget]);

  //filter nftChunk
  function filterNFTChunk() {
    let nfts = filterCnt ? filterData(nftDatas) : nftDatas;
    nfts = nfts?.map((item, idx) => {
      // tokenId could be considered as idx of contentRef
      // nft's index (id) ranges =>  (0 ~ 32) + ((0~32) * 33) => 0 ~ 999 (approximatly)
      const id = idx + chunkId * COUNT_PER_FETCH;
      // 'trait_type', 'values'
      // 1. filter by tokenId searching (searchTarget).
      if (searchTarget && !isIncluded(item.name, searchTarget)) {
        return <></>;
      }

      // render
      return <NFT data={item} key={item + idx} idx={id} />;
    });

    return nfts;
  }

  return <>{filterNFTChunk()}</>;
};

export default NFTSection;
const Container = styled.div`
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: start;
  justify-content: start;
  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
