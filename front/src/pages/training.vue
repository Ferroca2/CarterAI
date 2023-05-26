<script setup lang="ts">
import TrainingDetails from 'components/training-details.vue';
import TrainingCard from 'components/training-card.vue';
import { ref } from 'vue';

const tab = ref('seg');
</script>

<template>
    <q-tabs
        v-model="tab"
        bg
        class="bg-dark"
    >
        <q-tab
            name="seg"
            label="Seg"
            no-caps
        />
        <q-tab
            name="ter"
            label="Ter"
            no-caps
        />
        <q-tab
            name="qua"
            label="Qua"
            no-caps
        />
        <q-tab
            name="qui"
            label="Qui"
            no-caps
        />
        <q-tab
            name="sex"
            label="Sex"
            no-caps
        />
        <q-tab
            name="sab"
            label="Sab"
            no-caps
        />
    </q-tabs>
    <q-page class="column q-pa-md">
        <training-details />
        <training-card />
    </q-page>
</template>
