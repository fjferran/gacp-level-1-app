'use client';

import { useEffect, useState } from 'react';
import { getProgressStats } from '@/lib/progress';

export default function ProgressBar() {
    const [stats, setStats] = useState({ count: 0, total: 0, percent: 0 });

    useEffect(() => {
        const update = () => setStats(getProgressStats());
        update();
        window.addEventListener('storage', update);
        // Also listen to custom event if we dispatch one, or just storage
        // We might need a custom event for same-tab updates
        const handleCustom = () => update();
        window.addEventListener('progress-update', handleCustom);
        return () => {
            window.removeEventListener('storage', update);
            window.removeEventListener('progress-update', handleCustom);
        };
    }, []);

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${stats.percent}%` }}
            ></div>
            <p className="text-xs text-right mt-1 text-gray-500">{stats.percent}% Completado</p>
        </div>
    );
}
