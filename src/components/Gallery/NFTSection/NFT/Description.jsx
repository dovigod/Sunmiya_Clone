import styled from 'styled-components';
import Text from '@components/commons/Typography/Text';
//ebh5 , 4
const Description = ({ rank, name }) => {
  return (
    <Container>
      <Text variant="EBH3" className="line-height-1.4" color="var(--color-white-900)">
        Rank {rank}
      </Text>
      <Text variant="EBH2" className="line-height-1.4">
        {name}
      </Text>
    </Container>
  );
};
export default Description;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-contents: space-between;
  padding: 10px 16px;
`;
