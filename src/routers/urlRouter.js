const express = require('express');
const { Buffer } = require('buffer');

const urlService = require('../services/urlService');

const urlRouter = express.Router();

urlRouter.route('/').post((req, res) => {
    const { url } = req.body;
    const buf = Buffer.from(url, 'utf-8');
    const encodedURL = buf.toString('base64');
    const hash = encodedURL.substr(0, 6);
    const urlToSave = { originalURL: url, hash: hash };
    //TODO: do error checking here
    urlService.saveURLHash(urlToSave);
    const redirectURL = 'https://zup.com' + `/${hash}`
    res.render('index', { hash: redirectURL });
});

module.exports = urlRouter;