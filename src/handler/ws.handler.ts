import { CronJob } from 'cron';
import container from '../infrastructure/ioc';

const wsTransporter =  container.get('ws.tranporter');

export const job = new CronJob('*/10 * * * * *', async () => {
	const d = new Date();
	console.log('Send message every tenth seconds:', d);
    const result = await wsTransporter.sendMsg({message: 'Mensaje automatizado - TEST', phone: process.env['PHONE_NUMBER']})
    console.log(result)
});