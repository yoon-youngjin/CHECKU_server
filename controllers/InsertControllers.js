import fetch from 'node-fetch';

let jSessionId;
let WMONID;
export const insertController = async (req, res) => {
    const post = req.body;
    console.log(post.params);
    let arr = post.params;
    console.log(post.mode);

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
        body: 'stdNo=dudwls143&pwd=%40dudwlsdl12&campFg=1&idPassGubun=1&lang=ko',
        method: 'POST',
    })
        .then(async (e) => {
            let promises = arr.map(async (data) => {
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

            
        })
        .then(() => res.send());

    // await fetch(`https://sugang.konkuk.ac.kr/sugang/sugang?attribute=sugangMode&fake=${new Date().getTime()}`, {
    //     headers: {
    //         accept: 'application/json, text/javascript, */*; q=0.01',
    //         'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'same-origin',
    //         'x-requested-with': 'XMLHttpRequest',
    //         cookie: `COOK_TS=${new Date().getTime()}; WMONID=${WMONID}; JSESSIONID=${jSessionId}; _gcl_au=1.1.1049358571.1644404645; Login=;  my-application-browser-tab={"guid":"47bab0b4-ce73-5b51-c964-07a0decfce72","timestamp":1645168950737}","timestamp":${new Date().getTime()}}`,
    //     },
    //     referrer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
    //     referrerPolicy: 'no-referrer-when-downgrade',
    //     body: `params=${post.params}&mode=${post.mode}`,
    //     method: 'POST',
    //     mode: 'cors',
    // })
    //     .then((e) => e.json())
    //     .then((e) => {
    //         console.log(e);
    //         res.status(200).send();
    //     });

    // 삭제
    // fetch('https://sugang.konkuk.ac.kr/sugang/sugang?attribute=sugangMode&fake=1645170515804', {
    //     headers: {
    //         accept: 'application/json, text/javascript, */*; q=0.01',
    //         'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'same-origin',
    //         'x-requested-with': 'XMLHttpRequest',
    //         cookie: 'COOK_TS=1645170335221; WMONID=QcK8NxKlj0Y; JSESSIONID=0001OZdMeEizQTmelafVtVq0VQW:-185IN3; my-application-browser-tab={"guid":"457ed00b-5ff4-b59a-550e-1e8b5be4244b","timestamp":1645170515779}',
    //         Referer: 'https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=1645170375251',
    //         'Referrer-Policy': 'strict-origin-when-cross-origin',
    //     },
    //     body: 'params=1523&mode=delete',
    //     method: 'POST',
    // });
};
