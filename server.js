import express from 'express';

const app = express()

app.get('/user/:ids/:name', function (req, res) {
    // req.params是动态匹配到的
    console.log(req.params);
    res.send(req.params);
})

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(80, () => {
    console.log('server running at http://127.0.0.1/');
})

// app.use(express.static('public'))