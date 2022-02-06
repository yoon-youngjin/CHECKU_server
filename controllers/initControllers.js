import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

let maindata = {};
let sessionID;
export const initController = (req, res) => {
    console.time('performance');
    (async () => {
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
                sessionID = e;

                fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=lectList&fake=${new Date().getTime()}`, {
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
                        cookie: `COOK_TS=${new Date().getTime()}; WMONID=PPLIaid4wBz; JSESSIONID=${sessionID}:-424AHJ; my-application-browser-tab={"guid":"6f0b94af-6cfd-6b1c-63c4-cae2c2a08a21","timestamp":${new Date().getTime()}}`,
                        Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
                        'Referrer-Policy': 'strict-origin-when-cross-origin',
                    },
                    body: 'pPobt=B04045&pSearchGb=1&pUniv=103041&pSustMjCd=127428&pLang=&pKind=&pSearchKind=1&pSearchNm=',
                    method: 'POST',
                })
                    .then((e) => e.json())
                    .then((e) => {
                        (async () => {
                            for (let i = 0; i < e.rows.length; i++) {
                                let sbjt_id;
                                sbjt_id = e.rows[i].sbjt_id;
                                maindata[i] = [sbjt_id, e.rows[i].kor_nm, e.rows[i].typl_nm];
                                await fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=${sbjt_id}&gbn=S&fake=${new Date().getTime()}`, {
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
                                        cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; JSESSIONID=${sessionID}; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":${new Date().getTime()}}`,
                                        Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
                                        'Referrer-Policy': 'strict-origin-when-cross-origin',
                                    },
                                    body: null,
                                    method: 'POST',
                                })
                                    .then((e) => e.json())
                                    .then((e) => {
                                        maindata[i].push(e.rows[0].inwon_shyr);
                                        maindata[i].push(e.rows[0].inwon_all);
                                    })
                                    .then(() => {
                                        // length변경
                                        if (i === 56) {
                                            console.log(maindata);
                                            res.status(200).send(maindata);
                                            console.timeEnd('performance');
                                        }
                                    });
                            }
                        })();
                    });
            });
    })();
};
