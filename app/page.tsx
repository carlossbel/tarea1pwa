'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EntryCard from '@/components/EntryCard';
import NewEntryForm from '@/components/NewEntryForm';
import NotificationButton from '@/components/NotificationButton';
import { getEntries, DiaryEntry } from '../lib/db';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mostrar splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      loadEntries();
    }
  }, [showSplash]);

  const loadEntries = async () => {
    try {
      const data = await getEntries();
      setEntries(data);
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewEntry = () => {
    loadEntries();
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="mb-8 animate-bounce">
            <svg className="w-32 h-32 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Mi Diario</h1>
          <p className="text-white text-lg opacity-90">Tus momentos, tus recuerdos</p>
          <div className="mt-8">
            <div className="w-16 h-1 bg-white mx-auto rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Mi Diario</h1>
          </div>
          <NotificationButton />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Formulario para nueva entrada */}
        <NewEntryForm onEntryAdded={handleNewEntry} />

        {/* Lista de entradas */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Entradas</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando entradas...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="text-gray-600 text-lg">No hay entradas todavía</p>
              <p className="text-gray-500 mt-2">¡Crea tu primera entrada arriba!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onDelete={loadEntries} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}