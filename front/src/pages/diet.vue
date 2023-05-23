<script setup lang="ts">
import MealCard from 'components/meal-card.vue';
import Dashboard from 'components/dashboard.vue';

import { ref, onMounted } from 'vue';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

import { useSessionStore } from 'stores/session';
import { Diet } from 'types/diet';

const loading = ref(true);

const session = useSessionStore();

const diet = ref<Diet>();

onMounted(async () => {
    loading.value = true;
    try{
        const dietRef = doc(getFirestore(), 'diets', session.user!.uid);

        const dietResponse = (await getDoc(dietRef)).data();

        diet.value = dietResponse as Diet;
    } catch (err) {
        console.log(err);
    } finally {
        loading.value = false;
    }
});


</script>

<template>
    <q-page class="column q-pa-md">
        <div
            v-if="loading"
            class="full-height full-width row justify-center align-center"
        >
            <q-spinner
                size="50px"
                color="accent"
            />
        </div>
        <div v-else>
            <dashboard />
            <meal-card
                v-for="meal in diet!.meals"
                :key="meal.nameOfMeal"
                :name-of-meal="meal.nameOfMeal"
                :foods="meal.food"
                :macros="meal.macros"
                :hour="meal.hour"
            />
        </div>
    </q-page>
</template>
