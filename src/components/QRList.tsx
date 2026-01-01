'use client';

import { useState } from 'react';

const ZONES = [
    {
        name: 'ACCESO (GR01)',
        ids: ['GR01-AC-VIS']
    },
    {
        name: 'MADRES (MD01)',
        ids: ['MD01-SA-LIM', 'MD01-SA-PLA', 'MD01-LT-RIE', 'MD01-SA-CLM']
    },
    {
        name: 'VEGETATIVO (VG01)',
        ids: ['VG01-SA-LIM', 'VG01-SA-PLA', 'VG01-LT-RIE', 'VG01-SA-CLM']
    },
    {
        name: 'FLORACIÓN (FL01)',
        ids: ['FL01-SA-LIM', 'FL01-SA-PLA', 'FL01-LT-RIE', 'FL01-SA-CLM', 'FL01-LT-COSE']
    },
    {
        name: 'SECADO (SC01)',
        ids: ['SC01-SA-LIM', 'SC01-SA-CLM', 'SC01-LT-ENT', 'SC01-SA-SEC']
    },
    {
        name: 'ALMACÉN (AL01)',
        ids: ['AL01-IN-MOV']
    },
    {
        name: 'EQUIPOS (EQ01)',
        ids: ['EQ01-EQ-CAL']
    }
];

export default function QRList() {
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 1500);
    };

    return (
        <div className="mt-8 text-left space-y-6 max-w-2xl mx-auto">
            {ZONES.map((zone) => (
                <div key={zone.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide border-b pb-2">
                        {zone.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {zone.ids.map((id) => (
                            <button
                                key={id}
                                onClick={() => copyToClipboard(id)}
                                className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-indigo-50 rounded-md border border-gray-200 hover:border-indigo-300 transition-all group"
                            >
                                <span className="font-mono text-sm text-gray-700 font-medium">{id}</span>
                                <span className="text-xs text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                                    {copied === id ? '¡Copiado!' : 'Copiar'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
