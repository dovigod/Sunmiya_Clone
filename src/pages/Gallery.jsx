import styled from 'styled-components';
import Header from '@components/Gallery/Header';
import Filter from '@components/Gallery/Filter';
import NFTSection from '@components/Gallery/NFTSection';

const Gallery = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Filter />
        <NFTSection />
      </Content>
    </Container>
  );
};
export default Gallery;

const Container = styled.div`
  min-height: 500vh;
  overflow-x: none;
  width: 100vw;
  padding: 10px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  max-width: 122rem;
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  gap: 3rem;
`;
