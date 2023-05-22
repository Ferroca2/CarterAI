<script setup lang="ts">
import { matRefresh } from '@quasar/extras/material-icons';
</script>


<template>
    <q-card
        flat
        class="my-card q-mb-md q-pa-sm"
    >
        <q-card-section class="text-white q-pa-sm">
            <div class="text-subtitle2 text-weight-bold">
                Meta diária:
                <span class="text-weight-bold">3340kcal</span>
            </div>
        </q-card-section>

        <q-card-section
            horizontal
            align="center"
        >
            <q-card-section>
                <q-circular-progress
                    :value="80"
                    size="130px"
                    :thickness="0.25"
                    color="accent"
                    track-color="blue"
                    class="q-ma-sm"
                />
                <div class="text-caption text-weight-bold">
                    Gasto basal:
                    <span class="text-weight-bold">2930kcal</span>
                </div>
            </q-card-section>
            <q-card-section class="full-width q-pa-sm justify-center">
                <div class="text-left text-subtitle2 text-weight-bold q-ma-sm">
                    <span>Proteinas:</span>
                </div>
                <q-linear-progress
                    dark
                    rounded
                    size="60%"
                    :value="0.8"
                    color="blue"
                    class="q-ma-sm"
                />
                <div class="descripton text-left q-ma-sm">
                    160 g/ 160g ( Faltam 0g )
                </div>
                <div class="text-left text-subtitle2 text-weight-bold q-ma-sm">
                    Carboidratos:
                </div>
                <q-linear-progress
                    dark
                    rounded
                    size="60%"
                    :value="0.8"
                    color="accent"
                    class="q-ma-sm"
                />
                <div class="descripton text-left q-ma-sm">
                    160 g/ 160g ( Faltam 0g )
                </div>
                <div class="text-left text-subtitle2 text-weight-bold q-ma-sm">
                    Gorduras:
                </div>
                <q-linear-progress
                    dark
                    rounded
                    size="60%"
                    :value="0.8"
                    color="yellow"
                    class="q-ma-sm"
                />
                <div class="descripton text-left q-ma-sm">
                    160 g/ 160g ( Faltam 0g )
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
