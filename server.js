const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);


app.use(express.urlencoded({ extended: true })); // handle form data

let lastMessage = 'first'; // initial default message

app.get('/brew', (req, res) => {
    const drink = req.query.drink;

    if (drink === 'tea') {
        res.send('A delicious cup of tea!');
    } else if (drink === 'coffee') {
        res.sendStatus(418); // I'm a teapot
    } else {
        res.sendStatus(400); // Bad Request
    }
});

app.post('/pass-it-on', (req, res) => {
    const message = req.body.message;

    if (!message || message.trim() === '') {
        res.sendStatus(400); // Bad Request if missing or empty
        return;
    }

    const responseMessage = lastMessage; // store previous message to send back
    lastMessage = message; // update lastMessage with current one

    res.send(responseMessage);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
