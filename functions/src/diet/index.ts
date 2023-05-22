import { Request, Response } from 'firebase-functions';
import { getTrainingCompletion } from './getTrainingCompletion';
import * as admin from 'firebase-admin';

const db = admin.firestore();

interface DietResponse {
    totalCalories: string;
    meals: {
        nameOfMeal: string;
        food: string[];
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

    const userId = req.body.userId;

    console.log('ferroca');

    try{
        console.log('ferroca2');
        const diet: DietResponse = await getTrainingCompletion();
        console.log(diet);

        const dietRef = db.collection('diets').doc(userId);

        await dietRef.set(diet);

        return res.status(200).json({ message: 'Dieta gerada com sucesso', diet });

    } catch(err) {
        console.log('ferroca3');
        return res.status(500).json({
            message: 'Erro ao gerar dieta',
        });
    }
}
