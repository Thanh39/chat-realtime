import './App.css';
import { QueryClient,QueryClientProvider } from 'react-query';
import Router from './routes';

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
     
                <Router />
       </QueryClientProvider>
  );
}

export default App;
