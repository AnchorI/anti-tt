import express from 'express';

const app = express();
const port = 7777;

app.get('/', (req, res) => { res.send('Hello World') })
app.get('/aftermath', (req, res) => { res.send('One Love') })
app.get('/taburetka', (req, res) => { res.send('Bad World') })
app.get('/test', (req, res) => { res.send('test') })


app.listen(port, err => {
        if (err) {
            return console.error(err);
        }
        return console.log(`server is listening on ${port}`);
    }
);