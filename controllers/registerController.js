const { logger } = require('../config/winston');
const e = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const secrets = require('../secrets.json');
const singleId = secrets.single_id;
const pwd = secrets.pwd;

exports.JunHyeok = async function (req, res) {
    let jSessionId;
    let WMONID;
    const post = req.body;
    console.log(post.params);
    let arr = post.params;
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
    }).then((e) => {
        var cookie = e.headers.get('set-cookie');
        jSessionId = cookie.split('JSUGANGSESSIONID=')[1].split(';')[0];
        WMONID = cookie.split(';')[0].split('=')[1];
    });
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
    });

    await fetch(`https://sugang.konkuk.ac.kr/sugang/sugang?attribute=sugangMode&fake=${new Date().getTime()}`, {
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
            cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID}; JSUGANGSESSIONID=${jSessionId}; my-application-browser-tab={"guid":"457ed00b-5ff4-b59a-550e-1e8b5be4244b","timestamp":${new Date().getTime()}}`,
            Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: 'params=1521&mode=delete',
        method: 'POST',
    })
        .then((e) => e.json())
        .then(async (e) => {
            console.log(e);
            arr.map(async (data) => {
                return await fetch(`https://sugang.konkuk.ac.kr/sugang/sugang?attribute=sugangMode&fake=${new Date().getTime()}`, {
                    headers: {
                        accept: 'application/json, text/javascript, */*; q=0.01',
                        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        'x-requested-with': 'XMLHttpRequest',
                        cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID}; JSUGANGSESSIONID=${jSessionId}; _gcl_au=1.1.1049358571.1644404645; Login=;  my-application-browser-tab={"guid":"47bab0b4-ce73-5b51-c964-07a0decfce72","timestamp":1645168950737}","timestamp":${new Date().getTime()}}`,
                    },
                    referrer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
                    referrerPolicy: 'no-referrer-when-downgrade',
                    body: `params=${data}&mode=${post.mode}`,
                    method: 'POST',
                    mode: 'cors',
                })
                    .then((e) => e.json())
                    .then((e) => console.log(e));
            });
        });
    res.send();
};

exports.firstIn = async function (req, res) {
    let jSessionId;
    let WMONID;
    const post = req.body;
    let arr = post.params;

    // mode : insert -> 수강신청
    // mode : delete -> 수강취소

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
    }).then((e) => {
        var cookie = e.headers.get('set-cookie');
        jSessionId = cookie.split('JSUGANGSESSIONID=')[1].split(';')[0];
        WMONID = cookie.split(';')[0].split('=')[1];
    });

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
    });
    arr.map(async (data) => {
        return await fetch(`https://sugang.konkuk.ac.kr/sugang/sugang?attribute=sugangMode&fake=${new Date().getTime()}`, {
            headers: {
                accept: 'application/json, text/javascript, */*; q=0.01',
                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-requested-with': 'XMLHttpRequest',
                cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID}; JSUGANGSESSIONID=${jSessionId}; _gcl_au=1.1.1049358571.1644404645; Login=;  my-application-browser-tab={"guid":"47bab0b4-ce73-5b51-c964-07a0decfce72","timestamp":1645168950737}","timestamp":${new Date().getTime()}}`,
            },
            referrer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
            referrerPolicy: 'no-referrer-when-downgrade',
            body: `params=${data}&mode=${post.mode}`,
            method: 'POST',
            mode: 'cors',
        })
            .then((e) => e.json())
            .then((e) => console.log(e));
    });
    res.send();
};

exports.monitoring = async function (req, res) {
    let subjects = req.body.subjects;
    let jSessionId;
    while (subjects.length !== 0) {
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
            body: `Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&%40d1%23SINGLE_ID=dudwls143&%40d1%23PWD=@dudwlsdl12&%40d1%23default.locale=ko&%40d%23=%40d1%23&%40d1%23=dsParam&%40d1%23tp=dm&`,
            method: 'POST',
        });
        subjects.map(async (data) => {
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
                body: `Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=&%40d1%23pobtDiv=&%40d1%23sbjtId=${data}&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&`,
                method: 'POST',
            })
                .then((e) => e.json())
                .then((e) => {
                    let subjectInfo = e.DS_SUSTTIMETABLE[0];
                    let SBJT_ID = subjectInfo.SBJT_ID;
                    let temp = JSON.stringify(subjectInfo.TLSN);
                    temp = temp.replace('"', '');
                    let total = parseInt(temp.split('/')[1]);
                    let current = parseInt(temp.split('/')[0]);
                    if (total - current > 0) {
                        (async () => {
                            let result = await doRegister(SBJT_ID);
                            if (result.code != 500) {
                                for await (let temp of subjects) {
                                    if (temp === SBJT_ID) {
                                        subjects.splice(idx, 1);
                                        console.log(subjects);
                                    }
                                    idx++;
                                }
                            }
                            console.log(subjects);
                        })();
                    }
                })
                .catch((e) => console.log(e));
        });
    }
    res.send();
};

async function doRegister(sbj_num) {
    let jSessionId2;
    let WMONID2;
    let result;

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
            jSessionId2 = cookie.split('JSUGANGSESSIONID=')[1].split(';')[0];
            WMONID2 = cookie.split(';')[0].split('=')[1];
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
            cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID2}; JSUGANGSESSIONID=${jSessionId2}; my-application-browser-tab={"guid":"47bab0b4-ce73-5b51-c964-07a0decfce72","timestamp":${new Date().getTime()}}`,
            Referer: 'https://sugang.konkuk.ac.kr/sugang/login',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: `stdNo=${singleId}&pwd=${pwd}&campFg=1&idPassGubun=1&lang=ko`,
        method: 'POST',
    })
        .then(async () => {
            await fetch(`https://sugang.konkuk.ac.kr/sugang/sugang?attribute=sugangMode&fake=${new Date().getTime()}`, {
                headers: {
                    accept: 'application/json, text/javascript, */*; q=0.01',
                    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                    cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID2}; JSUGANGSESSIONID=${jSessionId2}; _gcl_au=1.1.1049358571.1644404645; Login=;  my-application-browser-tab={"guid":"47bab0b4-ce73-5b51-c964-07a0decfce72","timestamp":1645168950737}","timestamp":${new Date().getTime()}}`,
                },
                referrer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
                referrerPolicy: 'no-referrer-when-downgrade',
                body: `params=${sbj_num}&mode=insert`,
                method: 'POST',
                mode: 'cors',
            })
                .then((e) => e.json())
                .then((e) => {
                    result = e;
                })
                .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));

    return result;
}

exports.register = async function (req, res) {
    const post = req.body;
    let sbj_num = post.sbj_num;
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
    })
        .then(async () => {
            await fetch(`https://sugang.konkuk.ac.kr/sugang/sugang?attribute=sugangMode&fake=${new Date().getTime()}`, {
                headers: {
                    accept: 'application/json, text/javascript, */*; q=0.01',
                    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'x-requested-with': 'XMLHttpRequest',
                    cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID}; JSUGANGSESSIONID=${jSessionId}; _gcl_au=1.1.1049358571.1644404645; Login=;  my-application-browser-tab={"guid":"47bab0b4-ce73-5b51-c964-07a0decfce72","timestamp":1645168950737}","timestamp":${new Date().getTime()}}`,
                },
                referrer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
                referrerPolicy: 'no-referrer-when-downgrade',
                body: `params=${sbj_num}&mode=insert`,
                method: 'POST',
                mode: 'cors',
            })
                .then((e) => e.json())
                .then((e) => console.log(e))
                .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    return res.send();
};
