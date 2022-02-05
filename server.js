// require('dotenv').config();
// "type":"module"을 통해 import를 통해 가져올수 있음
// const mongoose = require('mongoose');
import dotenv from 'dotenv';
import express from 'express';
import lectureRoutes from './routes/lectureRoutes.js';
import userRoutes from './routes/userRoutes.js';
import initRoutes from './routes/initRoutes.js';
import { Builder, By, Key, until } from 'selenium-webdriver';
import fetch from 'node-fetch';
import e from 'express';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
// 미들웨어 -> 순서대로 수행
app.use(cookieParser());
(async () => {
    const myData = {
        stdNo: 'dudwls143',
        pwd: '@dudwlsdl12',
        campFg: '1',
        idPassGubun: '1',
        lang: 'ko',
    };
    const FormData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(myData),
    };
    // console.log('start');
    // fetch(`https://sugang.konkuk.ac.kr/`, FormData)
    //     .then((e) => e.json())
    //     .then((e) => console.log(e));

    fetch(`https://sugang.konkuk.ac.kr/sugang/login?attribute=loginChk&fake=${new Date().getTime()}`, {
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
        body: 'stdNo=gb0409&pwd=0409bong%40%40&campFg=1&idPassGubun=1&lang=ko',
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })
        .then((res) => res.headers.get('set-cookie'))
        .then((e) => e.split('JSESSIONID=')[1].split(';')[0])
        .then((e) => {
            // fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=lectList&fake=${new Date().getTime()}`, {
            //     headers: {
            //         accept: 'application/json, text/javascript, */*; q=0.01',
            //         'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            //         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //         'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
            //         'sec-ch-ua-mobile': '?0',
            //         'sec-ch-ua-platform': '"Windows"',
            //         'sec-fetch-dest': 'empty',
            //         'sec-fetch-mode': 'cors',
            //         'sec-fetch-site': 'same-origin',
            //         'x-requested-with': 'XMLHttpRequest',
            //         cookie: `COOK_TS=${new Date().getTime()}; WMONID=PPLIaid4wBz; JSESSIONID=${e}:-424AHJ; my-application-browser-tab={"guid":"6f0b94af-6cfd-6b1c-63c4-cae2c2a08a21","timestamp":${new Date().getTime()}}`,
            //         Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
            //         'Referrer-Policy': 'strict-origin-when-cross-origin',
            //     },
            //     body: 'pPobt=B04045&pSearchGb=1&pUniv=103041&pSustMjCd=127428&pLang=&pKind=&pSearchKind=1&pSearchNm=',
            //     method: 'POST',
            // })
            //     .then((e) => e.json())
            //     .then((e) => console.log(e));
            fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=S&fake=${new Date().getTime()}`, {
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
                    cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; JSESSIONID=${e}; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":${new Date().getTime()}}`,
                    Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                },
                body: null,
                method: 'POST',
            })
                .then((e) => e.json())
                .then((e) => console.log(e));
            // .then(e=> res.send(e))
        });

    //     .then(() => {
    //         fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=S&fake=${new Date().getTime()}`, {
    //             headers: {
    //                 accept: 'application/json, text/javascript, */*; q=0.01',
    //                 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //                 'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    //                 'sec-ch-ua-mobile': '?0',
    //                 'sec-ch-ua-platform': '"Windows"',
    //                 'sec-fetch-dest': 'empty',
    //                 'sec-fetch-mode': 'cors',
    //                 'sec-fetch-site': 'same-origin',
    //                 'x-requested-with': 'XMLHttpRequest',
    //                 cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; JSESSIONID=0001wJj7_XEzsYCj2doK4Cwcl3c:-A2H; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":${new Date().getTime()}}`,
    //                 Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
    //                 'Referrer-Policy': 'strict-origin-when-cross-origin',
    //             },
    //             body: null,
    //             method: 'POST',
    //         })
    //             .then((e) => e.json())
    //             .then((e) => console.log(e));
    //     });

    // fetch('https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=S&fake=1644047546195', {
    //     headers: {
    //         accept: 'application/json, text/javascript, */*; q=0.01',
    //         'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'same-origin',
    //         'x-requested-with': 'XMLHttpRequest',
    //         cookie: 'COOK_TS=1644047231512; WMONID=s22F_DscdSX; JSESSIONID=0001wJj7_XEzsYCj2doK4Cwcl3c:-A2H; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":1644047546075}',
    //         Referer: 'https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=1644047233726',
    //         'Referrer-Policy': 'strict-origin-when-cross-origin',
    //     },
    //     body: null,
    //     method: 'POST',
    // })
    //     .then((e) => e.json())
    //     .then((e) => console.log(e));

    // fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=S&fake=${new Date().getTime()}`, {
    //     headers: {
    //         accept: 'application/json, text/javascript, */*; q=0.01',
    //         'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'same-origin',
    //         'x-requested-with': 'XMLHttpRequest',
    //         cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; JSESSIONID=0001wJj7_XEzsYCj2doK4Cwcl3c:-A2H; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":${new Date().getTime()}}`,
    //         Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=${new Date().getTime()}`,
    //         'Referrer-Policy': 'strict-origin-when-cross-origin',
    //     },
    //     body: null,
    //     method: 'POST',
    // })
    //     .then((e) => e.json())
    //     .then((e) => console.log(e));

    // fetch(`https://sugang.konkuk.ac.kr/sugang/core?attribute=coreData&fake=${new Date().getTime()}`, {
    //     headers: {
    //         accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //         'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    //         'cache-control': 'max-age=0',
    //         'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'frame',
    //         'sec-fetch-mode': 'navigate',
    //         'sec-fetch-site': 'same-origin',
    //         'sec-fetch-user': '?1',
    //         'upgrade-insecure-requests': '1',
    //         cookie: `COOK_TS=${new Date().getTime()}; WMONID=s22F_DscdSX; JSESSIONID=0001wJj7_XEzsYCj2doK4Cwcl3c:-A2H; my-application-browser-tab={"guid":"a0c01fcd-84f4-7364-e630-2593be577176","timestamp":${new Date().getTime()}}`,
    //         Referer: `https://sugang.konkuk.ac.kr/sugang/core?attribute=coreData&fake=${new Date().getTime()}`,
    //         'Referrer-Policy': 'strict-origin-when-cross-origin',
    //     },
    //     body: null,
    //     method: 'GET',
    // });

    // (async () => {
    //     let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
    //     await driver.get('https://sugang.konkuk.ac.kr/');
    //     await driver.switchTo().frame(driver.findElement(By.id('Main')));

    //     await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
    //     await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
    //     await driver
    //         .findElement(By.className('btn-login'))
    //         .click()
    //         .then(() => {
    //             fetch('https://sugang.konkuk.ac.kr/sugang/search?attribute=lectList&fake=1644049715836', {
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
    //                     // cookie: 'COOK_TS=1644049667337; WMONID=PPLIaid4wBz; JSESSIONID=0001EkiqkAUmmwWbcIkDuMMZsPp:-424AHJ; my-application-browser-tab={"guid":"6f0b94af-6cfd-6b1c-63c4-cae2c2a08a21","timestamp":1644049715777}',
    //                     Referer: 'https://sugang.konkuk.ac.kr/sugang/core?attribute=coreMain&fake=1644049668957',
    //                     'Referrer-Policy': 'strict-origin-when-cross-origin',
    //                 },
    //                 body: 'pPobt=B04045&pSearchGb=1&pUniv=103041&pSustMjCd=127428&pLang=&pKind=&pSearchKind=1&pSearchNm=',
    //                 method: 'POST',
    //             })
    //                 .then((e) => e.json())
    //                 .then((e) => console.log(e));
    //         });
    // })();

    // fetch(`https://sugang.konkuk.ac.kr/sugang/login?attribute=loginChk&fake=${new Date().getTime()}`, FormData)
    //     .then((e) => console.log(e.json()))
    //     .then((e) => console.log(e));
    //     .then(() => {
    //         fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=B&fake=${new Date().getTime()}`).then((e) => console.log(e));
    //     });
    // let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
    // await driver.get('https://sugang.konkuk.ac.kr/');
    // await driver.switchTo().frame(driver.findElement(By.id('Main')));

    // await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
    // await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
    // await driver
    //     .findElement(By.className('btn-login'))
    //     .click()
    //     .then(() => {
    //         driver.sleep(2000);
    //     })
    //     .then(() => {
    //         fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=B&fake=${new Date().getTime()}`, {})
    //             .then((res) => res.text())
    //             .then((res) => console.log(res));
    //     });
})();

