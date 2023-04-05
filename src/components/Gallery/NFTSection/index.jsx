import styled from 'styled-components';
import NFT from './NFT';
import Header from './Header';
import useContract, { COUNT_PER_FETCH } from '@hooks/useContract';
import { useEffect, useRef, useState } from 'react';

const REFETCH_THRESHOLD_RATIO = 5 / 6;

const NFTPaginationChunk = ({ isLast = false, chuckId }) => {
  const { nftDatas, isLoading, isError, setFetchIndicator } = useContract(chuckId);
  const thresholdRef = useRef(null);
  useEffect(() => {
    if (isLast && nftDatas && !isLoading && !isError && thresholdRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              setFetchIndicator((current) => current + 1);
            }
          });
        },
        { threshold: 0, rootMargin: '0px' }
      );
      observer.observe(thresholdRef.current);
    }
  }, [nftDatas, isLoading, isError, thresholdRef, isLast]);

  return (
    <>
      {nftDatas?.map((item, idx) => {
        const id = idx + chuckId * COUNT_PER_FETCH;
        if (idx === Math.floor(nftDatas.length * REFETCH_THRESHOLD_RATIO) && isLast) {
          return <NFT data={item} key={item + idx} idx={id} ref={thresholdRef} />;
        } else {
          return <NFT data={item} key={item + idx} idx={id} />;
        }
      })}
    </>
  );
};
const NFTSection = () => {
  const { fetchIndicator } = useContract();

  // useEffect(() => {
  //   // if (newData) {
  //   // setDataCollection(() => {
  //   //   return [...Object.values(queryClient.queryCache.queriesMap).map(async (data) => await data.promise)] || [];
  //   // });
  //   // }
  // }, [nftDatas, fetchIndicator]);
  // useEffect(() => {
  //   if (nftDatas && !isLoading && !isError && thresholdRef) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             observer.unobserve(entry.target);
  //             setFetchIndicator((current) => current + 1);
  //           }
  //         });
  //       },
  //       { threshold: 0, rootMargin: '0px' }
  //     );
  //     observer.observe(thresholdRef.current);
  //   }
  // }, [nftDatas, isLoading, isError, thresholdRef]);

  return (
    <Container>
      <Header />
      <Content>
        {/* {nftDatas?.map((item, idx) => {
          if (idx === Math.floor(nftDatas.length * REFETCH_THRESHOLD_RATIO)) {
            return <NFT data={item} key={item + idx} idx={idx} ref={thresholdRef} />;
          } else {
            return <NFT data={item} key={item + idx} idx={idx} />;
          }
        })} */}
        {new Array(fetchIndicator + 1).fill(0).map((_, idx) => (
          <NFTPaginationChunk key={'nftChunk' + idx} chuckId={idx} isLast={idx === fetchIndicator} />
        ))}
      </Content>
    </Container>
  );
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
