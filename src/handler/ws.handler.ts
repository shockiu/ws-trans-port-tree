import { CronJob } from 'cron';
import container from '../infrastructure/ioc';

const wsTransporter =  container.get('ws.tranporter');

export const jobWS = new CronJob('0 55 13 * * *', async () => {
	const d = new Date();
    const result = await wsTransporter.sendMsg({message: 'Mensaje automatizado - TEST', phone: process.env['PHONE_NUMBER']})
    console.log(result)
    if ( result.id ) console.log('Mensaje de las 11:18 AM enviado', d);
}, null, true, 'America/Caracas');