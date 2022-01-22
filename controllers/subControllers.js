// route안에 들어가는 수행내용이 복잡해질 경우를 대비해서
// controller를 통해 제어
import Subject from '../models/subjectModel.js';
import mongo from 'mongodb';
const mongoClient = mongo.MongoClient;
import dotenv from 'dotenv';
dotenv.config();

export const subController = (req, res) => {
    const post = req.body;

    console.log(post.pro_name);
    const newSubject = new Subject({
        title: req.body.sub_title,
        professor_name: req.body.pro_name,
        total_num: req.body.total_num,
        current_num: req.body.current_num,
        subject_num: req.body.subject_num,
    });

    res.status(200).send();

    // mongoClient.connect(process.env.MONGODB_URL, (err, db) => {
    //     if (err) {
    //         console.log('Error....');
    //     } else {
    //         const mydb = db.db('testCluster');
    //         const collection = mydb.collection('myTable');

    //         const newUser = new User({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: req.body.password,
    //         });

    //         console.log(newUser);

    //         const query = { email: newUser.email };

    //         collection.findOne(query, (err, result) => {
    //             if (result == null) {
    //                 collection.insertOne(newUser, (err, result) => {
    //                     res.status(200).send();
    //                 });
    //             } else {
    //                 res.status(400).send();
    //             }
    //         });
    //     }
    // });
};
