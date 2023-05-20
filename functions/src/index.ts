import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const getTraining = functions.https.onRequest(
    (...args) => import('./training/getTraining')
        .then(async m => { await m.default(...args); })
);
