import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>

                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Nueva versión 2.0 con IA integrada. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true" />Leer más <span aria-hidden="true">&rarr;</span></a>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Implementa GACP Nivel 1 en tu cultivo (Low-Cost)
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            La primera App diseñada para pequeños productores que quieren certificar su calidad sin gastar miles de euros en software complejo. Trazabilidad, auditorías y calidad en tu bolsillo.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/roadmap" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50">
                                Ver Recorrido Gratuito
                            </Link>
                            <Link href="/screen/ONB_001" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Acceso Completo (Usuarios Registrados)
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
                </div>
            </div>

            {/* Feature Section */}
            <div className="bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-400">Auditoría Ready</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Todo lo que necesitas para pasar la inspección
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Olvídate de los papeles perdidos y las hojas de cálculo rotas. GACP Nivel 1 centraliza tu operación.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                    <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-500">
                                        QR
                                    </span>
                                    Registros QR
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                    <p className="flex-auto">Escanea códigos en cada sala para registrar limpiezas, riegos y aplicaciones en segundos.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                    <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-500">
                                        G
                                    </span>
                                    Google Drive Sync
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                    <p className="flex-auto">Tus datos son tuyos. Todo se sincroniza automáticamente con tu Google Drive personal.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                    <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-500">
                                        QA
                                    </span>
                                    Sistema de Calidad
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                                    <p className="flex-auto">Gestión integrada de Desvíos, CAPAs y Enmiendas. Lo que realmente busca el auditor.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
