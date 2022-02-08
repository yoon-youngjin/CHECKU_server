// require('dotenv').config();
// "type":"module"을 통해 import를 통해 가져올수 있음
// const mongoose = require('mongoose');
import dotenv from 'dotenv';
import express from 'express';
import lectureRoutes from './routes/lectureRoutes.js';
import userRoutes from './routes/userRoutes.js';
import changeRoutes from './routes/changeRoutes.js';
import fetch from 'node-fetch';

(async () => {
    await fetch('https://kuis.konkuk.ac.kr/Login/login.do', {
        headers: {
            accept: '*/*',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            cookie: 'WMONID=g65umB7KIJD; Login=; UTF8_Option=0; JSESSIONID=0002-Sdin_ZdWYrflfqJAByBkGj:1CAUM7FB34; LoginCookie=; UI=; APRUI=; KMS=',
            Referer: 'https://kuis.konkuk.ac.kr/index.do',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: 'Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&%40d1%23SINGLE_ID=dudwls143&%40d1%23PWD=%40dudwlsdl12&%40d1%23default.locale=ko&%40d%23=%40d1%23&%40d1%23=dsParam&%40d1%23tp=dm&',
        method: 'POST',
    })
        .then((e) => e.json())
        .then((e) => console.log(e));
    // .then((e) => console.log(e));

    // await fetch('https://kuis.konkuk.ac.kr/CourTotalTimetableInq/find.do', {
    //     headers: {
    //         accept: '*/*',
    //         'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'same-origin',
    //         'x-requested-with': 'XMLHttpRequest',
    //         cookie: 'WMONID=g65umB7KIJD; Login=; UTF8_Option=0; LoginCookie=2947163658342947130629471788242537581788294753403703531706073115130631154096233153170710254207341107200431151306311540962331531731152331071000503703071007100050178807105622093117880050005009311788071016723266; JSESSIONID=0001-Sdin_ZdWYrflfqJAByBkGj:1CAUM7FB34',
    //         Referer: 'https://kuis.konkuk.ac.kr/index.do',
    //         'Referrer-Policy': 'strict-origin-when-cross-origin',
    //     },
    //     body: 'Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=105291&%40d1%23pobtDiv=&%40d1%23sbjtId=&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&',
    //     method: 'POST',
    // });
})();
dotenv.config();
const app = express();
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
