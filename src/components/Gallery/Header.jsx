import styled from 'styled-components';
import Text from '@components/commons/Typography/Text';

const Header = () => {
  return (
    <Container>
      <Title variant="EBH1">TECHA MIYA</Title>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled(Text)`
  font-stretch: normal;
`;
