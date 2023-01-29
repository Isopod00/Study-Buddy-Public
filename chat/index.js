const {WebSocketServer} = require('ws');

const wss = new WebSocketServer({
    port: 8001
});

// DO NOT SHARE THIS DO NOT SHARE THIS -- also see chatgpt.py
const API_KEY = "ENTER_YOUR_KEY_HERE";

const chatgpt = async (prompt) => {
    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
        apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.6,
        max_tokens: 1024
    });
    console.log(completion.data.choices);

    return completion.data.choices[0].text;
};

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        data = JSON.parse(data.toString('utf-8'));
        if (data.setid) {
            ws.id = data.setid;
        }
        if (data.setname) {
            ws.name = data.setname;
        }
        if (data.message) {
            const clientsInRoom = Array.from(wss.clients).filter((i) => i.id === ws.id);
            clientsInRoom.forEach((i) => i.send(JSON.stringify({
                name: ws.name,
                message: data.message
            })));
            if (clientsInRoom.length === 1) {
                setTimeout(() => {
                    const prompt = [
                        "Act like a tutor.",
                        `Question: ${data.message}`,
                        "Answer:"
                    ].join('\n');
                    chatgpt(prompt).then((message) => {
                        ws.send(JSON.stringify({
                            name: 'Tutor',
                            message: message
                        }));
                    })
                }, 100);
            }
        }
    });
});
