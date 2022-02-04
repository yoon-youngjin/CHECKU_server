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
import puppeteer from 'puppeteer';
dotenv.config();

const app = express();
// 미들웨어 -> 순서대로 수행

(async () => {
    // const myData = {
    //     stdNo: 'dudwls143',
    //     pwd: '@dudwlsdl12',
    //     campFg: '1',
    //     idPassGubun: '1',
    //     lang: 'ko',
    // };
    // const option = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(myData),
    // };
    // console.log('start');

    // fetch(`https://sugang.konkuk.ac.kr/sugang/login?attribute=loginChk&fake=${new Date().getTime()}`, option)
    //     .then((e) => console.log(e))
    //     .then(() => {
    //         fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=B&fake=${new Date().getTime()}`).then((e) => console.log(e));
    //     });
    let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
    await driver.get('https://sugang.konkuk.ac.kr/');
    await driver.switchTo().frame(driver.findElement(By.id('Main')));

    await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
    await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
    await driver
        .findElement(By.className('btn-login'))
        .click()
        .then(() => {
            driver.sleep(2000);
        })
        .then(() => {
            fetch(`https://sugang.konkuk.ac.kr/sugang/search?attribute=inwonData&pSbjtId=3175&gbn=B&fake=${new Date().getTime()}`)
                .then((res) => res.text())
                .then((res) => console.log(res));
        });
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
