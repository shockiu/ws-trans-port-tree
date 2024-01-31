import { CronJob } from 'cron';
import container from '../infrastructure/ioc';

const wsTransporter =  container.get('ws.tranporter');

export const jobWS = new CronJob('00 30 13 * * *', async () => {
	const d = new Date();
    const result = await wsTransporter.sendMsg({message: '', phone: process.env['PHONE_NUMBER']})
    if ( result.id ) console.log('Mensaje de las 13:30 enviado', d);
}, null, true, 'America/Caracas');