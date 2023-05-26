/* eslint-disable camelcase */
import openai from '../utils/openai';

const prompt = `Me de uma dieta personalizada para mim, eu tenho 1.80 de altura, 80kg, 20 anos, quero ganhar massa muscular,
 e tenho intolerância a lactose. forneça a resposta no formato
 JSON={
    "totalCalories": string,
    meals=[{"hour": string, "nameOfMeal": string, "food":string[], "macros": {"protein": string, "carbs": string, "fat": string}}]
 }, lembre-se de colocar a gramatura das comidas e o nome das comidas
 SEM ESPAÇOS E SEM QUEBRA DE LINHA E TAMBEM SEM CONTRA BARRA, não deve haver nenhum caracter especial(MUITO IMPORTANTE)`;


export async function getDietCompletion () {
    const texts = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: 'system', content: 'You are a helpful personal coach'},
            {role: 'user', content: prompt},
        ],
        temperature: 0.5,
        max_tokens: 1000,
    });

    // if(resume.data.choices[0]!.text![0] === '.') {
    //     formatted = resume.data.choices[0]!.text!.slice(1).replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');
    // } else {
    //     formatted = resume.data.choices[0]!.text!.replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');
    // }
    const formatted = texts.data.choices[0]!.message!.content.replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');

    return JSON.parse(formatted);
}
