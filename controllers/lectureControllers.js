// route안에 들어가는 수행내용이 복잡해질 경우를 대비해서
// controller를 통해 제어
import Subject from '../models/subjectModel.js';
import mongo from 'mongodb';
const mongoClient = mongo.MongoClient;
import { Builder, By, Key, until } from 'selenium-webdriver';

import dotenv from 'dotenv';
dotenv.config();
export const subController = (req, res) => {
    const post = req.body;

    console.log(post.subject_num);

    (async function startCrawling() {
        // let option = driver.ChromeOptions();
        // options.add_experimental_option('excludeSwitches', ['enable-logging']);
        // let browser = driver.Chrome((options = option));
        try {
            let driver = await new Builder('./chromedriver').forBrowser('chrome').build();

            await driver.get('https://sugang.konkuk.ac.kr/');
            await driver.switchTo().frame(driver.findElement(By.id('Main')));
            await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
            await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
            await driver.findElement(By.className('btn-login')).click();

            await driver.wait(until.ableToSwitchToFrame(By.id('coreMain')), 10000);

            await driver.findElement(By.id('menu_search')).click();

            const click = await driver.wait(until.elementLocated(By.xpath('//*[@id="sForm"]/table/tbody/tr[1]/td[2]/label[2]')));
            click.click();

            await driver.findElement(By.id('pSustMjCd')).sendKeys('컴퓨터공학과');
            await driver.findElement(By.id('pSearchKind')).sendKeys('과목번호');

            await driver.findElement(By.id('pSearchNm')).sendKeys(post.subject_num);

            await driver.findElement(By.id('btnSearch')).click();
            await driver.sleep(1000);

            let check = 0;
            let data;
            while (true) {
                if (check === 20) {
                    res.status(200).send(post.subject_num);
                    break;
                } else {
                    await driver.findElement(By.xpath('/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[2]/td[19]/button')).click();
                    let temp = await driver.findElement(By.xpath('/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[2]/td[18]'));
                    data = await (await temp.getText()).split('/');
                    await driver.sleep(1500);
                    if ((await data[0]) === 'Loading') {
                        continue;
                    }
                    console.log(await data[0]);
                }

                await console.log(check);
                await check++;
            }
        } finally {
            driver.quit();
        }
    })();

    const newSubject = new Subject({
        title: req.body.sub_title,
        professor_name: req.body.pro_name,
        total_num: req.body.total_num,
        current_num: req.body.current_num,
        subject_num: req.body.subject_num,
    });

    // mongoClient.connect(process.env.MONGODB_URL, (err, db) => {
    //     if (err) {
    //         console.log('Error....');
    //     } else {
    //         const mydb = db.db('testCluster');
    //         const collection = mydb.collection('myTable');

    //         const newUser = new User({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: req.body.password,
    //         });

    //         console.log(newUser);

    //         const query = { email: newUser.email };

    //         collection.findOne(query, (err, result) => {
    //             if (result == null) {
    //                 collection.insertOne(newUser, (err, result) => {
    //                     res.status(200).send();
    //                 });
    //             } else {
    //                 res.status(400).send();
    //             }
    //         });
    //     }
    // });
};
