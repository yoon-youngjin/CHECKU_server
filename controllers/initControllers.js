import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

let maindata = {};
let arr = [];
export const initController = (req, res) => {
    (async () => {
        let maindata = [];

        console.time('performance');
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
                cookie: 'WMONID=g65umB7KIJD; Login=; UTF8_Option=0; LoginCookie=294716365834294713062947178824253758178829475340370353170607311513063115409623315317071025420734110720043115130631154096233153173115233107100050370307100050071017880710562246051788071000500931178825425622; JSESSIONID=0002DL7Hi7YUGJFi3W7_PkTkkip:1LNNUVVM77',
                Referer: 'https://kuis.konkuk.ac.kr/index.do',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
            body: 'Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=127114&%40d1%23pobtDiv=&%40d1%23sbjtId=&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&',
            method: 'POST',
        })
            .then((e) => e.json())
            .then((e) => {
                (async () => {
                    let i = 0;
                    // let length = e.DS_SUSTTIMETABLE.length;
                    for await (let temp of e.DS_SUSTTIMETABLE) {
                        maindata[i] = [];
                        maindata[i].push(temp.SBJT_ID);
                        maindata[i].push(temp.KOR_NM);
                        maindata[i].push(temp.TYPL_KOR_NM);
                        i++;
                    }
                    // console.log(maindata);
                })();
            })
            .then(() => {
                (async () => {
                    let passData = {};
                    let i = 0;

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
                                const promises = maindata.map(async (data) => {
                                    // console.log(data);
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
                                            passData[i] = data.concat(e.rows[0].inwon_shyr, e.rows[0].inwon_all);
                                            i++;
                                        });
                                });
                                await Promise.all(promises);
                                console.log(passData);
                                await res.status(200).send(passData);
                                console.timeEnd('performance');
                            })();
                        });
                })();
            });
    })();

    // (async () => {
    //     await fetch(`https://sugang.konkuk.ac.kr/sugang/login?attribute=loginChk&fake=${new Date().getTime()}`, {
    //         headers: {
    //             accept: 'application/json, text/javascript, */*; q=0.01',
    //             'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //             'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //             'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    //             'sec-ch-ua-mobile': '?0',
    //             'sec-ch-ua-platform': '"Windows"',
    //             'sec-fetch-dest': 'empty',
    //             'sec-fetch-mode': 'cors',
    //             'sec-fetch-site': 'same-origin',
    //             'x-requested-with': 'XMLHttpRequest',
    //         },
    //         referrer: 'https://sugang.konkuk.ac.kr/sugang/login',
    //         referrerPolicy: 'strict-origin-when-cross-origin',
    //         body: 'stdNo=dudwls143&pwd=%40dudwlsdl12&campFg=1&idPassGubun=1&lang=ko',
    //         method: 'POST',
    //         mode: 'cors',
    //         credentials: 'include',
    //     })
    //         .then((res) => res.headers.get('set-cookie'))
    //         .then((e) => e.split('JSESSIONID=')[1].split(';')[0])
    //         .then((e) => {
    //             let sessionID = e;
    //             let length;

    //             fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=lectList&fake=${new Date().getTime()}`, {
    //                 headers: {
    //                     accept: 'application/json, text/javascript, */*; q=0.01',
    //                     'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //                     'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //                     'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    //                     'sec-ch-ua-mobile': '?0',
    //                     'sec-ch-ua-platform': '"Windows"',
    //                     'sec-fetch-dest': 'empty',
    //                     'sec-fetch-mode': 'cors',
    //                     'sec-fetch-site': 'same-origin',
    //                     'x-requested-with': 'XMLHttpRequest',
    //                     cookie: `COOK_TS=${new Date().getTime()}; WMONID=PPLIaid4wBz; JSESSIONID=${sessionID}:-424AHJ; my-application-browser-tab={"guid":"6f0b94af-6cfd-6b1c-63c4-cae2c2a08a21","timestamp":${new Date().getTime()}}`,
    //                     Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
    //                     'Referrer-Policy': 'strict-origin-when-cross-origin',
    //                 },
    //                 // body: 'pPobt=B04045&pSearchGb=1&pUniv=103041&pSustMjCd=127428&pLang=&pKind=&pSearchKind=1&pSearchNm=',
    //                 // body: 'pPobt=B04045&pSearchGb=1&pUniv=126897&pSustMjCd=126913&pLang=&pKind=&pSearchKind=1&pSearchNm=',
    //                 body: 'pPobt=B04045&pSearchGb=1&pUniv=126897&pSustMjCd=126914&pLang=&pKind=&pSearchKind=1&pSearchNm=',
    //                 method: 'POST',
    //             })
    //                 .then((e) => e.json())
    //                 .then((e) => {
    //                     (async () => {
    //                         length = e.rows.length;
    //                         for (let i = 0; i < length; i++) {
    //                             let sbjt_id;
    //                             sbjt_id = e.rows[i].sbjt_id;
    //                             maindata[i] = [sbjt_id, e.rows[i].kor_nm, e.rows[i].typl_nm];
    //                             await fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=${sbjt_id}&gbn=S&fake=${new Date().getTime()}`, {
    //                                 headers: {
    //                                     accept: 'application/json, text/javascript, */*; q=0.01',
    //                                     'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //                                     'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    //                                     'sec-ch-ua-mobile': '?0',
    //                                     'sec-ch-ua-platform': '"Windows"',
    //                                     'sec-fetch-dest': 'empty',
    //                                     'sec-fetch-mode': 'cors',
    //                                     'sec-fetch-site': 'same-origin',
    //                                     'x-requested-with': 'XMLHttpRequest',
    //                                     cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; JSESSIONID=${sessionID}; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":${new Date().getTime()}}`,
    //                                     Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
    //                                     'Referrer-Policy': 'strict-origin-when-cross-origin',
    //                                 },
    //                                 body: null,
    //                                 method: 'POST',
    //                             })
    //                                 .then((e) => e.json())
    //                                 .then((e) => {
    //                                     maindata[i].push(e.rows[0].inwon_shyr);
    //                                     maindata[i].push(e.rows[0].inwon_all);
    //                                 })
    //                                 .then(() => {
    //                                     // length변경
    //                                     if (i === length - 1) {
    //                                         console.log(maindata);
    //                                         res.status(200).send(maindata);
    //                                         console.timeEnd('performance');
    //                                     }
    //                                 });
    //                         }
    //                     })();
    //                 });
    //         });
    // })();
};
