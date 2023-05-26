<script setup lang="ts">
import { matRefresh } from '@quasar/extras/material-icons';
</script>


<template>
    <q-card
        flat
        class="my-card q-mb-md q-pa-md"
    >
        <q-card-section
            horizontal
            width="100%"
            class="justify-between"
        >
            <q-card-section class="text-white q-pa-sm text-left">
                <div class="text-subtitle2 text-weight-bold q-mb-md">
                    Meta diária:
                    <span class="text-weight-bold">3340kcal</span>
                </div>
                <div class="text-subtitle2 text-weight-bold q-mb-md">
                    Sua divisão atual:
                    <span class="text-weight-bold">ABC</span>
                </div>
                <div class="text-subtitle2 text-weight-bold q-mb-md">
                    Objetivo:
                    <span class="text-weight-bold">Hipertrofia</span>
                </div>
                <div class="text-subtitle2 text-weight-bold text-green">
                    Duração: 2h
                </div>
            </q-card-section>
            <q-card-section
                align="center"
                class="column align-center justify-center"
            >
                <div class="text-subtitle2 text-weight-bold">
                    Gasto estimado:
                </div>
                <div class="text-h6 text-weight-bold text-red">
                    506
                </div>
                <div class="text-h6 text-weight-bold text-red">
                    kcal
                </div>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<style scoped lang="scss">
.descripton {
    font-size: 0.6rem;
}
</style>
