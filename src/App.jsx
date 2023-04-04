import './App.css';
import { SunmiyaContractProvider } from '@contexts/SunmiyaContractManager';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Comp from '@components/Comp';

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <SunmiyaContractProvider>
          <Comp />
        </SunmiyaContractProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
