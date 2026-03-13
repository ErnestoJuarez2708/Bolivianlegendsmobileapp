// src/routes.tsx   (o el nombre que tenga el archivo)
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';   // ← importa Outlet
import { AuthProvider } from './context/AuthContext';             // ← tu contexto

import { MainLayout } from './layouts/MainLayout';
import { Splash } from './pages/Splash';
import { Catalog } from './pages/Catalog';
import { LegendDetail } from './pages/LegendDetail';
import { Comments } from './pages/Comments';
import { Payment } from './pages/Payment';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

export const router = createBrowserRouter([
  // Ruta pública sin layout (pantalla inicial)
  {
    path: "/",
    Component: Splash,
  },

  // Todas las demás rutas envueltas por AuthProvider + MainLayout
  {
    element: (
      <AuthProvider>           {/* ← Colocamos AuthProvider aquí */}
        <MainLayout>           {/* ← Mantiene tu layout con navbar, etc. */}
          <Outlet />           {/* ← Aquí se renderizan las rutas hijas */}
        </MainLayout>
      </AuthProvider>
    ),
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
      },
      // Puedes agregar más rutas hijas aquí en el futuro
    ],
  },

  // Opcional: ruta 404 global
  {
    path: "*",
    element: <div className="min-h-screen flex items-center justify-center text-xl">
      <p>404 - Página no encontrada</p>
    </div>,
  },
]);