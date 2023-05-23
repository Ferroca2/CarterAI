import { Request, Response } from 'firebase-functions';
import { getChatResponse } from './getChatResponse';
import * as admin from 'firebase-admin';

const db = admin.firestore();


export default async function getTraining(req: Request, res: Response) {
    if (req.method.toUpperCase() !== 'POST') {
        return res.status(405).json({
            message: 'Método não permitido',
        });
    }

    if (req.query.batch) {
        return res.status(422).json({
            message: 'Requisições em lote não suportadas',
        });
    }

    const userId = req.body.body.userId;

    try{
        const chatResponse = await getChatResponse(userId);

        const messagesRef = db.collection('users').doc(userId).collection('messages');

        await messagesRef.add({name: 'Carter', text: [chatResponse], timestamp: Date.now()});

        return res.status(200).json({name: 'Carter', text: [chatResponse], timestamp: Date.now()});

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: 'Erro ao gerar dieta',
        });
    }
}
