import { Toast } from 'components/toast/Toast/Toast';
import Routes from './routes/Routes';
import { useToast } from 'components/toast/useToast';

function App() {
  useToast();

  return <Routes />;
}

export default App;
