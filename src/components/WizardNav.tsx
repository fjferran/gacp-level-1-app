'use client';

import Link from 'next/link';
import { SCREEN_ORDER } from '../../content/screens';
import { useRouter } from 'next/navigation';

interface WizardNavProps {
    currentScreenId: string;
}

export default function WizardNav({ currentScreenId }: WizardNavProps) {
    const currentIndex = SCREEN_ORDER.indexOf(currentScreenId);
    const prevScreen = currentIndex > 0 ? SCREEN_ORDER[currentIndex - 1] : null;
    const nextScreen = currentIndex < SCREEN_ORDER.length - 1 ? SCREEN_ORDER[currentIndex + 1] : null;

    if (currentIndex === -1) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center max-w-2xl mx-auto w-full">
            <div>
                {prevScreen ? (
                    <Link
                        href={`/screen/${prevScreen}`}
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
                    >
                        ← Anterior
                    </Link>
                ) : (
                    <span className="text-sm font-semibold leading-6 text-gray-300 cursor-not-allowed">
                        ← Anterior
                    </span>
                )}
            </div>

            <div className="text-xs text-gray-400">
                {currentIndex + 1} / {SCREEN_ORDER.length}
            </div>

            <div>
                {nextScreen ? (
                    <Link
                        href={`/screen/${nextScreen}`}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Siguiente →
                    </Link>
                ) : (
                    <span className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-white cursor-not-allowed">
                        Siguiente →
                    </span>
                )}
            </div>
        </div>
    );
}
