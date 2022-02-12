// import dotenv from 'dotenv';
// dotenv.config();
import fetch from 'node-fetch';
import Subject from '../models/subject.js';

export const initController = (req, res) => {
    (async () => {
        let maindata = [];

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
                cookie: 'WMONID=M0F_dOVS0e7; _gcl_au=1.1.1049358571.1644404645; JSESSIONID=0001pfv7KOzVOO3sU3t7_YW9O3M:1LNNUVVM77',
                Referer: 'https://kuis.konkuk.ac.kr/index.do',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
            body: 'Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=127428&%40d1%23pobtDiv=&%40d1%23sbjtId=&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&',
            method: 'POST',
        })
            .then((e) => e.json())
            .then((e) => {
                (async () => {
                    let i = 0;
                    maindata = e.DS_SUSTTIMETABLE.map(async (data) => {
                        let arr = [data.SBJT_ID, data.KOR_NM, data.TYPL_KOR_NM];
                        return arr;
                    });
                    await Promise.all(maindata).then(async (maindata) => {
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
                            body: 'stdNo=dudwls143&pwd=%40dudwlsdl12&campFg=1&idPassGubun=1&lang=ko',
                            method: 'POST',
                            mode: 'cors',
                            credentials: 'include',
                        })
                            .then((res) => res.headers.get('set-cookie'))
                            .then((e) => e.split('JSESSIONID=')[1].split(';')[0])
                            .then((e) => {
                                let sessionID = e;
                                (async () => {
                                    let promises = {};

                                    promises = maindata.map(async (data) => {
                                        return await fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=${data[0]}&gbn=S&fake=${new Date().getTime()}`, {
                                            headers: {
                                                accept: 'application/json, text/javascript, */*; q=0.01',
                                                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                                                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
                                                'sec-ch-ua-mobile': '?0',
                                                'sec-ch-ua-platform': '"Windows"',
                                                'sec-fetch-dest': 'empty',
                                                'sec-fetch-mode': 'cors',
                                                'sec-fetch-site': 'same-origin',
                                                'x-requested-with': 'XMLHttpRequest',
                                                cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; Login=; UTF8_Option=0; LoginCookie=294716365834294713062947178824253758178829475340370353170607311513063115409623315317071025420734110720043115130631154096233153173115233107100050370307100050071017880710562246051788071000500931178825425622; JSESSIONID=${sessionID}; my-application-browser-tab={"guid":"ef47735c-1f6c-7c09-3c33-974cfe02fbc7","timestamp":${new Date().getTime()}}`,
                                                Referer: 'https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=1644216634548',
                                                'Referrer-Policy': 'strict-origin-when-cross-origin',
                                            },
                                            body: null,
                                            method: 'POST',
                                        })
                                            .then((e) => e.json())
                                            .then((e) => {
                                                let arr = data.concat(e.rows[0].inwon_shyr, e.rows[0].inwon_all);
                                                return arr;
                                                // passData[i] = data.concat(e.rows[0].inwon_shyr, e.rows[0].inwon_all);
                                                // i++;
                                            });
                                    });
                                    var obj;
                                    await Promise.all(promises).then((e) => {
                                        obj = e.reduce((acc, cur, i) => {
                                            acc[i] = cur;
                                            return acc;
                                        }, {});
                                    });
                                    await res.status(200).send(obj);
                                })();
                            });
                    });
                })();
            });
    })();
};

export const changeAllController = (req, res) => {
    var jSessionId;
    let subjects;
    let subjectId = req.query.subjectId;
    let type = req.query.type;
    let grade = req.query.grade;
    if (!subjectId) {
        subjectId = '';
    }
    if (!type) {
        type = '';
    }
    if (!grade) {
        grade = ['1', '2', '3', '4', '9'];
    }
    console.log(subjectId);
    console.log(grade);
    (async () => {
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
            body: `Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=${subjectId}&%40d1%23pobtDiv=&%40d1%23sbjtId=&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&`,
            method: 'POST',
        })
            .then((res) => {
                return res.json();
            })
            .then(async (res) => {
                subjects = res.DS_SUSTTIMETABLE.filter((subjectInfo) => grade.includes(subjectInfo.OPEN_SHYR)).map(async (subjectInfo) => {
                    const subject = Subject.Builder.setId(subjectInfo.SBJT_ID)
                        .setName(subjectInfo.TYPL_KOR_NM)
                        .setProfessor(subjectInfo.KOR_NM)
                        .setRoom(subjectInfo.ROOM_NM)
                        .setType(subjectInfo.POBT_DIV_NM)
                        .setInwon(subjectInfo.TLSN)
                        .setGrade(subjectInfo.OPEN_SHYR)
                        .setDetail(subjectInfo.REMK)
                        .build();
                    return subject;
                });
                console.log(subjects);
            });
        await Promise.all(subjects)
            .then(async (subjects) => {
                return JSON.stringify(subjects);
            })
            .then(async (result) => {
                await res.status(200).send(result);
            });
    })();
};

export const changeController = (req, res) => {
    var jSessionId;
    let post = req.body;
    (async () => {
        console.time('performance');

        let arr = post.sbj_num;
        console.log(arr);
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
        }).then(async () => {
            let promises = arr.map(async (data) => {
                return await fetch('https://kuis.konkuk.ac.kr/CourTotalTimetableInq/find.do', {
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
                    .then((e) => {
                        console.log(typeof e);
                        return e.json();
                    })
                    .then((e) => {
                        let subjectInfo = e.DS_SUSTTIMETABLE[0];
                        const subject = Subject.Builder.setId(subjectInfo.SBJT_ID)
                            .setName(subjectInfo.TYPL_KOR_NM)
                            .setProfessor(subjectInfo.KOR_NM)
                            .setRoom(subjectInfo.ROOM_NM)
                            .setType(subjectInfo.POBT_DIV_NM)
                            .setInwon(subjectInfo.TLSN)
                            .setGrade(subjectInfo.OPEN_SHYR)
                            .setDetail(subjectInfo.REMK)
                            .build();
                        return subject;
                    });
            });

            await Promise.all(promises)
                .then(async (subjects) => {
                    return JSON.stringify(subjects);
                })
                .then(async (result) => {
                    await res.status(200).send(result);
                    console.timeEnd('performance');
                });
        });
    })();

    // })();
};
