import { useContract, useInitialQuery } from '@contexts/SunmiyaContractManager';

const Comp = () => {
  const { getNFTData } = useContract();
  const { data, isLoading } = useInitialQuery();
  getNFTData(0);

  console.log(data);
  return <></>;
};
export default Comp;
