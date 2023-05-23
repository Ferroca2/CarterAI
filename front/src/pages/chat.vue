<script setup lang="ts">
import { addDoc, collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { useSessionStore } from 'stores/session';
import { chatApi } from 'boot/axios';

interface MessagesResponse {
    name?: string;
    text?: string[];
    timestamp?: number
}

const text = ref<string>('');

const loadingPagination = ref(false);

const session = useSessionStore();

const items = ref<MessagesResponse[]>([]);

const messageLoading = ref(false);

onMounted(async () => {
    loadingPagination.value = true;
    try{
        const messagesRef = query(collection(getFirestore(), `users/${session.user!.uid}/messages/`), orderBy('timestamp'));

        const messagesSnap = await getDocs(messagesRef);

        const messagesArray = messagesSnap.docs.map(doc => doc.data()) as MessagesResponse[];

        items.value = messagesArray;
    } catch (err) {
        console.log(err);
    } finally {
        loadingPagination.value = false;
    }
});

function onLoad (done: () => void) {
    loadingPagination.value = true;
    setTimeout(() => {
        items.value!.splice(0, 0, {name: 'Carter', text: ['hey']}, {name: 'me', text: ['hey, how are you?']});
        loadingPagination.value = false;
        done();
    }, 2000);
}

async function send () {
    messageLoading.value = true;
    try{
        const message = text.value;

        items.value.push({name: 'me', text: [message], timestamp: Date.now()});

        text.value = '';

        const messagesRef = collection(getFirestore(), `users/${session.user!.uid}/messages/`);

        await addDoc(messagesRef, {
            name: 'me', text: [message], timestamp: Date.now(),
        });

        const response = await chatApi.post('/', { body: { userId: session.user!.uid }});

        console.log(response);

        items.value.push(response.data);
    } catch (err) {
        console.log(err);
    } finally {
        messageLoading.value = false;
    }
}

</script>

<template>
    <q-page class="relative-position q-pa-md">
        <div class="wrapper absolute-bottom q-mb-xl q-pa-md">
            <q-infinite-scroll
                scroll-target="wrapper"
                reverse
                class="full-height"
            >
                <div
                    class="full-width row align-center justify-center"
                >
                    <q-btn
                        class="q-ma-md"
                        no-caps
                        color="accent"
                        :loading="loadingPagination"
                        @click="onLoad(()=>{})"
                    >
                        Carregar Mais
                        <template #loading>
                            <q-spinner
                                color="white"
                                size="1rem"
                            />
                        </template>
                    </q-btn>
                </div>
                <q-chat-message
                    v-for="(item, index) in items"
                    :key="index"
                    :name="item.name"
                    :text="item.text"
                    :sent="item.name === 'me'"
                    :bg-color="item.name === 'me' ? 'white' : 'accent'"
                />
                <q-chat-message
                    v-if="messageLoading"
                    name="Carter"
                    bg-color="accent"
                >
                    <q-spinner-dots size="2rem" />
                </q-chat-message>
            </q-infinite-scroll>
        </div>

        <q-input
            v-model="text"
            rounded
            outlined
            label="Fale com Carter"
            class="message-input absolute-bottom q-ma-md"
        >
            <template #append>
                <q-btn
                    round
                    dense
                    flat
                    icon="send"
                    color="accent"
                    class="q-ma-sm"
                    @click="send"
                />
            </template>
        </q-input>
    </q-page>
</template>


<style scoped lang="scss">
.wrapper{
    margin-bottom: 5rem;
    overflow: scroll;
    max-height: 100%;
    padding-top: 5rem;
}
</style>
