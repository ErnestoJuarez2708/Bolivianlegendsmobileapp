import React from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 max-w-2xl mx-auto shadow-xl ring-1 ring-black/5">
      <Header />
      <main className="flex-1 flex flex-col relative bg-stone-100 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
