import React from 'react';
import { createBrowserRouter } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { Splash } from './pages/Splash';
import { Catalog } from './pages/Catalog';
import { LegendDetail } from './pages/LegendDetail';
import { Comments } from './pages/Comments';
import { Payment } from './pages/Payment';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "catalog",
        Component: Catalog,
      },
      {
        path: "legend/:id",
        Component: LegendDetail,
      },
      {
        path: "legend/:id/comments",
        Component: Comments,
      },
      {
        path: "payment",
        Component: Payment,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      }
    ],
  },
]);
