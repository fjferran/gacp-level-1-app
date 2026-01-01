'use client';

import { useState } from 'react';
import { t } from '@/lib/i18n';
import es from '../../../content/es.json';
import { SCREEN_ORDER } from '../../../content/screens';
import Link from 'next/link';

export default function ExamplesPage() {
    const [query, setQuery] = useState('');

    // Extract Examples and Alerts
    const examples = Object.keys(es).filter(k => k.startsWith('TPL_EX_') && k.endsWith('_TITLE')).map(k => k.replace('_TITLE', ''));
    const alerts = Object.keys(es).filter(k => k.startsWith('MSG_'));

    // Search logic
    const searchResults = query.length > 2 ? SCREEN_ORDER.filter(id => {
        const title = t(`${id}_TITLE`).toLowerCase();
        const body = t(`${id}_BODY`).toLowerCase();
        const q = query.toLowerCase();
        return title.includes(q) || body.includes(q);
    }) : [];

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto space-y-12">

                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Recursos y Búsqueda</h1>
                    <Link href="/" className="text-sm text-indigo-600 hover:underline">Volver al inicio</Link>
                </div>

                {/* Search Section */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Buscador de pantallas</h2>
                    <input
                        type="text"
                        placeholder="Buscar por título o contenido..."
                        className="w-full p-2 border rounded-md"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query.length > 2 && (
                        <div className="mt-4 space-y-2">
                            {searchResults.length === 0 ? (
                                <p className="text-gray-500 text-sm">No se encontraron resultados.</p>
                            ) : (
                                searchResults.map(id => (
                                    <Link key={id} href={`/screen/${id}`} className="block p-2 hover:bg-gray-50 rounded border border-transparent hover:border-gray-200">
                                        <div className="font-medium text-indigo-600">{t(`${id}_TITLE`)}</div>
                                        <div className="text-xs text-gray-500 truncate">{t(`${id}_BODY`)}</div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </section>

                {/* Examples Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Plantillas y Ejemplos</h2>
                    <div className="grid gap-4">
                        {examples.map(id => (
                            <div key={id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="font-semibold text-lg text-gray-900">{t(`${id}_TITLE`)}</h3>
                                <p className="mt-2 text-gray-600">{t(`${id}_BODY`)}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Alerts Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Alertas del Sistema</h2>
                    <div className="space-y-4">
                        {alerts.map(key => (
                            <div key={key} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex gap-3">
                                <span className="text-yellow-600 font-bold">⚠</span>
                                <p className="text-yellow-800">{t(key)}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
