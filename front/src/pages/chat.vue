<script setup lang="ts">

</script>

<template>
    <q-page class="q-pa-md">
        <q-infinite-scroll
            reverse
            class="full-height"
        >
            <q-chat-message
                name="me"
                :text="['hey, how are you?']"
                sent
            />
            <q-chat-message
                name="Carter"
                bg-color="accent"
                :text="['doing fine, how r you?']"
            />
        </q-infinite-scroll>
    </q-page>
</template>
