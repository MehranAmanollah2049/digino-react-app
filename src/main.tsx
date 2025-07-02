import { createRoot } from 'react-dom/client'

import './assets/css/main.css'
import 'nprogress/nprogress.css';

import { RouterProvider } from 'react-router'
import router from './router/router.ts'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
