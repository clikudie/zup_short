const express = require('express');
const debug = require('debug');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

//services
const urlService = require('./src/services/urlService');

// routers
const urlRouter = require('./src/routers/urlRouter');

//middlewares
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/url', urlRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { hash: null });
});

app.get('/:hash', async (req, res) => {
    const originalURL = await urlService.findOriginalURL(req.params.hash);
    res.redirect(originalURL);
});

app.listen(PORT, () => {
    debug(`Server running on ${PORT}`);
});