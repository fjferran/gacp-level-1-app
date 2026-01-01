import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-gray-900">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Implementa GACP Nivel 1 paso a paso (low-cost)
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Digitaliza tus registros, crea trazabilidad por lote y prepárate para auditorías usando Google Drive, Sheets, Forms y QRs. Sin ERP. Sin programación.
        </p>

        <div className="text-left bg-white p-6 rounded-lg shadow-sm border border-gray-200 mx-auto max-w-lg">
          <ul className="space-y-2 text-gray-700">
            <li>• Registros desde el móvil con códigos QR</li>
            <li>• Integridad de datos (sin borrar + enmiendas)</li>
            <li>• Desvíos, CAPA y Recall Test incluidos</li>
          </ul>
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/onboarding/1"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Empezar proyecto
          </Link>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Ver cómo funciona (3 min) <span aria-hidden="true">→</span>
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Ideal para instalaciones con 1 sala por proceso y equipos pequeños.
        </p>
      </div>
    </main>
  );
}
