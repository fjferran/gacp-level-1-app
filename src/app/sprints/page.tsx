import SprintList from '@/components/SprintList';
import Link from 'next/link';

export default function SprintsPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Sprints</h1>
                    <Link href="/" className="text-sm text-indigo-600 hover:underline">
                        Volver al inicio
                    </Link>
                </div>
                <SprintList />
            </div>
        </main>
    );
}
