import { ethers } from 'ethers';

export function getProvider() {
  const provider = new ethers.providers.JsonRpcProvider('https://klaytn-api.fingerlabs.io');
  if (!provider) {
    throw new Error('Initialzation Error: Error while initializing provider');
  }
  return provider;
}
