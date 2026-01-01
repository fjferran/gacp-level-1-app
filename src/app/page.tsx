import Screen from "@/components/Screen";
import WizardNav from "@/components/WizardNav";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  return (
    <div className="pb-20">
      <div className="max-w-2xl mx-auto px-6 pt-6">
        <ProgressBar />
        <div className="mt-4 text-center space-x-4">
          <a href="/sprints" className="text-sm text-indigo-600 hover:underline">Ver todos los Sprints</a>
          <span className="text-gray-300">|</span>
          <a href="/examples" className="text-sm text-indigo-600 hover:underline">Ejemplos y Búsqueda</a>
        </div>
      </div>
      <Screen screenId="LND_001" />
      <WizardNav currentScreenId="LND_001" />
    </div>
  );
}
