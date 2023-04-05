// import { useContext } from 'react';
// import { useContract } from '@contexts/SunmiyaContractContext';

// export async function getNFTs() {
//   const { contract, fetchIndicator, setFetchIndicator } = useContract();

//   const datas = new Array(33).fill(0).map(async (_, idx) => {
//     const dataURI = await contract.tokenURI(idx + fetchIndicator);
//     const nftData = await axios.get(dataURI);
//     return nftData.data;
//   });
//   setFetchIndicator((current) => {
//     if (current <= 966) {
//       return current + 33;
//     }
//   });

//   return Promise.all(datas);
// }
