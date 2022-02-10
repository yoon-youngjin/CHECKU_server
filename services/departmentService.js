const res = require('express/lib/response');
const Subject = require('../models/subject.js');
const secrets = require('../secrets.json');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const singleId = secrets.single_id;
const pwd = secrets.pwd;

var jSessionId;

async function index() {
    await fetch('https://kuis.konkuk.ac.kr/index.do', {
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
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
        },
        method: 'GET',
    }).then((res) => {
        var cookie = res.headers.get('set-cookie');
        jSessionId = cookie.split('JSESSIONID=')[1].split(';')[0];
    });
}

async function login() {
    await fetch('https://kuis.konkuk.ac.kr/Login/login.do', {
        headers: {
            accept: '*/*',
            'accept-language': 'ko-KR,ko;q=0.9',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            cookie: `Login=; UTF8_Option=0; LoginCookie=294716365834294713062947178824253758178829475340370353170607341128144528254245280931110745282542452809312814163658343411200420043703071007103266178807100734093117880710254216721788071009310710; WMONID=QGiVRZxoBiX; JSESSIONID=${jSessionId}`,
            Referer: 'https://kuis.konkuk.ac.kr/index.do',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
        },
        body: `Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&%40d1%23SINGLE_ID=${singleId}&%40d1%23PWD=${pwd}&%40d1%23default.locale=ko&%40d%23=%40d1%23&%40d1%23=dsParam&%40d1%23tp=dm&`,
        method: 'POST',
    });
}

async function find(departmentId) {
    await fetch('https://kuis.konkuk.ac.kr/CourTotalTimetableInq/find.do', {
        headers: {
            accept: '*/*',
            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ny;q=0.6',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            cookie: `WMONID=MW_vHzajhWZ; JSESSIONID=${jSessionId}`,
            Referer: 'https://kuis.konkuk.ac.kr/index.do',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36',
        },
        body: `Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=${departmentId}&%40d1%23pobtDiv=&%40d1%23sbjtId=&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&`,
        method: 'POST',
    })
        .then((res) => res.json())
        .then(async (res) => {
            const subjects = await Promise.all(
                res.DS_SUSTTIMETABLE.map(async (subjectInfo) => {
                    const subject = Subject.Builder.setId(subjectInfo.SBJT_ID)
                        .setName(subjectInfo.KOR_NM)
                        .setProfessor(subjectInfo.TYPL_KOR_NM)
                        .setRoom(subjectInfo.ROOM_NM)
                        .setType(subjectInfo.POBT_DIV_NM)
                        .setInwon(subjectInfo.TLSN)
                        .setGrade(subjectInfo.OPEN_SHYR)
                        .setDetail(subjectInfo.REMK)
                        .build();
                    return subject;
                })
            );
            // console.log(subjects);
            return subjects;
        });
}

exports.getSubjects = async function (departmentId) {
    console.time('getSubjects');
    await index()
        .then(async () => await login())
        .then(async () => {
            const result = await find(departmentId);
            console.log(result);
            console.timeEnd('getSubjects');
            return result;
        });
};
