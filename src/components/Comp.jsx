import { useContract } from '@contexts/SunmiyaContractManager';

const Comp = () => {
  const { contract } = useContract();
  console.log(contract);
  return <></>;
};
export default Comp;
