<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from 'stores/session';
import { usePersonalDataStore } from 'stores/personalData';
import useError from 'src/hooks/useError';
import { doc, getFirestore, setDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router';
import { setDietApi } from 'boot/axios';

const session = useSessionStore();
const personalData = usePersonalDataStore();
const error = useError();
const router = useRouter();

const loading = ref(false);

const data = ref<string>('saude');

async function next() {
    loading.value = true;
    try {
        const userId = session.user!.uid;

        const userRef = doc(getFirestore(), 'users', userId);

        await setDoc(userRef, {
            goal: data.value,
        }, { merge: true });

        await setDietApi.post('/', {body: { userId }});

        await personalData.updateStage('goals', true);


        router.replace('/fitness/diet');
    }
    catch (err) {
        error(err);
    }
    finally {
        loading.value = false;
    }
}

function select(value: string) {
    data.value = value;
}

interface Description {
    [key: string]: string;
}

const descriptions: Description = {
    'saude': 'Seu foco está em manter uma vida saudavel e um corpo esbelto',
    'hipertrofia': 'Seu foco está em ganhar massa muscular e aumentar sua força',
    'emagrecimento': 'Seu foco está em perder peso e diminuir sua gordura corporal',
};
</script>

<template>
    <q-page class="page column full-height align-center q-pt-xl">
        <div class="text-start text-h3 text-weight-bold q-ma-xl">
            Qual o seu <span class="text-accent">objetivo?</span>
        </div>
        <div class="row justify-center align-center">
            <!-- <q-option-group
                v-model="data"
                inline
                :options="options"
            /> -->
            <div
                v-if="data === 'saude'"
                class="card col text-accent"
                @click="select('saude')"
            >
                <div>
                    Saúde
                </div>
            </div>
            <div
                v-else
                class="card col"
                @click="select('saude')"
            >
                <div>
                    Saúde
                </div>
            </div>

            <div
                v-if="data === 'hipertrofia'"
                class="card col text-accent"
                @click="select('hipertrofia')"
            >
                <div>
                    Hipertrofia
                </div>
            </div>
            <div
                v-else
                class="card col"
                @click="select('hipertrofia')"
            >
                <div>
                    Hipertrofia
                </div>
            </div>
            <div
                v-if="data === 'emagrecimento'"
                class="card col text-accent"
                @click="select('emagrecimento')"
            >
                <div>
                    Emagrecimento
                </div>
            </div>
            <div
                v-else
                class="card col"
                @click="select('emagrecimento')"
            >
                <div>
                    Emagrecimento
                </div>
            </div>
            <div class="text-grey-7 text-subtitle1 q-pa-md text-center">
                {{ descriptions[data] }}
            </div>
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

.card{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $dark;
    border-radius: 10px;
    border: 0.6px solid $accent;
    margin: 0.7rem;
    height: 50px;
    width: 33%;
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
