import React from 'react';
import Link from 'next/link';

const phases = [
    {
        id: '0',
        title: 'Sprint 0: Fundamentos Digitales',
        description: 'Configuración del entorno. Conectamos tu Google Drive y creamos la estructura de carpetas maestra. Sin costes de servidores.',
        icon: '🏗️'
    },
    {
        id: '1',
        title: 'Sprint 1: Estructura del Cultivo',
        description: 'Definimos tus Salas (Vegetativo, Floración, Secado) y Lotes. El sistema aprende cómo funciona tu instalación.',
        icon: 'map'
    },
    {
        id: '2',
        title: 'Sprint 2: Formularios Inteligentes',
        description: 'Desplegamos los Google Forms para Riego, Limpieza, Plagas y Clima. Todo conectado a la Hoja Maestra.',
        icon: '📝'
    },
    {
        id: '3',
        title: 'Sprint 3: Despliegue QR',
        description: 'Generamos los códigos QR para cada sala. Los operarios solo tienen que escanear y rellenar. Adiós al papel.',
        icon: '📱'
    },
    {
        id: '4',
        title: 'Sprint 4: Formación de Equipo',
        description: 'Las 10 Reglas de Oro. Enseñamos a tu equipo a usar el sistema y validamos que lo han entendido antes del Go-Live.',
        icon: '🎓'
    },
    {
        id: '5',
        title: 'Sprint 5: Sistema de Calidad',
        description: 'Implementamos la gestión de Desvíos, CAPAs y Enmiendas. La diferencia entre un cultivo amateur y uno certificado.',
        icon: '🛡️'
    },
    {
        id: '6',
        title: 'Sprint 6: Auditoría y Recall',
        description: 'Simulacro final. Comprobamos que puedes trazar un lote desde la venta hasta la semilla en menos de 15 minutos.',
        icon: '🔍'
    }
];

export default function RoadmapPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Recorrido Gratuito</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Tu hoja de ruta hacia la certificación GACP
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Este es el proceso exacto que seguiremos para digitalizar tu cultivo. 7 Sprints, 1 objetivo.
                    </p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="flow-root">
                        <ul role="list" className="-mb-8">
                            {phases.map((phase, phaseIdx) => (
                                <li key={phase.id}>
                                    <div className="relative pb-8">
                                        {phaseIdx !== phases.length - 1 ? (
                                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex space-x-3">
                                            <div>
                                                <span className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center ring-8 ring-white text-white text-sm">
                                                    {phase.id}
                                                </span>
                                            </div>
                                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{phase.title}</p>
                                                    <p className="mt-2 text-sm text-gray-500">{phase.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <Link href="/screen/ONB_001" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Comenzar Implementación (Registro)
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
