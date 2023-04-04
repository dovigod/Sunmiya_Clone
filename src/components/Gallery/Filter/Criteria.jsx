import { useState } from 'react';
import styled from 'styled-components';
import Text from '@components/commons/Typography/Text';
import { filterMap } from '@/constants/filterMap';
import { ChevoronDownIcon } from '@assets/icons/ChevoronDownIcon';
import SelectionArea from './SelectionArea';

const Criteria = ({ criteria }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Container>
      <Toggler onClick={() => setOpen((current) => !current)}>
        <Text variant="BH3" as="span">
          {criteria}
        </Text>
        <ChevoronDownIcon rotate={isOpen} />
      </Toggler>
      <SelectionArea isOpen={isOpen} criteria={criteria} />
    </Container>
  );
};

export default Criteria;
const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--color-white-900);
`;

const Toggler = styled.button`
  border: none;
  padding: 2rem 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  width: 100%;
  cursor: pointer;
`;
