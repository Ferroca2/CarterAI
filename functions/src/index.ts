import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const setDiet = functions.https.onRequest(
    (...args) => import('./diet')
        .then(async m => { await m.default(...args); })
);

export const getChatResponse = functions.https.onRequest(
    (...args) => import('./chat')
        .then(async m => { await m.default(...args); })
);

export const setTraining = functions.https.onRequest(
    (...args) => import('./training')
        .then(async m => { await m.default(...args); })
);
