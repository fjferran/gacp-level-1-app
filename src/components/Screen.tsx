import { t } from '@/lib/i18n';
import Link from 'next/link';

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

    // Helper to check if a key was missing (t returns the key itself)
    const exists = (val: string, keySuffix: string) => val !== `${screenId}_${keySuffix}`;

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-gray-900">
            <div className="max-w-2xl w-full space-y-8 text-center">
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

                <div className="mt-10 flex items-center justify-center gap-x-6">
                    {exists(ctaPrimary, 'CTA_PRIMARY') && (
                        <Link
                            href={screenId === 'LND_001' ? '/onboarding/1' : '#'}
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
