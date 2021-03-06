const sugangService = require('../services/sugangService.js');
const { logger } = require('../config/winston');
const e = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const secrets = require('../secrets.json');

const singleId = secrets.single_id;
const pwd = secrets.pwd;

exports.plzRegister = async function (req, res) {
    let sbj_num = req.body.sbj_num;
    // let sbj_num = ['3185', '3186'];
    logger.info('POST: /register, BODY: ' + sbj_num);
    try {
        let result = await sugangService.register(sbj_num);

        return res.status(200).send();
    } catch (e) {
        return res.status(404).send();
    }
};

exports.getSubjects = async function (req, res) {
    logger.info('GET: /subjects, QUERY: ' + JSON.stringify(req.query));
    let departmentId = req.query.departmentId;
    let type = req.query.type;
    let grade = req.query.grade;
    if (!departmentId) {
        departmentId = '';
    }
    if (!type) {
        type = '';
    }
    if (!grade) {
        grade = ['1', '2', '3', '4', '9'];
    }
    try {
        const result = await sugangService.getSubjects(departmentId, type, grade);
        return res.status(200).send(JSON.stringify(result));
    } catch (e) {
        return res.status(404).send();
    }
};

exports.getSubjects = async function (req, res) {
    logger.info('GET: /subjects, QUERY: ' + JSON.stringify(req.query));
    let departmentId = req.query.departmentId;
    let type = req.query.type;
    let grade = req.query.grade;
    if (!departmentId) {
        departmentId = '';
    }
    if (!type) {
        type = '';
    }
    if (!grade) {
        grade = ['1', '2', '3', '4', '9'];
    }
    try {
        const result = await sugangService.getSubjects(departmentId, type, grade);
        return res.status(200).send(JSON.stringify(result));
    } catch (e) {
        return res.status(404).send();
    }
};

exports.getSubject = async function (req, res) {
    logger.info('GET: /subject/, Params: ' + req.params.subjectId);
    const subjectId = req.params.subjectId;
    try {
        const result = await sugangService.getSubject(subjectId);
        return res.status(200).send(JSON.stringify(result));
    } catch (e) {
        return res.status(404).send();
    }
};

exports.getMySubjectList = async function (req, res) {
    logger.info('POST: /subjects, : ' + JSON.stringify(req.body));
    const mySubjectList = req.body.sbj_num;
    try {
        const result = await sugangService.getMySubjectList(mySubjectList);
        return res.status(200).send(JSON.stringify(result));
    } catch (e) {
        return res.status(404).send();
    }
};

let map = new Map();
exports.startMonitoring = async (req, res) => {
    const post = req.body;
    console.log(post.checked);
    switch (post.checked) {
        case 'true':
            (async () => {
                map.set(post.subject_num, lodash.cloneDeep(monitor));
                map.get(post.subject_num).startCrawling(post, res);
            })().catch((e) => console.log(e));
            break;
        case 'false':
            (async function stop() {
                map.get(post.subject_num).cancel_check = false;
            })().catch((e) => console.log(e));
            break;
    }
};

let monitor = {
    count: 0,
    cancel_check: true,
    startCrawling: async function (post, res) {
        while (true) {
            // ???????????? ?????? ??????
            if (this.count === 10) {
                res.status(200).send('im out');
                this.count = 0;
                return;
            }
            // ???????????? ?????? ??????
            if (this.cancel_check == false) {
                res.status(200).send(post.subject_num);
                return;
            }

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
            })
                .then((res) => {
                    var cookie = res.headers.get('set-cookie');
                    jSessionId = cookie.split('JSESSIONID=')[1].split(';')[0];
                })
                .catch((e) => console.log(e));

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
            })
                .then(async () => {
                    await fetch('https://kuis.konkuk.ac.kr/CourTotalTimetableInq/find.do', {
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
                            cookie: `WMONID=MW_vHzajhWZ; JSESSIONID=${jSessionId}`,
                            Referer: 'https://kuis.konkuk.ac.kr/index.do',
                            'Referrer-Policy': 'strict-origin-when-cross-origin',
                        },
                        body: `Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=&%40d1%23pobtDiv=&%40d1%23sbjtId=${post.subject_num}&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&`,
                        method: 'POST',
                    })
                        .then((e) => e.json())
                        .then((e) => {
                            let subjectInfo = e.DS_SUSTTIMETABLE[0];
                            console.log(subjectInfo.TLSN);
                            this.count++;
                        })
                        .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
        }
    },
};
