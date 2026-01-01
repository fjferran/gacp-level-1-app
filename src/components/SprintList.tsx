'use client';

import { SCREEN_ORDER } from '../../content/screens';
import { getCompletedScreens } from '@/lib/progress';
import { t } from '@/lib/i18n';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SprintList() {
    const [completed, setCompleted] = useState<Record<string, boolean>>({});
    const [expandedSprint, setExpandedSprint] = useState<string | null>(null);

    useEffect(() => {
        setCompleted(getCompletedScreens());
        const handleUpdate = () => setCompleted(getCompletedScreens());
        window.addEventListener('progress-update', handleUpdate);
        return () => window.removeEventListener('progress-update', handleUpdate);
    }, []);

    // Group screens by sprint
    const sprints: Record<string, string[]> = {};
    SCREEN_ORDER.forEach(id => {
        const prefix = id.split('_')[0];
        if (prefix.startsWith('SPR')) {
            if (!sprints[prefix]) sprints[prefix] = [];
            sprints[prefix].push(id);
        }
    });

    const getSprintStatus = (screens: string[]) => {
        const total = screens.length;
        const done = screens.filter(id => completed[id]).length;
        if (done === 0) return 'Pendiente';
        if (done === total) return 'Completado';
        // Check if validation screen is ready (all others done)
        const validationScreen = screens.find(id => id.endsWith('_900'));
        if (validationScreen && !completed[validationScreen] && done === total - 1) return 'Listo para validar';
        return 'En progreso';
    };

    const statusColors: Record<string, string> = {
        'Pendiente': 'bg-gray-100 text-gray-600',
        'En progreso': 'bg-blue-100 text-blue-600',
        'Listo para validar': 'bg-yellow-100 text-yellow-600',
        'Completado': 'bg-green-100 text-green-600',
    };

    return (
        <div className="space-y-4">
            {Object.entries(sprints).map(([sprint, screens]) => {
                const status = getSprintStatus(screens);
                const title = t(`${screens[0]}_TITLE`).split('—')[0]; // Extract "Sprint X" from title if possible, or just use ID

                return (
                    <div key={sprint} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                            onClick={() => setExpandedSprint(expandedSprint === sprint ? null : sprint)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 text-left"
                        >
                            <div>
                                <h3 className="font-semibold text-gray-900">{title}</h3>
                                <p className="text-sm text-gray-500">{screens.length} pantallas</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                                {status}
                            </span>
                        </button>

                        {expandedSprint === sprint && (
                            <div className="border-t bg-gray-50 p-4 space-y-2">
                                {screens.map(id => (
                                    <Link
                                        key={id}
                                        href={`/screen/${id}`}
                                        className="block p-2 rounded hover:bg-white flex justify-between items-center group"
                                    >
                                        <span className="text-sm text-gray-700 group-hover:text-indigo-600">
                                            {t(`${id}_TITLE`)}
                                        </span>
                                        {completed[id] && <span className="text-green-500 text-xs">✓</span>}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
