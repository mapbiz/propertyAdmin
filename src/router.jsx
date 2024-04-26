import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import App from "./App.jsx";
import Auth from "./Auth.jsx";
import Layout from "./components/Layout.jsx";
import PdfPages from "./Pages/PdfPages.jsx";
import ArendatorsList from "./components/ArendatorsList.jsx";
import Sale from "./Pages/Sale.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: '/pdf',
        element: <PdfPages />
      },
      {
        path: '/arendators',
        element: <ArendatorsList />
      },
      {
        path: '/sale',
        element: <Sale />
      },
      {
        path: '/rent',
        element: <Sale />
      },
      ]
  },
  {
    path: '/auth',
    element: <Auth />
  },

], {basename: import.meta.env.VITE_APP_BASE });

export default function MyRouter() {
  return <RouterProvider router={router}/>
}