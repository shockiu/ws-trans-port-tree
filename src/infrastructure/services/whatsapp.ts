import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

export class WsTransporter extends Client {
    private statusWS: boolean =  false;

    constructor() {
        super({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless:  true,
                args: ['--no-sandbox', '--non-headless']
            }
        })
        console.log("Iniciando....");
        
        this.initialize();

        this.on("ready", () => {
            this.statusWS = true;
            console.log("LOGIN_SUCCESS");
        });
      
        this.on("auth_failure", () => {
            this.statusWS = false;
            console.log("LOGIN_FAIL");
        });

        this.on("qr", (qr) => {
            console.log('QR RECEIVED');
            qrcode.generate(qr, { small: true })
        });

        this.on('disconnected', () => {
            this.statusWS = false;
            console.log('DISCONNECTED');
        })
    }

    async sendMsg(data: { message: string, phone: string }): Promise<any> {
        try {
            if (!this.statusWS) return Promise.resolve({ error: "WAIT_LOGIN" });
            const { message, phone } = data;
            const response = await this.sendMessage(`@c.us`, message);
            return { id: response.id.id };
        } catch (error: any) {
            return Promise.resolve({ error: error.message });
        }
    }

    getStatus(): boolean {
        return this.statusWS; 
    }

}