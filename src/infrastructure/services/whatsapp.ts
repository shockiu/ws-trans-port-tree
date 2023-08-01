import EventEmitter from 'events';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

export class WsTransporter extends Client {
    private statusWS: boolean = false;
    public eventWsStatus: EventEmitter= new EventEmitter()

    constructor() {
        super({
            authStrategy: new LocalAuth(),
            restartOnAuthFail:true,
            puppeteer: {
                headless:  true,
                args: ['--no-sandbox', '--non-headless']
            }
        })
        console.log("Iniciando....");
        this.eventWsStatus.emit('ws-status', this.statusWS);

        this.initialize();

        this.on("ready", () => {
            this.statusWS = true
            this.eventWsStatus.emit('ws-status', this.statusWS);
            console.log("LOGIN_SUCCESS");
        });
      
        this.on("auth_failure", () => {
            this.statusWS = false;
            this.eventWsStatus.emit('ws-status', this.statusWS);
            console.log("LOGIN_FAIL");
        });

        this.on("qr", (qr) => {
            console.log('QR RECEIVED');
            qrcode.generate(qr, { small: true })
        });

        this.on('disconnected', async() => {
            this.statusWS = false;
            this.eventWsStatus.emit('ws-status', this.statusWS);
            console.log('DISCONNECTED');
            try {
                await this.destroy();
                await this.initialize()
            } catch (error) {
                console.log(error)
            }
        })
    }

    async sendMsg(data: { message: string, phone: string }): Promise<any> {
        try {
            if (!this.statusWS) return Promise.resolve({ error: "WAIT_LOGIN" });
            const { message, phone } = data;
            const response = await this.sendMessage(`${phone}@c.us`, message);
            return { id: response.id.id };
        } catch (error: any) {
            return Promise.resolve({ error: error.message });
        }
    }

    getStatus(): boolean {
        return this.statusWS; 
    }

}