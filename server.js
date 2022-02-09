// require('dotenv').config();
// "type":"module"을 통해 import를 통해 가져올수 있음
// const mongoose = require('mongoose');
// import dotenv from 'dotenv';
import express from 'express';
import lectureRoutes from './routes/lectureRoutes.js';
import userRoutes from './routes/userRoutes.js';
import changeRoutes from './routes/changeRoutes.js';

// var i = 0;
// var ls = [];
// var jSessionId;

// async function index() {
//     await fetch('https://kuis.konkuk.ac.kr/index.do', {
//         headers: {
//             accept: '*/*',
//             'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
//             'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//             'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
//             'sec-ch-ua-mobile': '?0',
//             'sec-ch-ua-platform': '"Windows"',
//             'sec-fetch-dest': 'empty',
//             'sec-fetch-mode': 'cors',
//             'sec-fetch-site': 'same-origin',
//             'x-requested-with': 'XMLHttpRequest',
//             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
//         },
//         method: 'GET',
//     })
//         .then((res) => {
//             console.log('index');
//             var cookie = res.headers.get('set-cookie');
//             jSessionId = cookie.split('JSESSIONID=')[1].split(';')[0];
//             console.log(jSessionId);
//         })
//         .then(() => (i = 1))
//         .then(() => console.log(i));
// }

// async function index2() {
//     await fetch('https://kuis.konkuk.ac.kr/index.do', {
//         headers: {
//             accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//             'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ny;q=0.6',
//             'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
//             'sec-ch-ua-mobile': '?0',
//             'sec-ch-ua-platform': '"macOS"',
//             'sec-fetch-dest': 'document',
//             'sec-fetch-mode': 'navigate',
//             'sec-fetch-site': 'same-origin',
//             'upgrade-insecure-requests': '1',
//             cookie: `Login=; UTF8_Option=0; WMONID=gqaHire_6oa; UI=; APRUI=; KMS=; JSESSIONID=${jSessionId}; LoginCookie=294716365834294713062947178824253758178829475340370353170607341128144528254245280931110745282542452809312814163658343411200420043703071007103266178807100734093117880710254216721788071009310710; o365Login=`,
//             Referer: 'https://kuis.konkuk.ac.kr/',
//             'Referrer-Policy': 'strict-origin-when-cross-origin',
//         },
//         body: null,
//         method: 'GET',
//     }).then((res) => console.log('index2'));
// }

// async function login() {
//     await fetch('https://kuis.konkuk.ac.kr/Login/login.do', {
//         headers: {
//             accept: '*/*',
//             'accept-language': 'ko-KR,ko;q=0.9',
//             'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//             'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
//             'sec-ch-ua-mobile': '?0',
//             'sec-ch-ua-platform': '"macOS"',
//             'sec-fetch-dest': 'empty',
//             'sec-fetch-mode': 'cors',
//             'sec-fetch-site': 'same-origin',
//             'x-requested-with': 'XMLHttpRequest',
//             cookie: `Login=; UTF8_Option=0; LoginCookie=294716365834294713062947178824253758178829475340370353170607341128144528254245280931110745282542452809312814163658343411200420043703071007103266178807100734093117880710254216721788071009310710; WMONID=QGiVRZxoBiX; JSESSIONID=${jSessionId}`,
//             Referer: 'https://kuis.konkuk.ac.kr/index.do',
//             'Referrer-Policy': 'strict-origin-when-cross-origin',
//             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
//         },
//         body: 'Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&%40d1%23SINGLE_ID=gb0409&%40d1%23PWD=0409bong%40%40&%40d1%23default.locale=ko&%40d%23=%40d1%23&%40d1%23=dsParam&%40d1%23tp=dm&',
//         method: 'POST',
//     })
//         .then((res) => console.log('login'))
//         .then(() => (i = 2))
//         .then(() => console.log(i));
// }

// async function find() {
//     await fetch('https://kuis.konkuk.ac.kr/CourTotalTimetableInq/find.do', {
//         headers: {
//             accept: '*/*',
//             'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ny;q=0.6',
//             'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//             'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
//             'sec-ch-ua-mobile': '?0',
//             'sec-ch-ua-platform': '"macOS"',
//             'sec-fetch-dest': 'empty',
//             'sec-fetch-mode': 'cors',
//             'sec-fetch-site': 'same-origin',
//             'x-requested-with': 'XMLHttpRequest',
//             cookie: `Login=; UTF8_Option=0; WMONID=gqaHire_6oa; UI=; APRUI=; KMS=; JSESSIONID=${jSessionId}; LoginCookie=294716365834294713062947178824253758178829475340370353170607341128144528254245280931110745282542452809312814163658343411200420043703071007103266178807100734093117880710254216721788071009310710`,
//             Referer: 'https://kuis.konkuk.ac.kr/index.do',
//             'Referrer-Policy': 'strict-origin-when-cross-origin',
//         },
//         body: 'Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=&%40d1%23pobtDiv=B0404P&%40d1%23sbjtId=&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&',
//         method: 'POST',
//     })
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(res);
//         });
// }

// index();
// setTimeout(function () {
//     login();
// }, 1000);
// setTimeout(function () {
//     index2();
// }, 3000);
// setTimeout(function () {
//     find();
// }, 6000);

const app = express();

// dotenv.config();
// 미들웨어 -> 순서대로 수행
app.use(express.json());

app.post('/init', changeRoutes);

app.post('/change', changeRoutes);

app.post('/click', lectureRoutes);

app.post('/signup', userRoutes);

app.post('/login', userRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
