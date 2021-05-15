import express from "express";
import path from 'path';

const app = express();


app.set('port', process.env.PORT || 3000);


app.get('/', (req, res) => {
    res.send('Hello, Express');
});

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, "../static/test.html"));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '에서 server 응답 대기중');
});