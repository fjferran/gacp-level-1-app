import Screen from '@/components/Screen';
import WizardNav from '@/components/WizardNav';
import { SCREEN_ORDER } from '../../../content/screens';

export async function generateStaticParams() {
    return SCREEN_ORDER.map((id) => ({
        id,
    }));
}

export default async function ScreenPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <div className="pb-20">
            <Screen screenId={id} />
            <WizardNav currentScreenId={id} />
        </div>
    );
}
