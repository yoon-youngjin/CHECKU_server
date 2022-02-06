// route안에 들어가는 수행내용이 복잡해질 경우를 대비해서
// controller를 통해 제어
import Subject from '../models/subjectModel.js';
import mongo from 'mongodb';
const mongoClient = mongo.MongoClient;

import lodash from 'lodash';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
let count = 0;
let time = 2000;
let map = new Map();

export const lectureController = (req, res) => {
    const post = req.body;
    console.log(post.checked);

    switch (post.checked) {
        case 'true':
            (async () => {
                map.set(post.subject_num, lodash.cloneDeep(monitor));
                map.get(post.subject_num).startCrawling(post, res);
            })();
            break;
        case 'false':
            (async function stop() {
                map.get(post.subject_num).cancel_check = false;
            })();
            break;
    }

    // const newSubject = new Subject({
    //     title: req.body.sub_title,
    //     professor_name: req.body.pro_name,
    //     total_num: req.body.total_num,
    //     current_num: req.body.current_num,
    //     subject_num: req.body.subject_num,
    // });

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

let monitor = {
    check: 0,
    cancel_check: true,
    startCrawling: async function (post, res) {
        while (true) {
            // 모니터링 종료 부분
            if (count === 10) {
                console.log(count);
                res.status(200).send('im out');
                return;
            }
            // 모니터링 취소 부분
            if (this.cancel_check == false) {
                res.status(200).send(post.subject_num);
                return;
            }

            await fetch(`https://sugang.konkuk.ac.kr/sugang/login?attribute=loginChk&fake=${new Date().getTime()}`, {
                headers: {
                    accept: 'application/json, text/javascript, */*; q=0.01',
                    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                },
                referrer: 'https://sugang.konkuk.ac.kr/sugang/login',
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: 'stdNo=gb0409&pwd=0409bong%40%40&campFg=1&idPassGubun=1&lang=ko',
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
            })
                .then((res) => res.headers.get('set-cookie'))
                .then((e) => e.split('JSESSIONID=')[1].split(';')[0])
                .then((e) => {
                    fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=${post.subject_num}&gbn=S&fake=${new Date().getTime()}`, {
                        headers: {
                            accept: 'application/json, text/javascript, */*; q=0.01',
                            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                            'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-platform': '"Windows"',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-origin',
                            'x-requested-with': 'XMLHttpRequest',
                            cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; JSESSIONID=${e}; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":${new Date().getTime()}}`,
                            Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
                            'Referrer-Policy': 'strict-origin-when-cross-origin',
                        },
                        body: null,
                        method: 'POST',
                    })
                        .then((e) => e.json())
                        .then((e) => {
                            count++;
                            console.log(e.rows[0].inwon_all);
                            console.log(this.cancel_check);
                        });
                });
        }
    },
};