// await page.goto('https://sugang.konkuk.ac.kr/');

// const page = await browser.newPage();

// for (const frame of page.mainFrame().childFrames()) {
//     if (frame.url().includes('partialFrameName')) {
//         console.log(`frameName: ${frame}`);
//     }
// }
// await page.evaluate((id, pw) => {
//     document.querySelector('');
// });
// (async function test() {
//     try {
//         let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
//         await driver.get('https://sugang.konkuk.ac.kr/');
//         await driver.switchTo().frame(driver.findElement(By.id('Main')));

//         await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
//         await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
//         await driver.findElement(By.className('btn-login')).click();
//         let temp;
//         await driver
//             .executeScript("fetch('https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=B&fake=${new Date().getTime()}')" + '.then((res) => res.text())')
//             .then((e) => console.log(e));

//         // let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
//         // await driver.get('https://sugang.konkuk.ac.kr/');

//         // await driver.switchTo().frame(driver.findElement(By.id('Main')));

//         // await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
//         // await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
//         // await driver.findElement(By.className('btn-login')).click();

//         // await driver.wait(until.ableToSwitchToFrame(By.id('coreMain')), 10000);

//         // await driver.sleep(2000);

//         // await driver.findElement(By.id('menu_search')).click();
//         // const click = await driver.wait(until.elementLocated(By.xpath('//*[@id="sForm"]/table/tbody/tr[1]/td[2]/label[2]')));
//         // click.click();
//         // await driver.findElement(By.id('pSustMjCd')).sendKeys('컴퓨터공학과');
//         // await driver.findElement(By.id('pSearchKind')).sendKeys('과목번호');
//         // await driver.findElement(By.id('btnSearch')).click();
//         // await driver.sleep(1000);
//         // let temp = 'fetch("https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=B&fake=${new Date().getTime()}", ' + '{method:"post"})';
//         // // '.then((e) => e.json())' +
//         // // '.then((e) => {' +
//         // // '   console.log(e);' +
//         // // "}); ')";

