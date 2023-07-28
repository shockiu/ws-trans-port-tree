import { Router } from 'express';
import container from '../infrastructure/ioc';

const router = Router();
const wsTransporter =  container.get('ws.tranporter');

router.get('/health', (req, res) => {
    res.status(200).send({
        status: wsTransporter.getStatus()
    });
});

router.get('/logout/ws-transpport', (req, res) =>{
    //wsTransporter.logout();
    res.status(200).send({
        status: wsTransporter.getStatus()
    })
})

export default router;