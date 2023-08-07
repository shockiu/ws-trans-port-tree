module.exports = {
    apps : [
        {
            name: "app-ws-message",
            script: "./dist/index.js",
            logs: ['/home/ubuntu/logs/api-ws.log'],
            env: {
                NODE_ENV: "development",
                PORT_API: 8000,
                PHONE_NUMBER: 584261145862
            }
        }
    ]
}