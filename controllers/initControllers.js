import { Builder, By, Key, until } from 'selenium-webdriver';
import dotenv from 'dotenv';
dotenv.config();
import chrome from '../node_modules/selenium-webdriver/chrome.js';

export const initController = (req, res) => {
    (async function init() {
        try {
            // let driver = await new Builder('./chromedriver').forBrowser('chrome').build();
            let driver = await new Builder('./chromedriver').forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
            console.log('start');
            await driver.get('https://sugang.konkuk.ac.kr/');
            // await driver.wait(until.ableToSwitchToFrame(By.id('Main')), 10000);

            await driver.switchTo().frame(driver.findElement(By.id('Main')));
            await driver.findElement(By.id('stdNo')).sendKeys('dudwls143');
            await driver.findElement(By.id('pwd')).sendKeys('@dudwlsdl12');
            await driver.findElement(By.className('btn-login')).click();

            await driver.wait(until.ableToSwitchToFrame(By.id('coreMain')), 10000);

            await driver.findElement(By.id('menu_search')).click();

            const click = await driver.wait(until.elementLocated(By.xpath('//*[@id="sForm"]/table/tbody/tr[1]/td[2]/label[2]')));
            click.click();

            await driver.findElement(By.id('pSustMjCd')).sendKeys('컴퓨터공학과');

            await driver.findElement(By.id('btnSearch')).click();
            await driver.sleep(500);

            let obj = [];
            let obj2 = [];
            let json = {};

            for (let i = 0; i < 57; i++) {
                obj[i] = driver.findElement(By.xpath('/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[' + (i + 2) + ']/td[19]/button'));
                obj2[i] = i;
            }
            await Promise.all(
                obj.map(async (value) => {
                    value.click();
                })
            ).then(() => {
                (async function test() {
                    for (let temp of obj2) {
                        json[temp] =
                            (await driver.findElement(By.xpath('/html/body/div[2]/main/div/div/div/div[1]/div[2]/div/div[3]/div[3]/div/table/tbody/tr[' + (temp + 2) + ']/td[18]')).getText()) +
                            'change';
                    }
                    await res.status(200).send(JSON.stringify(json));
                })();

                console.log('test');
            });
        } finally {
            // driver.quit();
        }
    })();
};
