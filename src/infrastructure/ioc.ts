import { ContainerBuilder } from 'node-dependency-injection';
import { WsTransporter } from './services/whatsapp';

const container = new ContainerBuilder();


container.register('ws.tranporter', WsTransporter);

export default container;