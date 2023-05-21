<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
    matHeight,
    matScale,
} from '@quasar/extras/material-icons';

import { useSessionStore } from 'stores/session';
import { usePersonalDataStore } from 'stores/personalData';
import useError from 'src/hooks/useError';
import { doc, getFirestore, setDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router';

const session = useSessionStore();
const personalData = usePersonalDataStore();
const error = useError();
const router = useRouter();

const loading = ref(false);

const data = reactive({
    height: '',
    weight: '',
});

async function next() {
    loading.value = true;
    try {
        const userRef = doc(getFirestore(), 'users', session.user!.uid);

        await setDoc(userRef, {
            height: data.height,
            weight: data.weight,
        }, { merge: true });

        await personalData.updateStage('height-and-weight', true);

        router.replace('/dashboard');
    }
    catch (err) {
        error(err);
    }
    finally {
        loading.value = false;
    }
}

</script>

<template>
    <q-page class="page column full-height align-center q-pa-xl">
        <div class="text-start text-h3 text-weight-bold q-mt-xl">
            Qual a sua <span class="text-accent">peso e altura?</span>
        </div>
        <div class="row justify-center align-center">
            <q-form
                class="form"
                @submit.prevent="next"
            >
                <div class="form__contents column">
                    <q-input
                        v-model="data.height"
                        outlined
                        label="Altura(m)"
                        type="number"
                        color="accent"
                    >
                        <template #prepend>
                            <q-icon :name="matHeight" />
                        </template>
                    </q-input>
                    <q-input
                        v-model="data.weight"
                        outlined
                        label="Peso(kg)"
                        type="text"
                        color="accent"
                    >
                        <template #prepend>
                            <q-icon :name="matScale" />
                        </template>
                    </q-input>
                </div>
            </q-form>
            <q-footer
                class="footer q-pa-md"
                elevated
            >
                <q-btn
                    class="form__submit"
                    no-caps
                    color="accent"
                    type="submit"
                    :loading="loading"
                    @click="next"
                >
                    Próximo
                    <template #loading>
                        <q-spinner
                            color="white"
                            size="1.5rem"
                        />
                    </template>
                </q-btn>
            </q-footer>
        </div>
    </q-page>
</template>

<style scoped lang="scss">

.page{
    padding-top: 3rem;
}

.footer {
    background: transparent;
    border: 1px grey;
}
.form {
    max-width: 500px;
    width: 100%;

    &__contents {
        gap: 2rem;
        margin-top: 2rem;
    }

    &__submit {
        width: 100%;
        height: 50px;

        font-size: 13pt;
    }
    &__login {
        width: 100%;
        text-align: center;
        font-size: 13px;
        margin-top: .7rem;

        & > a {
            color: $accent;
        }
    }
}
</style>
