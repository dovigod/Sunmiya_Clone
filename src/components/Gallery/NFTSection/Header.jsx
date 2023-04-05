import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Search placeholder="Number" />
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
