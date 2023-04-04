import styled from 'styled-components';
import Header from '@components/Gallery/Header';
import Content from '@components/Gallery/Content';
import Filter from '@components/Gallery/Filter';

const Gallery = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Filter />
      </Content>
    </Container>
  );
};
export default Gallery;

const Container = styled.div`
  background-color: var(--color-purple-800);
  min-height: 500vh;
  overflow-x: none;
  width: 100vw;
  padding: 10px 10px 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
`;
