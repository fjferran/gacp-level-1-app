'use client';

import { t } from '@/lib/i18n';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCompletedScreens, markScreenAsCompleted, isScreenLocked, saveFormData, getFormData } from '@/lib/progress';
import DynamicInput from './DynamicInput';
import DriveBuilder from './DriveBuilder';
import QRList from './QRList';
import es from '../../content/es.json';
import { useSession, signIn, signOut } from "next-auth/react";

interface ScreenProps {
    screenId: string;
}

export default function Screen({ screenId }: ScreenProps) {
    const { data: session } = useSession();
    const title = t(`${screenId}_TITLE`);
    const body = t(`${screenId}_BODY`);
    const ctaPrimary = t(`${screenId}_CTA_PRIMARY`);
    const ctaSecondary = t(`${screenId}_CTA_SECONDARY`);
    const helper = t(`${screenId}_HELPER`);
    const bullets = t(`${screenId}_BULLETS`);

    // Modal Content
    const modalTitle = t(`${screenId}_MODAL_TITLE`);
    const modalBody = t(`${screenId}_MODAL_BODY`);

    const [isCompleted, setIsCompleted] = useState(false);
    const [locked, setLocked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showGuideModal, setShowGuideModal] = useState(false);

    // Guide Content
    const guideTitle = t(`${screenId}_GUIDE_TITLE`);
    const guideBody = t(`${screenId}_GUIDE_BODY`);

    // Auto-fill logic for ONB_005
    useEffect(() => {
        if (screenId === 'ONB_005' && session?.user?.email) {
            const currentData = getFormData();
            if (!currentData['ONB_005_FIELD_U1']) {
                saveFormData('ONB_005_FIELD_U1', `${session.user.name || 'Usuario'} (${session.user.email})`);
            }
            // Pre-fill others to avoid blocking
            if (!currentData['ONB_005_FIELD_U2']) saveFormData('ONB_005_FIELD_U2', 'Pendiente de asignar');
            if (!currentData['ONB_005_FIELD_U3']) saveFormData('ONB_005_FIELD_U3', 'Pendiente de asignar');
            if (!currentData['ONB_005_FIELD_U4']) saveFormData('ONB_005_FIELD_U4', 'Pendiente de asignar');
        }
    }, [screenId, session]);

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

    const resetProject = () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo el proyecto? Se borrarán todos los progresos y datos locales.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    // Helper to check if a key was missing (t returns the key itself)
    const exists = (val: string, keySuffix: string) => val !== `${screenId}_${keySuffix}`;
    const hasModal = exists(modalTitle, 'MODAL_TITLE');

    const getNextScreen = (currentId: string) => {
        const flow: Record<string, string> = {
            'LND_001': 'ONB_001',
            'SPR6_020': 'SPR6_030',
            'SPR6_030': 'SPR6_040',
            'SPR6_040': 'SPR6_050',
            'SPR6_050': 'SPR6_060',
            'SPR6_060': 'SPR6_070',
            'SPR6_070': 'SPR6_900',
            'SPR6_900': 'LND_001',
        };
        return flow[currentId] ? `/screen/${flow[currentId]}` : '#';
    };

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
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-gray-900 relative">
            <div className="max-w-2xl w-full space-y-8 text-center">
                <div className="flex justify-between items-center">
                    {screenId === 'LND_001' ? (
                        <button
                            onClick={resetProject}
                            className="text-xs text-red-500 hover:text-red-700 underline"
                        >
                            Reiniciar Proyecto
                        </button>
                    ) : <div></div>}

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

                {/* OAuth Button for ONB_003 */}
                {screenId === 'ONB_003' && (
                    <div className="mt-6">
                        {!session ? (
                            <button
                                onClick={() => signIn('google')}
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <span className="mr-2">G</span> Conectar Google Drive
                            </button>
                        ) : (
                            <div className="flex items-center gap-4 text-sm text-green-600 font-medium mb-4">
                                <span>✓ Conectado como {session.user?.email}</span>
                                <button onClick={() => signOut()} className="text-xs text-gray-500 underline hover:text-gray-700">
                                    Desconectar
                                </button>
                            </div>
                        )}
                    </div>
                )}

                import QRList from './QRList';

                // ... (inside component)
                {/* Drive Builder for SPR1_010 */}
                {screenId === 'SPR1_010' && (
                    <div className="mt-8">
                        <DriveBuilder onComplete={() => {
                            markScreenAsCompleted(screenId, true);
                            setIsCompleted(true);
                        }} />
                    </div>
                )}

                {/* QR List for SPR3_020 */}
                {screenId === 'SPR3_020' && (
                    <QRList />
                )}

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    {exists(ctaPrimary, 'CTA_PRIMARY') && (
                        (screenId === 'SPR1_030' || screenId === 'SPR2_020' || screenId === 'SPR2_030' || screenId === 'SPR2_040' || screenId === 'SPR2_050' || screenId === 'SPR3_030' || screenId === 'SPR4_010' || screenId === 'SPR4_020' || screenId === 'SPR4_030' || screenId === 'SPR5_001' || screenId === 'SPR5_040' || screenId === 'SPR5_050' || screenId === 'SPR6_010' || screenId === 'SPR6_030' || screenId === 'SPR6_050' || screenId === 'SPR6_060' || screenId === 'SPR6_900') ? (
                            <button
                                onClick={() => setShowGuideModal(true)}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {ctaPrimary}
                            </button>
                        ) : (
                            <Link
                                href={getNextScreen(screenId)}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {ctaPrimary}
                            </Link>
                        )
                    )}
                    {exists(ctaSecondary, 'CTA_SECONDARY') && (
                        <button
                            onClick={() => hasModal ? setShowModal(true) : null}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{modalTitle}</h3>
                        <div className="prose prose-indigo text-gray-600 whitespace-pre-line max-h-[70vh] overflow-y-auto">
                            {modalBody}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Guide Modal */}
            {showGuideModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowGuideModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{guideTitle}</h3>
                        <div className="prose prose-indigo text-gray-600 whitespace-pre-line max-h-[70vh] overflow-y-auto">
                            {guideBody}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowGuideModal(false)}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
