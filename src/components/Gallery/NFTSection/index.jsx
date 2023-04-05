import styled from 'styled-components';
import NFT from './NFT';
import Header from './Header';
const NFTSection = () => {
  const d = {
    src: 'https://planet-miya.sunmiya.club/techa/1743.png?size=512 2x'
  };
  return (
    <Container>
      <Header />
      <Content>
        <NFT data={d} />
        <NFT data={d} />
        <NFT data={d} />
        <NFT data={d} />
        <NFT data={d} />
        <NFT data={d} />
        <NFT data={d} />
        <NFT data={d} />
        <NFT data={d} />
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
