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
      ]
  },
  {
    path: '/auth',
    element: <Auth />
  },

]);

export default function MyRouter() {
  return <RouterProvider router={router}/>
}