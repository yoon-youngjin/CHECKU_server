// route안에 들어가는 수행내용이 복잡해질 경우를 대비해서
// controller를 통해 제어
import User from '../models/userModel.js';
import mongo from 'mongodb';
const mongoClient = mongo.MongoClient;
import dotenv from 'dotenv';
dotenv.config();

export const userSignupController = (req, res) => {
    mongoClient.connect(process.env.MONGODB_URL, (err, db) => {
        if (err) {
            console.log('Error....');
        } else {
            const mydb = db.db('testCluster');
            const collection = mydb.collection('myTable');

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            console.log(newUser);

            const query = { email: newUser.email };

            collection.findOne(query, (err, result) => {
                if (result == null) {
                    collection.insertOne(newUser, (err, result) => {
                        res.status(200).send();
                    });
                } else {
                    res.status(400).send();
                }
            });
        }
    });
};
export const userSigninController = (req, res) => {
    mongoClient.connect(process.env.MONGODB_URL, (err, db) => {
        if (err) {
            console.log('Error....');
        } else {
            const mydb = db.db('testCluster');
            const collection = mydb.collection('myTable');
            const query = { email: req.body.email, password: req.body.password };

            collection.findOne(query, (err, result) => {
                if (result != null) {
                    const objToSend = {
                        name: result.name,
                        email: result.email,
                    };
                    res.status(200).send(JSON.stringify(objToSend));
                } else {
                    res.status(404).send();
                }
            });
        }
    });
};
