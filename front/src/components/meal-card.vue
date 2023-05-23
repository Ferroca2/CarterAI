<script setup lang="ts">
import { matRefresh } from '@quasar/extras/material-icons';

interface Meal {
    nameOfMeal: string;
    foods: string[];
    hour: string;
    macros: {
        protein: string;
        carbs: string;
        fat: string;
    };
}

defineProps<Meal>();
</script>


<template>
    <q-card
        flat
        class="my-card q-mb-md"
    >
        <q-card-section class="bg-grey-8 text-white">
            <div class="text-subtitle1 text-weight-bold">
                {{ nameOfMeal }}
                <span class="text-grey">     {{ hour }}</span>
            </div>
            <div class="row text-caption">
                <span class="text-blue">Proteínas: {{ macros.protein }}</span>
                <div class="separator" />
                <span class="text-accent">Carboidratos: {{ macros.carbs }}</span>
                <div class="separator" />
                <span class="text-green">Gorduras: {{ macros.fat }}</span>
            </div>
        </q-card-section>

        <q-card-section
            class="column"
            align="center"
        >
            <div
                v-for="food in foods"
                :key="food"
                class="text-subtitle2"
            >
                {{ food }}
            </div>
        </q-card-section>
        <q-card-actions
            align="center"
            class="bg-grey-8 text-white"
        >
            <q-btn
                flat
                round
                color="accent"
                :icon="matRefresh"
            />
            <q-btn
                flat
                class="text-subtitle2 text-weight-bold text-center"
            >
                Gerar outras opções de alimento
            </q-btn>
        </q-card-actions>
    </q-card>
</template>

<style scoped lang="scss">

.separator{
    width: 10px;

}
</style>
