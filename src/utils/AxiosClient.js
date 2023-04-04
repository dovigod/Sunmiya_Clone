import axios from 'axios';

const AxiosClient = axios.create();
AxiosClient.defaults.baseURL = 'https://planet-miya.sunmiya.club/techa/';

AxiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Cache-Control': 'no-cache'
};

AxiosClient.interceptors.response.use(function (response) {
  if (response.status !== 200) {
    //for debuging purpose
    console.log(response);
  }
  return response;
});

// All request will wait 5 seconds before timeout
AxiosClient.defaults.timeout = 5000;

AxiosClient.getNFTData = (tokenId) => {
  console.log(tokenId);
  return AxiosClient.get(`${tokenId}.json`);
};

export default AxiosClient;
