import styled from 'styled-components';
import Image from './Image';
import Description from './Description';
import { forwardRef } from 'react';
const NFT = forwardRef(({ data, idx }, ref) => {
  const { image, name } = data;
  return (
    <Container ref={ref}>
      <Image srcset={image + ' 269w'} src={image} radius="8px 8px 0px 0px" />
      <Description name={name} rank={idx} />
    </Container>
  );
});
export default NFT;

const Container = styled.div`
  width: 100%;
  min-width: 224px;
  max-width: 269px;
  min-height: 300px;
  box-sizing: border-box;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: var(--color-black-700);
  &:hover {
    border: 2px solid var(--color-purple-400);
    padding: 2px;
  }
`;
