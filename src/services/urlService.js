const express = require('express');
const debug = require('debug');
const { MongoClient, ObjectId } = require('mongodb')

const mongoURL = 'mongodb+srv://dbUser:<password>@cluster0.cl7uc.mongodb.net?retryWrites=true&w=majority';
const dbName = 'zup';

function urlService() {
    function saveURLHash(url) {
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(mongoURL);
                const db = client.db(dbName);
                //TODO: check if hash already exists before inserting
                await db.collection('url').insertOne(url);
                return true;
            } catch (error) {
                debug(error);
                return false;
            }
        }());
    }

    async function findOriginalURL(hash) {
        let client;
        try {
            client = await MongoClient.connect(mongoURL);
            const db = client.db(dbName);
            const results = await db.collection('url').findOne({ hash: hash });
            return results.originalURL;
        } catch (error) {
            debug(error);
            return null;
        }
    }

    return { saveURLHash, findOriginalURL };
}

module.exports = urlService();