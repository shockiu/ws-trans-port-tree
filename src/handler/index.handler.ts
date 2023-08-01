import { jobWS } from './ws.handler'; 
import container from '../infrastructure/ioc';

const wsTransporter =  container.get('ws.tranporter');
export const runningJobs= async () => {
    wsTransporter.eventWsStatus.on('ws-status', (event: boolean) => {
        if (event) jobWS.start();
        else jobWS.stop();
    });
} 