/* eslint-disable camelcase */
import openai from '../utils/openai';
import * as admin from 'firebase-admin';


const db = admin.firestore();


export async function getChatResponse (userId: string) {
    const messagesRef = db.collection('users').doc(userId).collection('messages');

    const last5Docs = await messagesRef.orderBy('timestamp', 'desc').limit(5).get();

    const last5Messages = last5Docs.docs.map(doc => doc.data());

    const last5Texts = last5Messages.map(message => `${message.name}:${message.text[0]}`);


    console.log(last5Texts);


    const chat = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'system', content: 'Voce é o melhor coach fitness do mundo chamado Carter'},
            {role: 'user', content: `Voce é o melhor coach fitness do mundo chamado Carter essas foram as ultimas 5 mensagens no nosso chat: ${last5Texts.reverse()}, responda brevemente a ultima mensagem`},
        ],
        temperature: 0.5,
        max_tokens: 1000,
    });

    const formatted = chat.data.choices[0]!.message!.content.replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');

    console.log(formatted);

    return formatted;
}
