import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routers/Router'
import Main from './Layout/Main'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} >
      <Main />
    </RouterProvider>
  </>,
)