//         // await driver.executeScript(temp).then((e) => console.log(e));

//         // let sugang_data = await fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=B&fake=${new Date().getTime()}`, {})
//         //     .then((e) => e.json())
//         //     .then((e) => {
//         //         console.log(e);
//         //     });
//         // .then((e) => {
//         //     console.log(`정원 (학년): ${e.rows[0].inwon_shyr}`);
//         //     // console.log(`정원 (학년): ${e.inwon_all}`);

//         //     // console.log(`전원 (전체): ${e.rows[0].inwon_all}`);
//         // });
//         // console.log(`=============== ${subject_names[i]} 현황 ===============`);

//         // await driver.executeAsyncScript(document.querySelector('#coreMain'));
//         // subject_elements = await driver.executeScript(document.querySelector('#coreMain').contentWindow.document.querySelectorAll('[aria-describedby=gridLecture_sbjt_id]'));
//         // console.log(subject_elements);
//         // (async function test() {
//         //     subject_elements = Array.from(window.top.Main.document.querySelector('#coreMain').contentWindow.document.querySelectorAll('[aria-describedby=gridLecture_sbjt_id]'));
//         //     console.log(subject_elements);
//         // })();
//     } finally {
//     }
// })();

app.use(express.json());

// app.use('/api/user', userRoutes);

app.post('/init', initRoutes);

app.post('/click', lectureRoutes);

app.post('/signup', userRoutes);

app.post('/login', userRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port 2000!');
});
