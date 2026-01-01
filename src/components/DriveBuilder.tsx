'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { createFolder, createSheet } from '@/lib/google';

const STEPS = [
    {
        id: 'root',
        label: 'Carpeta Raíz',
        desc: 'Creando "GACP_SYSTEM_N1". Esta será la base de tu sistema de calidad.',
        action: async (token: string) => await createFolder(token, 'GACP_SYSTEM_N1')
    },
    {
        id: 'manual',
        label: 'Manual de Calidad',
        desc: 'Creando "00_MANUAL_CALIDAD_N1". Aquí guardaremos la política y objetivos.',
        action: async (token: string, rootId: string) => await createFolder(token, '00_MANUAL_CALIDAD_N1', rootId)
    },
    {
        id: 'sops',
        label: 'Procedimientos (SOPs)',
        desc: 'Creando "01_SOPs_PDF_SOLO_LECTURA". Los operarios solo deben ver PDFs aprobados, nunca borradores editables.',
        action: async (token: string, rootId: string) => await createFolder(token, '01_SOPs_PDF_SOLO_LECTURA', rootId)
    },
    {
        id: 'forms',
        label: 'Borradores de Forms',
        desc: 'Creando "02_FORMS_DISEÑO". Aquí guardaremos los borradores editables de tus formularios.',
        action: async (token: string, rootId: string) => await createFolder(token, '02_FORMS_DISEÑO', rootId)
    },
    {
        id: 'records',
        label: 'Registros',
        desc: 'Creando "03_RECORDS_AUTOMATICOS". Aquí llegarán los datos de los formularios.',
        action: async (token: string, rootId: string) => await createFolder(token, '03_RECORDS_AUTOMATICOS', rootId)
    },
    {
        id: 'training',
        label: 'Formación',
        desc: 'Creando "04_TRAINING". Para guardar fichas de empleados y registros de formación.',
        action: async (token: string, rootId: string) => await createFolder(token, '04_TRAINING', rootId)
    },
    {
        id: 'audits',
        label: 'Auditorías',
        desc: 'Creando "05_AUDITS_RECALL". Para informes de auditoría interna y simulacros de retirada.',
        action: async (token: string, rootId: string) => await createFolder(token, '05_AUDITS_RECALL', rootId)
    },
    {
        id: 'deviations',
        label: 'Desvíos y CAPA',
        desc: 'Creando "06_DEVIATIONS_CAPA". Para gestionar incidencias de calidad y acciones correctivas.',
        action: async (token: string, rootId: string) => await createFolder(token, '06_DEVIATIONS_CAPA', rootId)
    },
    {
        id: 'suppliers',
        label: 'Proveedores',
        desc: 'Creando "07_SUPPLIERS_MATERIALS". Para certificados de análisis de insumos y evaluación de proveedores.',
        action: async (token: string, rootId: string) => await createFolder(token, '07_SUPPLIERS_MATERIALS', rootId)
    },
    {
        id: 'archive',
        label: 'Archivo Bloqueado',
        desc: 'Creando "99_ARCHIVO_BLOQUEADO". Para documentación obsoleta que debe conservarse 5 años.',
        action: async (token: string, rootId: string) => await createFolder(token, '99_ARCHIVO_BLOQUEADO', rootId)
    },
    {
        id: 'master',
        label: 'Hoja Maestra',
        desc: 'Creando "MASTER_DATA_GACP". La base de datos central donde se vinculan todos los Forms.',
        action: async (token: string, rootId: string, recordsId: string) => await createSheet(token, 'MASTER_DATA_GACP', recordsId)
    }
];

export default function DriveBuilder({ onComplete }: { onComplete: () => void }) {
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(-1);
    const [logs, setLogs] = useState<string[]>([]);
    const [rootId, setRootId] = useState<string | null>(null);
    const [recordsId, setRecordsId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startAutomation = async () => {
        if (!session?.accessToken) {
            setError('No hay sesión de Google activa.');
            return;
        }

        setCurrentStep(0);
        setLogs([]);
        setError(null);

        try {
            let currentRoot = '';
            let currentRecords = '';

            for (let i = 0; i < STEPS.length; i++) {
                const step = STEPS[i];
                setCurrentStep(i);
                setLogs(prev => [...prev, `⏳ ${step.desc}`]);

                // Execute action
                let result;
                if (step.id === 'root') {
                    result = await (step.action as any)(session.accessToken);
                    currentRoot = result.id;
                    setRootId(currentRoot);
                } else if (step.id === 'master') {
                    result = await (step.action as any)(session.accessToken, currentRoot, currentRecords);
                } else {
                    result = await (step.action as any)(session.accessToken, currentRoot);
                    if (step.id === 'records') currentRecords = result.id;
                }

                setLogs(prev => [...prev, `✅ ${step.label} creado correctamente.`]);
                await new Promise(r => setTimeout(r, 1500)); // Pause for educational effect
            }

            setCurrentStep(STEPS.length);
            onComplete();

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error desconocido');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100 max-w-2xl mx-auto mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Automatización de Infraestructura</h3>

            {currentStep === -1 ? (
                <div className="text-center">
                    <p className="text-gray-600 mb-6">
                        Vamos a crear tu estructura de carpetas GACP automáticamente en tu Google Drive.
                        Esto asegura que cumplas con la normativa desde el minuto 1.
                    </p>
                    <button
                        onClick={startAutomation}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        🚀 Iniciar Construcción Automática
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${((currentStep) / STEPS.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Current Step Info */}
                    {currentStep < STEPS.length && (
                        <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200">
                            <h4 className="font-bold text-indigo-800 text-lg mb-2">
                                Paso {currentStep + 1}: {STEPS[currentStep].label}
                            </h4>
                            <p className="text-indigo-700">
                                {STEPS[currentStep].desc}
                            </p>
                        </div>
                    )}

                    {/* Logs */}
                    <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm h-48 overflow-y-auto">
                        {logs.map((log, idx) => (
                            <div key={idx} className="mb-1">{log}</div>
                        ))}
                        {currentStep === STEPS.length && (
                            <div className="text-white font-bold mt-2">✨ ¡Proceso completado con éxito!</div>
                        )}
                        {error && (
                            <div className="text-red-400 font-bold mt-2">❌ Error: {error}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
