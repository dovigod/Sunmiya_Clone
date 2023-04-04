import styled from 'styled-components';
import { filterMap } from '@/constants/filterMap';
import Selection from './Selection';

const SelectionArea = ({ isOpen, criteria }) => {
  return (
    <Container isOpen={isOpen}>
      {filterMap[criteria].map((value, idx) => (
        <Selection key={criteria + value} text={value} criteria={criteria} value={idx} />
      ))}
    </Container>
  );
};

export default SelectionArea;

const Container = styled.div`
  transition: all 0.2s ease;
  max-height: ${({ isOpen }) => (isOpen ? '100vh' : 0)};
  height: fit-content;
  width: 100%;
  overflow: hidden;
`;
