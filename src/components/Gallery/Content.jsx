import styled from 'styled-components';
const Content = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 500vh;
`;