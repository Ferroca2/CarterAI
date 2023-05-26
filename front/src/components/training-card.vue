<script setup lang="ts">
import { matRefresh } from '@quasar/extras/material-icons';

// interface Training {
//     totalCalories: string;
//     typeOfDivision: string;
//     trainings: {
//         day: string;
//         exercises: string[];
//     }[];
// }

// defineProps<Training>();
</script>


<template>
    <q-card
        flat
        class="my-card q-mb-md"
    >
        <q-card-section
            align="center"
            class="bg-grey-8 text-white"
        >
            <div class="text-subtitle1 text-weight-bold text-red">
                Treino
            </div>
        </q-card-section>

        <q-card-section
            class="column"
            align="center"
        >
            <div

                class="text-subtitle2 q-mb-md"
            >
                Agachamento livre: 3 séries de 8-10 repetições
            </div>
            <div

                class="text-subtitle2 q-mb-md"
            >
                Leg press: 3 séries de 10-12 repetições
            </div>
            <div

                class="text-subtitle2 q-mb-md"
            >
                Afundo com halteres: 3 séries de 10-12 repetições (cada perna)
            </div>
            <div

                class="text-subtitle2 q-mb-md"
            >
                Extensão de pernas: 3 séries de 12-15 repetições
            </div>
            <div

                class="text-subtitle2 q-mb-md"
            >
                Flexão de pernas (cadeira flexora): 3 séries de 12-15 repetições
            </div>
            <div

                class="text-subtitle2 q-mb-md"
            >
                Panturrilha em pé (elevação de panturrilha): 3 séries de 12-15 repetições
            </div>
            <div

                class="text-subtitle2 q-mb-md"
            >
                Panturrilha sentado (elevação de panturrilha): 3 séries de 12-15 repetições
            </div>
        </q-card-section>
        <q-card-actions
            align="center"
            class="bg-grey-8 text-white"
        >
            <q-btn
                flat
                round
                color="red"
                :icon="matRefresh"
            />
            <q-btn
                flat
                class="text-subtitle2 text-weight-bold text-center"
            >
                Gerar outras opções de treino
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<style scoped lang="scss">

.separator{
    width: 10px;

}
</style>
