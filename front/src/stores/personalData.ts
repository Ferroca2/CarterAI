import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    Transaction,
    WriteBatch,
} from 'firebase/firestore';
import { useSessionStore } from './session';
import resolveWhen from '../util/resolveWhen';

export const personalDataSteps = [
    'name-and-age',
    'height-and-weight',
    'goals',
] as const;

export type PersonalDataStage = typeof personalDataSteps[number];

interface PersonalDataStageData {
    'name-and-age'?: boolean;
    'height-and-weight'?: boolean;
    'goals'?: boolean;
}

type PersonalDataStageItem<S extends PersonalDataStage> = Required<PersonalDataStageData>[S];

type UpdateStageOptions = { update: false; } | {
    update?: true;
} & ({
    transaction?: Transaction;
} | {
    batch?: WriteBatch;
});

export const usePersonalDataStore = defineStore('personalData', () => {
    const session = useSessionStore();

    const uid = computed(() => session.user?.uid ?? null);

    const steps = ref<PersonalDataStageData | null>(null);

    watch(uid, async (uid, _, cleanup) => {
        if (!uid) {
            steps.value = null;
            return;
        }

        let update = true;

        cleanup(() => update = false);

        steps.value = null;

        const snap = await getDoc(
            doc(db, 'onboarding', uid)
        );

        if (update) {
            steps.value = snap.data() ?? {};
        }
    });

    const db = getFirestore();

    return {
        steps,
        async getSteps() {
            if (!uid.value) {
                throw new Error('User not logged in');
            }

            await resolveWhen(() => steps.value !== null);

            return steps.value!;
        },
        async updateStage<S extends PersonalDataStage>(
            stage: S,
            data: PersonalDataStageItem<S>,
            options = {} as UpdateStageOptions
        ) {
            const { update = true } = options;

            if (!steps.value) {
                throw new Error('User not logged in');
            }

            try {
                steps.value[stage] = data;

                if (!update) return;

                const args = [
                    doc(db, `onboarding/${uid.value}`),
                    { [stage]: data },
                    { merge: true },
                ] as const;

                await setDoc(...args);
            }
            catch (err) {
                delete steps.value[stage];
                throw err;
            }
        },
    };
});
