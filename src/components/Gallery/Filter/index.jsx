import styled from 'styled-components';
import { filterMap } from '@constants/filterMap';
import { RefreshIcon } from '@assets/icons';
import Text from '@components/commons/Typography/Text';
import Criteria from './Criteria';
import useFilterManager from '@hooks/useFilterManager';
const Filter = () => {
  const { resetFilter } = useFilterManager();
  return (
    <Container>
      <Header>
        <Text variant="BBH2" as="span">
          Filter
        </Text>
        <RefreshIcon onClick={() => resetFilter()} size={1.5} />
      </Header>

      {Object.keys(filterMap).map((key, idx) => {
        return <Criteria key={key} criteria={key} />;
      })}
    </Container>
  );
};

export default Filter;
const Header = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--color-white-500);
  padding-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div`
  min-width: 220px;

  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  left: 0px;
  z-index: 3;
  align-self: flex-start;
  height: auto;
  max-height: 600px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 850px) {
    display: none;
  }
  @media screen and (min-width: 1220px) {
    width: 100%;
    max-width: 264px;
  }
`;
