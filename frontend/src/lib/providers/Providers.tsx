import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from '@lib/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" expand={false} richColors closeButton />
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default Providers;
