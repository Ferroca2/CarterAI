<script setup lang="ts">
import { useQuasar } from 'quasar';
import {
    matRestaurant,
    matFitnessCenter,
    matChat,
} from '@quasar/extras/material-icons';

import { ref } from 'vue';

const $q = useQuasar();


const tab = ref('mails');

$q.dark.set(true);

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header
            class="bg-dark text-white q-pa-sm"
            height-hint="98"
        >
            <q-toolbar>
                <q-btn
                    flat
                    round
                    dense
                    icon="menu"
                    class="q-mr-sm"
                />

                <q-toolbar-title class="text-center">
                    CarterAI
                </q-toolbar-title>

                <q-btn
                    flat
                    round
                    dense
                    icon="whatshot"
                />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer class="footer bg-dark">
            <q-tabs
                v-model="tab"
                indicator-color="transparent"
                active-color="accent"
                class="full-width full-height text-grey-5 shadow-2"
            >
                <q-route-tab
                    name="mails"
                    :icon="matRestaurant"
                    to="/fitness/diet"
                />
                <q-route-tab
                    name="alarms"
                    :icon="matFitnessCenter"
                    to="/fitness/training"
                />
                <q-route-tab
                    name="movies"
                    :icon="matChat"
                    to="/fitness/chat"
                />
            </q-tabs>
        </q-footer>
    </q-layout>
</template>

<style lang="scss" scoped>
.footer {
    height: 8vh;
}
</style>
