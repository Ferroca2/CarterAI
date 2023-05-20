/* eslint-disable camelcase */
import openai from '../../utils/openai';


export async function getTrainingCompletion () {
    const texts = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Resuma a notícia presente no seguinte site colocando uma headline e o resumo dando um output no formato json seguinte: {"headline": "string", "resume": "string"} não se esqueça de colocar as aspas duplas no json e sem colocar ponto final no começo das frases`,
        temperature: 0.7,
        max_tokens: 1000,
    });

    // if(resume.data.choices[0]!.text![0] === '.') {
    //     formatted = resume.data.choices[0]!.text!.slice(1).replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');
    // } else {
    //     formatted = resume.data.choices[0]!.text!.replace(/[\r\n]/gm, '').trim().replace(/\\/gm, '');
    // }

    return texts;
}
