import Text from '@components/commons/Typography/Text';
import styled from 'styled-components';
import useFilterManager from '@hooks/useFilterManager';
const Selection = ({ text, criteria, value }) => {
  const { addFilterOption, removeFilterOption, getCurrentFilterList, filter } = useFilterManager(criteria);

  const selected = getCurrentFilterList()[value];

  function selectHandler() {
    selected ? removeFilterOption(value) : addFilterOption(value);
  }
  return (
    <Container onClick={selectHandler}>
      <CheckBox selected={selected}>{selected ? <Check /> : null}</CheckBox>
      <Text variant="H4">{text}</Text>
    </Container>
  );
};

export default Selection;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 0px;
  cursor: pointer;
`;
const CheckBox = styled.button`
  border-radius: 4px;
  padding: 0;
  background-color: var(--color-white-300);
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 8px;
  border: 1px solid var(--color-white-400);
  color: yellow;
`;

const Check = styled.div`
  color: yellow;
  width: 100%;
  height: 100%;
  background-color: var(--color-purple-400);

  &:after {
    text-align: center;
    display: block;
    content: '✔';
  }
`;
