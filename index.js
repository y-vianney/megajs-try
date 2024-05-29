const bodyParser = require('body-parser');
const Express = require('express');
const getVideos = require('./mega');


const app = Express();
const port = 1234;

app.use(bodyParser.json());

app.get('/', (req, res) => { res.json({ message: 'Hello World!' }); });
app.get('/videos', async (req, res) => getVideos(req, res));

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
