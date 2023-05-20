import { Request, Response } from 'firebase-functions';
import { getTrainingCompletion } from './getTrainingCompletion';

export default async function getTraining(req: Request, res: Response) {
    if (req.method.toUpperCase() !== 'GET') {
        return res.status(405).json({
            message: 'Método não permitido',
        });
    }

    if (req.query.batch) {
        return res.status(422).json({
            message: 'Requisições em lote não suportadas',
        });
    }

    return res.json(await getTrainingCompletion());
}
