import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

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
                cookie: 'WMONID=g65umB7KIJD; Login=; UTF8_Option=0; LoginCookie=2947163658342947130629471788242537581788294753403703531706073115130631154096233153170710254207341107200431151306311540962331531731152331071000503703071007100050178807105622093117880050005009311788071016723266; JSESSIONID=0001-Sdin_ZdWYrflfqJAByBkGj:1CAUM7FB34',
                Referer: 'https://kuis.konkuk.ac.kr/index.do',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
            body: 'Oe2Ue=%239e4ki&Le093=e%26*%08iu&AWeh_3=W%5E_zie&Hd%2Cpoi=_qw3e4&EKf8_%2F=Ajd%25md&WEh3m=ekmf3&rE%0Cje=JDow871&JKGhe8=NuMoe6&_)e7me=ne%2B3%7Cq&3kd3Nj=Qnd%40%251&_AUTH_MENU_KEY=1130420&%40d1%23ltYy=2022&%40d1%23ltShtm=B01011&%40d1%23openSust=105291&%40d1%23pobtDiv=&%40d1%23sbjtId=&%40d1%23corsKorNm=&%40d1%23sprfNo=&%40d1%23argDeptFg=1&%40d1%23arglangNm=&%40d%23=%40d1%23&%40d1%23=dmParam&%40d1%23tp=dm&',
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
                                    console.timeEnd('performance');
                                })();
                            });
                    });
                })();
            });
    })();
};
