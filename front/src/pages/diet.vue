<script setup lang="ts">
import MealCard from 'components/meal-card.vue';
import Dashboard from 'components/dashboard.vue';
</script>

<template>
    <q-page class="column q-pa-md">
        <dashboard />
        <meal-card />

        <meal-card />

        <meal-card />

        <meal-card />
    </q-page>
</template>
