'use client';

import { t } from '@/lib/i18n';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCompletedScreens, markScreenAsCompleted, isScreenLocked } from '@/lib/progress';
import DynamicInput from './DynamicInput';
import es from '../../content/es.json';

interface ScreenProps {
    screenId: string;
}

export default function Screen({ screenId }: ScreenProps) {
    const title = t(`${screenId}_TITLE`);
    const body = t(`${screenId}_BODY`);
    const ctaPrimary = t(`${screenId}_CTA_PRIMARY`);
    const ctaSecondary = t(`${screenId}_CTA_SECONDARY`);
    const helper = t(`${screenId}_HELPER`);
    const bullets = t(`${screenId}_BULLETS`);

    const [isCompleted, setIsCompleted] = useState(false);
    const [locked, setLocked] = useState(false);

    // Find fields for this screen
    const fields = Object.keys(es).filter(key => key.startsWith(`${screenId}_FIELD_`) && key.endsWith('_LABEL')).map(key => {
        const fieldBase = key.replace('_LABEL', '');
        return {
            key: fieldBase,
            label: t(key),
            placeholder: t(`${fieldBase}_PLACEHOLDER`),
            required: true // Default to required for now
        };
    });

    useEffect(() => {
        const checkStatus = () => {
            const completed = getCompletedScreens();
            setIsCompleted(!!completed[screenId]);
            setLocked(isScreenLocked(screenId));
        };
        checkStatus();
        // Listen for updates
        window.addEventListener('progress-update', checkStatus);
        return () => window.removeEventListener('progress-update', checkStatus);
    }, [screenId]);

    const toggleComplete = () => {
        const newState = !isCompleted;
        markScreenAsCompleted(screenId, newState);
        setIsCompleted(newState);
        // Dispatch custom event for other components
        window.dispatchEvent(new Event('progress-update'));
    };

    // Helper to check if a key was missing (t returns the key itself)
    const exists = (val: string, keySuffix: string) => val !== `${screenId}_${keySuffix}`;

    if (locked) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-gray-900">
                <div className="max-w-2xl w-full text-center">
                    <h1 className="text-2xl font-bold text-gray-400">Bloqueado</h1>
                    <p className="mt-4 text-gray-500">Completa las pantallas anteriores del sprint para desbloquear esta validación.</p>
                    <Link href="/" className="mt-6 inline-block text-indigo-600 hover:underline">Volver al inicio</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-gray-900">
            <div className="max-w-2xl w-full space-y-8 text-center">
                <div className="flex justify-end">
                    <button
                        onClick={toggleComplete}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${isCompleted
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                            }`}
                    >
                        {isCompleted ? '✓ Completado' : 'Marcar como hecho'}
                    </button>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {title}
                </h1>

                <p className="mt-6 text-lg leading-8 text-gray-600 whitespace-pre-line">
                    {body}
                </p>

                {exists(bullets, 'BULLETS') && (
                    <div className="text-left bg-white p-6 rounded-lg shadow-sm border border-gray-200 mx-auto max-w-lg mt-6">
                        <ul className="space-y-2 text-gray-700">
                            {bullets.split('\n').map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Dynamic Inputs */}
                {fields.length > 0 && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 mx-auto max-w-lg">
                        {fields.map(field => (
                            <DynamicInput
                                key={field.key}
                                fieldKey={field.key}
                                label={field.label}
                                placeholder={field.placeholder}
                                required={field.required}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    {exists(ctaPrimary, 'CTA_PRIMARY') && (
                        <Link
                            href={screenId === 'LND_001' ? '/screen/ONB_001' : '#'}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {ctaPrimary}
                        </Link>
                    )}
                    {exists(ctaSecondary, 'CTA_SECONDARY') && (
                        <button className="text-sm font-semibold leading-6 text-gray-900">
                            {ctaSecondary} <span aria-hidden="true">→</span>
                        </button>
                    )}
                </div>

                {exists(helper, 'HELPER') && (
                    <p className="mt-4 text-sm text-gray-500">
                        {helper}
                    </p>
                )}
            </div>
        </main>
    );
}
