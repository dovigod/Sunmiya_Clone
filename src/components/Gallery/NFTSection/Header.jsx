import styled from 'styled-components';
import useDebounce from '@hooks/useDebounce';
import { useEffect, useState } from 'react';
import useFilterManager from '@hooks/useFilterManager';
const Header = () => {
  const [userInput, setUserInput] = useState('');
  const tokenId = useDebounce(userInput, 200);
  const { setSearchTarget } = useFilterManager();
  function searchByTokenId(event) {
    setUserInput(event.target.value);
  }
  useEffect(() => {
    setSearchTarget(tokenId);
  }, [tokenId]);
  return (
    <Container>
      <Search placeholder="Number" onChange={searchByTokenId} />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 2rem;
`;

const Search = styled.input.attrs({
  className: 'bh4 line-height-1.4'
})`
  border: 1px solid var(--color-white-900);
  border-radius: 12px;
  width: 210px;
  height: 40px;
  border: 1px solid var(--color-white-900);
  border-radius: 8px;
  background-color: transparent;
  padding-left: 16px;
  color: var(--color-white-500);
  letter-spacing: -0.4px;
  caret-color: var(--color-purple-400);
  transition: all 0.25s ease 0s;
  &:focus {
    border: 1px solid var(--color-purple-400);
  }
`;
