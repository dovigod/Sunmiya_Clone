import './App.css';
import './styles/root.scss';
import { SunmiyaContractProvider } from '@contexts/SunmiyaContractContext';
import { FilterContextProvider } from '@contexts/FilterManager';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Gallery from '@pages/Gallery';
const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <SunmiyaContractProvider queryClient={queryClient}>
          <FilterContextProvider>
            <Gallery />
          </FilterContextProvider>
        </SunmiyaContractProvider>
      </QueryClientProvider>
    </div>
  );
}
export default App;
