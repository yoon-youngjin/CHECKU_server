// require('dotenv').config();
// "type":"module"을 통해 import를 통해 가져올수 있음
// const mongoose = require('mongoose');
import dotenv from 'dotenv';
import express from 'express';
import subRoutes from './routes/subRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import { Builder, By, Key, until } from 'selenium-webdriver';

// (async function example() {
//     let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
//     // let option = driver.ChromeOptions();
//     // options.add_experimental_option('excludeSwitches', ['enable-logging']);
//     // let browser = driver.Chrome((options = option));
//     try {
//         await driver.get('https://sugang.konkuk.ac.kr/');

//         await driver.switchTo().frame(driver.findElement(By.id('Main')));

//         await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
//         await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
//         await driver.findElement(By.className('btn-login')).click();

//         await driver.wait(until.ableToSwitchToFrame(By.id('coreMain')), 10000);

//         await driver.findElement(By.id('menu_search')).click();

//         const click = await driver.wait(until.elementLocated(By.xpath('//*[@id="sForm"]/table/tbody/tr[1]/td[2]/label[2]')));
//         click.click();

//         await driver.findElement(By.id('pSustMjCd')).sendKeys('컴퓨터공학과');

//         await driver.findElement(By.id('btnSearch')).click();

//         await driver.sleep(100000);

//         const table = await driver.wait(until.elementLocated(By.xpath('//*[@id="gridLecture"]/tbody'))).then((result) => {
//             return result;
//         });
//         // console.log(await table.getText());
//     } finally {
//         // driver.quit();
//     }
// })();

dotenv.config();

const app = express();
// 미들웨어 -> 순서대로 수행
app.use(express.json());
// app.use('/api/user', userRoutes);

app.post('/click', subRoutes);

app.post('/signup', userRoutes);

app.post('/login', userRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
