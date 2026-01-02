'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function DemoPage() {
    const [step, setStep] = useState(1);
    const [lotId, setLotId] = useState('');
    const [room, setRoom] = useState('Floración 1');
    const [record, setRecord] = useState<any>(null);

    const handleGenerateQR = () => {
        if (!lotId) return;
        setStep(2);
    };

    const handleScan = () => {
        setStep(3);
    };

    const handleSubmitForm = () => {
        const newRecord = {
            date: new Date().toLocaleString(),
            lot: lotId,
            room: room,
            action: 'Riego + Nutrientes',
            operator: 'Usuario Demo',
            status: 'OK'
        };
        setRecord(newRecord);
        setStep(4);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900">Simulador de Trazabilidad</h1>
                    <p className="mt-2 text-gray-600">Prueba el ciclo completo de registro GACP en 1 minuto, sin registro.</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8 text-sm font-medium text-gray-500">
                    <span className={step >= 1 ? 'text-indigo-600' : ''}>1. Crear Lote</span>
                    <span className={step >= 2 ? 'text-indigo-600' : ''}>2. Generar QR</span>
                    <span className={step >= 3 ? 'text-indigo-600' : ''}>3. Escanear y Registrar</span>
                    <span className={step >= 4 ? 'text-indigo-600' : ''}>4. Resultado</span>
                </div>

                <div className="bg-white shadow sm:rounded-lg p-6">

                    {/* Step 1: Create Lot */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="lot" className="block text-sm font-medium text-gray-700">Nombre del Lote (Batch Code)</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="lot"
                                        id="lot"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                        placeholder="Ej. BC-2026-001"
                                        value={lotId}
                                        onChange={(e) => setLotId(e.target.value)}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">En GACP, todo empieza con un código único para el lote de plantas.</p>
                            </div>
                            <button
                                onClick={handleGenerateQR}
                                disabled={!lotId}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                            >
                                Generar QR de Sala
                            </button>
                        </div>
                    )}

                    {/* Step 2: QR Display */}
                    {step === 2 && (
                        <div className="text-center space-y-6">
                            <div className="mx-auto h-48 w-48 bg-white flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-2">
                                <QRCodeSVG value={`https://gacp-app.com/register/${lotId}/${room}`} size={160} />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">QR Generado para: {room}</h3>
                                <p className="text-sm text-gray-500">Este código se pegaría en la puerta de la sala. El operario lo escanea con su móvil.</p>
                            </div>
                            <button
                                onClick={handleScan}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Simular Escaneo con Móvil
                            </button>
                        </div>
                    )}

                    {/* Step 3: Form */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900">Registro Diario - {room}</h3>
                                <p className="text-sm text-gray-500">Lote activo: {lotId}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input id="clean" name="clean" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="clean" className="font-medium text-gray-700">Limpieza realizada</label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input id="water" name="water" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="water" className="font-medium text-gray-700">Riego + Nutrientes</label>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Observaciones</label>
                                    <textarea id="notes" name="notes" rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="Todo correcto..."></textarea>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmitForm}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                            >
                                Guardar Registro
                            </button>
                        </div>
                    )}

                    {/* Step 4: Result */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div className="rounded-md bg-green-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">Registro guardado correctamente</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 font-mono text-sm">
                                <p><strong>Fecha:</strong> {record.date}</p>
                                <p><strong>Lote:</strong> {record.lot}</p>
                                <p><strong>Sala:</strong> {record.room}</p>
                                <p><strong>Acción:</strong> {record.action}</p>
                                <p><strong>Operario:</strong> {record.operator}</p>
                                <p><strong>Estado:</strong> {record.status}</p>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    En la versión completa, este dato se guarda automáticamente en tu Google Sheet maestro y es inborrable.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setStep(1)} className="text-indigo-600 hover:text-indigo-500 font-medium">
                                        Probar otra vez
                                    </button>
                                    <Link href="/screen/ONB_001" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                                        Implementar Sistema Real
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
