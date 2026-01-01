import Screen from "@/components/Screen";
import WizardNav from "@/components/WizardNav";

export default function Home() {
  return (
    <div className="pb-20">
      <Screen screenId="LND_001" />
      <WizardNav currentScreenId="LND_001" />
    </div>
  );
}
