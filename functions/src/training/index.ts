import { Request, Response } from 'firebase-functions';
import { getTrainingCompletion } from './getTrainingCompletion';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface TrainingResponse {
    totalCalories: string;
    typeOfDivision: string;
    trainings: {
        day: string;
        exercises: string[];
    }[];
}

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
        const training: TrainingResponse = await getTrainingCompletion();

        const trainingRef = db.collection('trainings').doc(userId);

        await trainingRef.set(training, { merge: true });

        return res.status(200).json({ message: 'Dieta gerada com sucesso', training });

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: 'Erro ao gerar dieta',
        });
    }
}
