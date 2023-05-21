<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
    mdiFaceMan,
    mdiGenderMale,
} from '@quasar/extras/mdi-v6';

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
    name: '',
    sex: '',
});

async function next() {
    loading.value = true;
    try {
        const userRef = doc(getFirestore(), 'users', session.user!.uid);

        await setDoc(userRef, {
            name: data.name,
            sex: data.sex,
        }, { merge: true });

        await personalData.updateStage('name-and-age', true);

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
            Qual a sua <span class="text-accent">idade e sexo?</span>
        </div>
        <div class="row justify-center align-center">
            <q-form
                class="form"
                @submit.prevent="next"
            >
                <div class="form__contents column">
                    <q-input
                        v-model="data.name"
                        outlined
                        label="Idade"
                        type="number"
                        color="accent"
                    >
                        <template #prepend>
                            <q-icon :name="mdiFaceMan" />
                        </template>
                    </q-input>
                    <q-select
                        v-model="data.sex"
                        :options="['Masculino', 'Feminino']"
                        outlined
                        label="Sexo"
                        type="text"
                        color="accent"
                    >
                        <template #prepend>
                            <q-icon :name="mdiGenderMale" />
                        </template>
                    </q-select>
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
