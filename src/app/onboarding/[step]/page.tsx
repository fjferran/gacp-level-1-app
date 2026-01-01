export default async function OnboardingPage({
    params,
}: {
    params: Promise<{ step: string }>;
}) {
    const { step } = await params;
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold">Onboarding Step {step}</h1>
            <p className="mt-4">ONB_00{step} placeholder</p>
        </main>
    );
}
