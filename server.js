const express = require('express');
const sugangRouter = require('./routers/sugangRouter.js');
const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const secrets = require('./secrets.json');
const singleId = secrets.single_id;
const pwd = secrets.pwd;
sugangRouter(app);

(async () => {
    
    let jSessionId;
    let WMONID;

    await fetch('https://sugang.konkuk.ac.kr/sugang/', {
        headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            Referer: `https://sugang.konkuk.ac.kr/sugang/login?attribute=logOut&fake=${new Date().getTime()}`,
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: null,
        method: 'GET',
    })
        .then((e) => {
            var cookie = e.headers.get('set-cookie');
            jSessionId = cookie.split('JSUGANGSESSIONID=')[1].split(';')[0];
            WMONID = cookie.split(';')[0].split('=')[1];
        })
        .catch((e) => console.log(e));

    await fetch(`https://sugang.konkuk.ac.kr/sugang/login?attribute=loginChk&fake=${new Date().getTime()}`, {
        headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID}; JSUGANGSESSIONID=${jSessionId}; my-application-browser-tab={"guid":"47bab0b4-ce73-5b51-c964-07a0decfce72","timestamp":${new Date().getTime()}}`,
            Referer: 'https://sugang.konkuk.ac.kr/sugang/login',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: `stdNo=${singleId}&pwd=${pwd}&campFg=1&idPassGubun=1&lang=ko`,
        method: 'POST',
    }).then(async () => {
        await fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=lectList&fake=${new Date().getTime()}`, {
            headers: {
                accept: 'application/json, text/javascript, */*; q=0.01',
                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-requested-with': 'XMLHttpRequest',
                cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID}; Login=; JSUGANGSESSIONID=${jSessionId}; UTF8_Option=0; LoginCookie=2947163658342947130629471788242537581788294753403703531706073115130631154096233153170710254207341107200431151306311540962331531731152331071000503703005000500050178807104528460517880050254209311788071032661672; my-application-browser-tab={"guid":"19f1eea7-b249-be1c-fae8-4919716fb76b","timestamp":1645678523166}`,
                Referer: 'https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=1645678260334',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
            body: 'pPobt=B04045&pSearchGb=1&pUniv=103041&pSustMjCd=103041&pLang=&pKind=&pSearchKind=2&pSearchNm=3226',
            method: 'POST',
        })
            .then((e) => e.json())
            .then((e) => console.log(e));
    });
})();

const port = 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});
