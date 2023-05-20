<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

$q.dark.set(true);

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header
            reveal
            class="bg-primary text-white q-pa-sm"
            height-hint="98"
        >
            <q-toolbar>
                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>
                    Crypto Reports
                </q-toolbar-title>

                <q-btn
                    flat
                    text-color="accent"
                    to="/admin"
                    label="Publish"
                    no-caps
                />
                <q-btn
                    flat
                    text-color="accent"
                    to="/admin/coins"
                    label="Coin Infos"
                    no-caps
                />
                <q-btn
                    flat
                    text-color="accent"
                    to="/admin/researches"
                    label="Reasearchs"
                    no-caps
                />
                <q-space />
                <q-space />
                <q-space />
                <q-space />
                <q-space />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>
