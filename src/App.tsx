import './App.css';
import { QueryClient,QueryClientProvider } from 'react-query';
import Router from './common/routes';
import NotistackProvider from './common/hook-form/NotistackProvider';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <NotistackProvider>
                <Router />
                </NotistackProvider>
       </QueryClientProvider>
  );
}

export default App;
