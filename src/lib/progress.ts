'use client';

import { SCREEN_ORDER } from '../../content/screens';

const STORAGE_KEY = 'gacp_progress';

export function getCompletedScreens(): Record<string, boolean> {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

export function markScreenAsCompleted(screenId: string, completed: boolean = true) {
    if (typeof window === 'undefined') return;
    const current = getCompletedScreens();
    const updated = { ...current, [screenId]: completed };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch event for reactivity if needed, or rely on state in components
    window.dispatchEvent(new Event('storage'));
}

export function isSprintComplete(sprintPrefix: string): boolean {
    const completed = getCompletedScreens();
    const sprintScreens = SCREEN_ORDER.filter(id => id.startsWith(sprintPrefix) && !id.endsWith('_900'));
    return sprintScreens.every(id => completed[id]);
}

export function isScreenLocked(screenId: string): boolean {
    // Rule: *_900 only enabled if sprint is complete
    if (screenId.endsWith('_900')) {
        const sprintPrefix = screenId.split('_')[0];
        return !isSprintComplete(sprintPrefix);
    }
    return false;
}

export function getProgressStats() {
    const completed = getCompletedScreens();
    const total = SCREEN_ORDER.length;
    const count = Object.keys(completed).filter(k => completed[k] && SCREEN_ORDER.includes(k)).length;
    return { count, total, percent: Math.round((count / total) * 100) };
}
