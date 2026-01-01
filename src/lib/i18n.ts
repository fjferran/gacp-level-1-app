import es from '../../content/es.json';

export function t(key: string): string {
    const translations = es as Record<string, string>;
    if (!translations[key]) {
        console.warn(`Missing translation key: ${key}`);
        return key;
    }
    return translations[key];
}
