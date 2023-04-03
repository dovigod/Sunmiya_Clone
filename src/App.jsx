import './App.css';
import { SunmiyaContractProvider } from '@contexts/SunmiyaContractManager';
import Comp from '@components/Comp';

function App() {
  return (
    <div className="App">
      <SunmiyaContractProvider>
        <Comp />
      </SunmiyaContractProvider>
    </div>
  );
}

export default App;
