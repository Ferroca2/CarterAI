import resolveWhen from '../util/resolveWhen';
import { boot } from 'quasar/wrappers';
import { useSessionStore } from 'stores/session';
import { personalDataSteps, usePersonalDataStore } from 'stores/personalData';

export default boot(({ router, store: pinia }) => {
    const stepToPath = {
        'name-and-age': '',
        'height-and-weight': 'height-and-weight',
        'goals': 'goals',
    };

    router.beforeEach(async to => {
        const session = useSessionStore();
        const onboarding = usePersonalDataStore(pinia);

        await resolveWhen(() => !session.loading);

        if (session.user) {
            const nextStep = await getNextRegistrationStep(onboarding);

            if (!nextStep && to.meta.access === 'guests-only') {
                return { path: '/menu/orders' };
            }

            if (nextStep) {
                const newPath = `/getting-started/${stepToPath[nextStep]}`;

                if (newPath === to.path) return;

                return {
                    path: newPath,
                };
            }
            else if (to.path.startsWith('/getting-started')) {
                return { path: '/menu/orders' };
            }
        }

        if (to.meta.access === 'auth-only' && !session.user) {
            return {
                path: '/',
            };
        }
    });

    async function getNextRegistrationStep(
        onboarding: ReturnType<typeof usePersonalDataStore>
    ) {
        const steps = await onboarding.getSteps();

        const completed = new Set(Object.keys(steps));

        return personalDataSteps.find(step => !completed.has(step)) ?? null;
    }
});
