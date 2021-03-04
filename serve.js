const http = require('http')
const WebSocket = require('ws')
const server = http.createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', ws => {
    ws.on('message', message => {
        wss.clients.forEach(client => {
            if (client != ws) {
                client.send(message)
            }
        })
    })
    ws.on('close', () => {
        console.log('close')
        wss.clients.forEach(client => {
                client.send(JSON.stringify({ state: 'closeBrowser', message: null }))
        })
    })
})
const PORT = process.env.PORT || 4804
server.listen(PORT)