import { initializeApp } from 'firebase/app';
import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(() => {
    initializeApp({
        apiKey: 'AIzaSyCsSXb2Po8-QSoMg8cVWSBB3viLIDFpezo',
        authDomain: 'carterai.firebaseapp.com',
        projectId: 'carterai',
        storageBucket: 'carterai.appspot.com',
        messagingSenderId: '920738429096',
        appId: '1:920738429096:web:b7304c6755b585ed78aa9d',
        measurementId: 'G-QXE47XN6WG',
    });
});
