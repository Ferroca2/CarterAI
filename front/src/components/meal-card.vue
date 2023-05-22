<script setup lang="ts">
import { matRefresh } from '@quasar/extras/material-icons';
</script>


<template>
    <q-card
        flat
        class="my-card q-mb-md"
    >
        <q-card-section class="bg-grey-8 text-white">
            <div class="text-subtitle1 text-weight-bold">
                Café da manhã
                <span class="text-grey">     8:00</span>
            </div>
            <div class="row text-caption">
                <span class="text-blue">Proteínas: 8g </span>
                <div class="separator" />
                <span class="text-accent">Carboidratos: 10g </span>
                <div class="separator" />
                <span class="text-green">Gorduras: 2g</span>
            </div>
        </q-card-section>

        <q-card-section
            class="column"
            align="center"
        >
            <div class="text-subtitle2">
                1/2 copo de yogurte
            </div>
            <div class="text-subtitle2">
                4 ovos mexidos
            </div>
            <div class="text-subtitle2">
                Pão frances
            </div>
            <div class="text-subtitle2">
                Aveia e mel
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
