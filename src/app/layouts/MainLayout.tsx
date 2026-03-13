import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';  // ← corrige el import si es necesario (usa react-router-dom)
import { Header } from '../components/Header';

interface MainLayoutProps {
  children: ReactNode;  // ← esto es lo que faltaba
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 max-w-2xl mx-auto shadow-xl ring-1 ring-black/5">
      <Header />
      <main className="flex-1 flex flex-col relative bg-stone-100 overflow-x-hidden">
        {children}          {/* ← usamos children en vez de <Outlet /> directamente */}
      </main>
    </div>
  );
}