import { CronJob } from 'cron';
import container from '../infrastructure/ioc';

const wsTransporter =  container.get('ws.tranporter');

export const jobWS = new CronJob('0 30 12 * * *', async () => {
	const d = new Date();
    const result = await wsTransporter.sendMsg({message: '🧐💊 Ya es hora, recuerda lo que tienes que hacer ❤.\nMamacita', phone: process.env['PHONE_NUMBER']})
    console.log(result)
    if ( result.id ) console.log('Mensaje de las 12:30 enviado', d);
}, null, true, 'America/Caracas');