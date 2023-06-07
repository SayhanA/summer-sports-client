import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routers/Router'
import Main from './Layout/Main'

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} >
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </RouterProvider>
  </>,
)
